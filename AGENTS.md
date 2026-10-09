# Repository Guidelines

## Project Overview

Fennec Studio website: a Next.js (App Router) site built as a static export and deployed to Cloudflare Pages (project `fennec-studio`, output `out/`). Pages are bilingual (English and Arabic). Git history exists on `origin/main` (GitHub `sam22ir/fennec-studio`).

## Project Structure & Module Organization

- `app/page.tsx` — home page (`/`), with `app/layout.tsx` and `app/globals.css` for the shared shell and styles.
- `app/projects/page.tsx` — project index (`/projects`).
- `app/projects/[slug]/page.tsx` and `CaseStudyClient.tsx` — case study pages (`/projects/koupa`, `lamsa`, `nabdh`, `masroof`, `nexus`), statically generated via `generateStaticParams`.
- `app/projects/project-data.ts` — source of truth for project content (slugs, English and Arabic copy, logos, screens). Edit project content here.
- `app/components/` — shared UI (`Header`, `Hero`, `ProjectPreviews`, `KoupaShowcase`, animated marks, and similar).
- `public/` — static assets (`fennec-*.jpg` brand images, `projects/` logos, marks and screens, `fonts/`).
- `docs/superpowers/` — design specs and plans.
- Root holds only configuration and top-level docs (`README.md`, `PRODUCT.md`, `CREDITS.md`, `AGENTS.md`).

Avoid placing reusable production code directly in the repository root. Prefer small, focused modules with explicit imports over large catch-all utility files.

## Build, Test, and Development Commands

Package manager is npm (`package-lock.json`). Scripts from `package.json`:

```bash
npm install      # install dependencies
npm run dev      # start the local development server (next dev)
npm run lint     # eslint .
npm run typecheck  # tsc --noEmit
npm run build    # next build; writes the static export to out/
npm run start    # next start (not used for the static export)
npm run deploy   # npx wrangler pages deploy out --project-name=fennec-studio
```

There is no test script configured yet. When adding tests, add a `test` script to `package.json` and document it here.

Deploy with `npm run build` followed by `npm run deploy`. Cloudflare settings are in `wrangler.jsonc` (`pages_build_output_dir: ./out`).

## Configuration

- `next.config.ts` sets `output: "export"` and `images.unoptimized: true`, so the site is fully static. Do not add server-only features (API routes, server actions, image optimization) without changing this.
- `tsconfig.json`, `eslint.config.mjs` (extends `eslint-config-next`) and `next-env.d.ts` (generated) are the tool configs.
- Do not commit `node_modules/`, `.next/`, `out/`, `.wrangler/`, or local environment files.

## Coding Style & Naming Conventions

Follow the formatter and linter selected for the project; do not hand-format files against their output. Use 2-space indentation for JSON, YAML, JavaScript, and TypeScript unless a language tool requires otherwise. Name files by their role: `user-profile.ts`, `UserProfile.tsx`, and `user-profile.test.ts` are preferred over vague names such as `helpers.ts`. Use clear, descriptive names and keep public APIs documented where intent is not obvious.

## Testing Guidelines

Add or update tests with every behavior change once a test runner exists. Name tests after the behavior under test. Until then, run `npm run lint`, `npm run typecheck` and `npm run build` before opening a pull request.

## Commit & Pull Request Guidelines

Use concise imperative subjects, such as `Add profile validation` or `Fix mobile navigation`. Keep commits focused. Pull requests should explain the change, list verification performed, link relevant issues, and include screenshots for visible UI changes.

## Configuration & Security

Store secrets only in untracked local environment files (for example, `.env.local`). Provide a sanitized `.env.example` when configuration is required, and never commit keys, tokens, or production credentials.

## Spawn-agent defaults

Leave child model selection to the Codex spawn system. Do not pass `model` or `reasoning_effort` to `spawn_agent` unless the user explicitly names them.

Codex resolves a child model in this order: explicit spawn value, then `agents.default_subagent_model`, then the parent session. This machine has no `[agents]` default, so omitting `model` is the default path.

Do not pick `grok-4.6`, `gpt-5.6-luna`, or any other slug yourself. The spawn tool may advertise Luna; ignore that unless the user asked for that model.

- After `wait_agent`, call `list_agents`. `{"message":"Wait completed.","timed_out":false}` is not a DONE report. An `errored` child is a failure; do not invent a status.
- Pass integer timeouts only (`180000`, not `180000.0`). A float timeout is rejected.
- Do not create an unbounded thread goal such as "do the 13 tasks" while waiting on sub-agents. That auto-continues the parent and loops the same status message until the session is unusable.

## Codex Multi-Agent v2

The second supported delegation path is Codex CLI's v2 workflow. Enable
`features.multi_agent_v2=true` and do not pin `--model`. Let Codex use the
active session default.

```bash
codex -c features.multi_agent_v2=true \
  "Use multi-agent v2. Delegate these independent tasks to separate sub-agents in parallel, wait for all results, then combine them: <task>"
```

Use the collaboration tool directly for delegation. Do not delegate through
`exec`, shell commands, or generated shell text.

The `codex exec` command below is verification only; it does not replace direct
collaboration dispatch.

For a non-interactive check, use `codex exec --ephemeral --json --sandbox
read-only` with the same model and feature overrides. Confirm delegation from
JSONL `collab_tool_call`, `agent_message`, and `turn.completed` events. Do not
pass `--ask-for-approval` to `codex exec`.
