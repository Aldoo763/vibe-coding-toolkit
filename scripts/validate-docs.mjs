import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = [...new Set(execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean))];
const manifest = JSON.parse(await readFile(path.join(root, "templates/project-docs/manifest.json"), "utf8"));
const destinations = new Map(Object.entries(manifest).map(([destination, source]) => [path.posix.normalize(`templates/project-docs/${source}`), destination]));
const anchors = new Map();

function getAnchors(text) {
  const ids = new Set([...text.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]));
  const duplicates = new Map();
  for (const match of text.replace(/^```[^\n]*\n[\s\S]*?^```/gm, "").matchAll(/^#{1,6}\s+(.+)$/gm)) {
    const base = match[1].toLowerCase().replace(/<[^>]+>/g, "").replace(/[^\p{L}\p{N}_\-\s]/gu, "").replace(/\s/g, "-");
    const count = duplicates.get(base) ?? 0;
    duplicates.set(base, count + 1);
    ids.add(count ? `${base}-${count}` : base);
  }
  return ids;
}

let links = 0;
for (const file of files) {
  if (/\.json(?:\.example)?$/.test(file)) JSON.parse(await readFile(path.join(root, file), "utf8"));
  if (!/\.md(?:\.template)?$/.test(file)) continue;
  const content = await readFile(path.join(root, file), "utf8");
  const text = content.replace(/^```[^\n]*\n[\s\S]*?^```/gm, "").replace(/`[^`\n]+`/g, "");
  const targets = [...text.matchAll(/\]\(([^)]+)\)|\b(?:href|src)=["']([^"']+)["']/g)].map(match => match[1] ?? match[2]);
  for (let target of targets) {
    if (/^(?:[a-z]+:|\/\/)/i.test(target)) continue;
    target = target.replace(/^<|>$/g, "");
    const [relative, anchor] = target.split("#");
    if (destinations.has(file)) {
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(destinations.get(file)), relative || path.posix.basename(destinations.get(file))));
      assert(Object.hasOwn(manifest, resolved), `${file}: unknown generated-document link ${target}`);
    } else {
      const resolved = relative ? path.resolve(root, path.dirname(file), decodeURIComponent(relative)) : path.join(root, file);
      assert((await stat(resolved).catch(() => null)), `${file}: missing link ${target}`);
      if (anchor && /\.md$/.test(resolved)) {
        if (!anchors.has(resolved)) anchors.set(resolved, getAnchors(await readFile(resolved, "utf8")));
        assert(anchors.get(resolved).has(decodeURIComponent(anchor)), `${file}: missing anchor ${target}`);
      }
    }
    links++;
  }
}
console.log(`PASS documentation: ${links} local links/anchors, document destinations and JSON configurations`);
