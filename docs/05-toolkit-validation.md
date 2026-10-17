# Validate the toolkit

The toolkit keeps no application or Next.js dependencies at the root. Validate documents and templates in a separate environment:

```bash
node --test scripts/validate-docs.test.mjs
node scripts/validate-docs.mjs
node scripts/validate-next.mjs
```

Use Node.js 24, npm, Git, and network access. The [document check](../scripts/validate-docs.mjs) verifies local links, image `srcset` candidates, anchors, manifest destinations, JSON, and this repository’s GitHub/raw URLs, including shortcuts inside prompts. The [validator regression tests](../scripts/validate-docs.test.mjs) exercise missing images, broken fragments, raw shortcuts, and generated-document anchors in temporary Git repositories. The [application check](../scripts/validate-next.mjs) creates and removes a temporary project; dependencies and test resources stay there. ESLint checks run in a child process, releasing native addons before cleanup on Windows; the final result passes only after the temporary directory is removed. Neither check calls models, installs Git hooks, or changes global configuration.

The [workflow](../.github/workflows/validate.yml) runs both on Ubuntu and Windows, with official actions pinned by commit and read-only permissions. Public names are part of the contract: update callers, indexes, and templates in the same change.

## What validation proves

| Check | Evidence |
|---|---|
| Documentation | Nine manifest sources/destinations and destination-relative links; the LLM must still fill in specific content |
| Skills | Explicit fixture selections from the Vercel, Next.js, Supabase, OpenAI, Trail of Bits, and shadcn sources; frontmatter names, lockfile, and Claude/Codex content; relative links or copies on Windows |
| ESLint | Full, lightweight, and advanced profiles load; negative cases for size including `index/types/constants`, Next.js, TypeScript, console, data, and Drizzle; positive cases for pure barrels/types and test suffixes |
| Server | Eight Vitest tests for environment, log redaction, and pool lifecycle; compilation rejects server environment imports in a Client Component |
| SQL | Drizzle Kit generates without a URL; SQL for one test table migrates/reapplies in PGlite, with parameterized CRUD and rollback |
| Application | Lint, types, self-checks, tests, and build; production server responds HTTP 200 with expected content |
| Dependencies | Required production audit; full audit shows development counts and advisories |
| Cleanup | Test schema restored, embedded database closed, own server stopped, and temporary directory removed |

PGlite runs embedded PostgreSQL; it does not prove TCP connectivity, SSL, or provider configuration. The `pg.Pool` lifecycle uses mocks, while SQL actually runs in the engine. The test app does not receive fictitious business tables as part of the template.

Skill presence does not prove host execution. Publishing, credentialed services, E2E coverage, and complete tasks performed by every LLM are also outside these checks' guarantees.

The fixture deliberately installs optional instruction packages to verify distribution; it does not initialize shadcn, adopt Supabase hosting, connect Sentry, or make every capability a product default. Matching Claude/Codex files verifies packaging, not support for every host-specific instruction. In particular, `gh-fix-ci` targets the Codex workflow. Next.js runtime MCP preflight, bundle optimization, authenticated CI queries, security findings, component behavior, and Sentry OAuth need their own actual task checks.

## Execution on October 17, 2026

The expanded fixture passed on macOS with Node.js 24.21.0, without database credentials. It installed and checked **15 selected skills**: the prior web/discovery set plus `next-dev-loop`, `next-bundle-optimizer`, `supabase-postgres-best-practices`, `gh-fix-ci`, `differential-review`, and `shadcn`. Canonical names, lockfile entries, matching client files, and relative Claude links passed. The source `gh-fix-ci` uses a quoted frontmatter name, which the fixture accepts.

Observed application versions were Next.js 16.4.2, React 19.3.0, Drizzle ORM 0.45.4, Drizzle Kit 0.31.11, pg 8.23.1, Zod 4.6.7, Pino 10.4.0, and Vitest 5.0.5. The eight tests, three rule self-checks, full/lightweight/advanced lint profiles, types, server-only rejection, generated SQL, embedded CRUD/rollback, build, production audit, and HTTP checks passed. The temporary application was removed. These are dated observations; the fixture's explicit selection is not a permanent upstream catalog size.

Documentation regression tests passed (nine cases). JSON/TOML examples parsed. All local navigation targets were checked after the expansion. Hero screenshots at desktop/mobile sizes showed no clipping; reduced motion selected the static source. SVG structure, attributes, and animation styles remained unchanged, and the translated READMEs retained matching navigation targets.

