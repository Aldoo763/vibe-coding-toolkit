import assert from "node:assert/strict";
import { execSync, spawn } from "node:child_process";
import { once } from "node:events";
import { cp, mkdir, mkdtemp, readFile, readdir, readlink, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const temporary = await mkdtemp(path.join(tmpdir(), "toolkit-next-"));
const app = path.join(temporary, "starter");
const env = { ...process.env, DISABLE_TELEMETRY: "1", NEXT_TELEMETRY_DISABLED: "1", GRAPHIFY_NO_AUTO_REFRESH: "1" };
const expected = [
  "deploy-to-vercel", "find-skills", "vercel-cli-with-tokens",
  "vercel-composition-patterns", "vercel-optimize", "vercel-react-best-practices",
  "vercel-react-view-transitions", "web-design-guidelines", "writing-guidelines",
];

// Commands and arguments are fixed; cwd carries filesystem paths without shell interpolation.
function run(command, cwd = app) {
  execSync(command, { cwd, env, stdio: "inherit", timeout: 600_000 });
}

try {
  run('npx --yes create-next-app@latest starter --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --disable-git --no-react-compiler --no-cache-components --no-agent-feedback --yes', temporary);
  await cp(path.join(root, "templates/eslint/eslint-rules"), path.join(app, "eslint-rules"), { recursive: true });
  await mkdir(path.join(app, "scripts"));
  await cp(path.join(root, "templates/eslint/verify.mjs"), path.join(app, "scripts/verify-quality-rules.mjs"));
  await cp(path.join(root, "templates/eslint/next.config.mjs.example"), path.join(app, "eslint.config.mjs"));
  await cp(path.join(root, "templates/project/.graphifyignore.example"), path.join(app, ".graphifyignore"));
  const packageFile = path.join(app, "package.json");
  const packageJson = JSON.parse(await readFile(packageFile, "utf8"));
  Object.assign(packageJson.scripts, {
    lint: "eslint .", typecheck: "tsc --noEmit",
    "lint:rules": "node scripts/verify-quality-rules.mjs ./eslint-rules/index.cjs",
  });
  await writeFile(packageFile, JSON.stringify(packageJson, null, 2) + "\n");

  // Windows junctions can store absolute targets; copies keep checked-in skills portable.
  const copy = process.platform === "win32" ? " --copy" : "";
  run("npx --yes skills@latest add vercel-labs/agent-skills --skill vercel-react-best-practices vercel-composition-patterns web-design-guidelines writing-guidelines vercel-react-view-transitions vercel-optimize deploy-to-vercel vercel-cli-with-tokens --agent codex claude-code --yes" + copy);
  run("npx --yes skills@latest add vercel-labs/skills --skill find-skills --agent codex claude-code --yes" + copy);
  assert.deepEqual((await readdir(path.join(app, ".agents/skills"))).sort(), expected);
  const lock = JSON.parse(await readFile(path.join(app, "skills-lock.json"), "utf8"));
  assert.deepEqual(Object.keys(lock.skills).sort(), expected);
  for (const name of expected) {
    const canonical = await readFile(path.join(app, ".agents/skills", name, "SKILL.md"), "utf8");
    assert(canonical.includes(`name: ${name}`));
    assert.equal(await readFile(path.join(app, ".claude/skills", name, "SKILL.md"), "utf8"), canonical);
    if (process.platform !== "win32") {
      assert(!path.isAbsolute(await readlink(path.join(app, ".claude/skills", name))));
    }
  }

  const require = createRequire(packageFile);
  const { ESLint } = require("eslint");
  const eslint = new ESLint({ cwd: app });
  const checkText = async (code, file) => (await eslint.lintText(code, { filePath: path.join(app, file) }))[0];
  assert.equal((await checkText("export default function Home() { return <main>Ready</main>; }", "src/app/page.tsx")).errorCount, 0);
  const oversized = Array.from({ length: 351 }, (_, i) => `export const value${i} = ${i};`).join("\n");
  assert((await checkText(oversized, "src/oversized.ts")).messages.some(message => message.ruleId === "quality/max-lines" && message.severity === 2));
  assert((await checkText("export const value: any = 1;", "src/typed.ts")).messages.some(message => message.ruleId === "@typescript-eslint/no-explicit-any" && message.severity === 2));
  assert((await checkText('export default function Page() { return <a href="/">Home</a>; }', "src/app/page.tsx")).messages.some(message => message.ruleId === "@next/next/no-html-link-for-pages" && message.severity === 2));
  for (const file of ["src/app/page.tsx", "app/page.tsx", "components/widget.tsx"]) {
    assert.equal((await eslint.calculateConfigForFile(path.join(app, file))).rules["quality/max-lines"][0], 2);
  }
  for (const script of ["lint", "typecheck", "lint:rules", "build"]) run(`npm run ${script}`);
  run("npm audit --omit=dev");

  const probe = createServer();
  await new Promise(resolve => probe.listen(0, "127.0.0.1", resolve));
  const port = probe.address().port;
  await new Promise(resolve => probe.close(resolve));
  const server = spawn(process.execPath, [path.join(app, "node_modules/next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: app, env, stdio: "inherit" });
  const exited = once(server, "exit");
  try {
    let response;
    for (let attempt = 0; attempt < 60 && !response; attempt++) {
      assert.equal(server.exitCode, null, "Next server exited before becoming ready");
      try { response = await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(1_000) }); }
      catch { await delay(250); }
    }
    assert(response, "Next server did not become ready");
    assert.equal(response.status, 200);
    assert((await response.text()).includes("<main"));
  } finally {
    if (server.exitCode === null) server.kill("SIGTERM");
    await exited;
  }
  console.log(`PASS ${process.platform}: Next preset, quality rules, lint, types, build, HTTP and nine local skills`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