The preceding English migration completed five review cycles. The capability expansion then received one fresh whole-change review, with no remaining critical, important, or minor findings. An additional inventory check caught a duplicate GitHub CLI identifier; it was consolidated into the existing foundation entry, and final identifiers are unique.

A subsequent five-cycle polish review covered English and README parity, paths and validation, technical contracts, SVG/accessibility, and final integration. It corrected the playbook's mandatory-delegation wording and a reversed memory-migration heading. The round ended with no remaining findings; a fresh full disposable-project run and the nine validator regression cases passed, with all 550 local targets resolving.

The new Sentry examples received configuration/syntax review only. No Sentry OAuth, account-dependent CI query, new native-client skill session, runtime MCP loop, bundle audit, full differential security task, or shadcn component task was executed for this expansion. Windows/Ubuntu changes require the repository workflow; this local run was macOS. The production audit returned zero vulnerabilities; the full audit retained the nine development entries described below.

## Execution on October 14, 2026

The full core passed on macOS with Node.js 24.21.0 and npm, without `DATABASE_URL`. Observed versions:

| Component | Version |
|---|---|
| Next.js / React | 16.4.1 / 19.3.0 |
| Drizzle ORM / Kit | 0.45.4 / 0.31.11 |
| pg | 8.23.1 |
| Zod / Pino | 4.6.7 / 10.4.0 |
| Vitest | 5.0.4 |

The eight tests, three self-checks, lint, types, SQL/rollback, build, production HTTP, and nine skills passed. The conflict between the scaffold's Node 20 types and Vitest 5 peers was resolved using Node 24 types without forcing peers. Vitest configuration uses `.mts` for explicit ESM.

These versions are evidence, not permanent pins. In another setup, check official documentation/Context7, the CLI, stable channels, and peers; validate the combination and record sources/date. The project lockfile holds actual versions.

### Previous client and system evidence

The [previous native run](https://github.com/soumatheusgomes/vibe-coding-toolkit/actions/runs/38517653505), on Ubuntu and Windows, passed the Next.js 16.4.0 foundation, local skills, lint, types, rules, build, production audit, and HTTP. That run predates the Drizzle core described above; consult the current revision's workflow for expanded validation.

On macOS, the earlier foundation also had deterministic Graphify extraction and graph queries, as well as real Context7 queries. New Claude Code and Codex sessions discovered the nine skills through native APIs without starting a model turn. This proves discovery in that environment; other hosts need their own verification.

## Dependency audit

The full sample returned **zero production vulnerabilities** and **nine development entries** (five high and four moderate), originating from two advisories:

- [Braces / GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): stack exhaustion with deeply nested patterns, through the Next.js lint dependency chain. No patched version was published at verification time.
- [Esbuild / GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99): development server CORS in versions through 0.24.2, through stable Drizzle Kit's legacy `@esbuild-kit` chain. Esbuild has a fix from 0.25.0; the path installed by Kit still includes the affected version. Bootstrap uses generation/migration without starting esbuild's `serve` server.

The audit suggested downgrading `eslint-config-next` to 14.2.35 and Drizzle Kit to 0.18.1; these were not applied to the current stack. Do not force downgrades or overrides without verified compatibility or hide warnings. Reassess upstream updates and record the decision in the app. Passing builds/lint does not mean a clean full audit.

## Maintenance before delivery

Also check TOML, executable syntax, `git diff --check`, included file scope, and the absence of private data, caches, or validation outputs. Rule changes need the self-check and a real case in the temporary app. Additional tests are appropriate when a change or finding needs new evidence.

## Three review cycles for this update

The reviews below concern bootstrap standardization, with separate context and fixes before commit.

| Cycle | Focus | Result |
|---|---|---|
| 1 | Core, security, and tests | Isolated `LOG_LEVEL` in the logger test; reproduced and fixed the failure, with the suite also passing under `silent`/`warn` |
| 2 | Organization, manifest, and callers | No new material findings; lightweight/full profiles and four root documents consistent |
| 3 | Operation and portability | No blocking/important findings; final logs, links, and diff checked |

Expanded Ubuntu/Windows runs appear in the [main workflow](https://github.com/soumatheusgomes/vibe-coding-toolkit/actions/workflows/validate.yml?query=branch%3Amain). External PostgreSQL, production, and discovery on every host remain outside automated checks.
