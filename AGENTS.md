# Repository Guidelines

## Project Structure & Module Organization

This repository is currently a blank project workspace. Keep the root limited to project configuration and top-level documentation. As application code is introduced, use a predictable layout:

- `src/` for production source code, organized by feature or domain.
- `tests/` for automated tests, mirroring paths below `src/` where practical.
- `public/` or `assets/` for static files such as images and fonts.
- `docs/` for design notes, setup instructions, and architectural decisions.

Avoid placing reusable production code directly in the repository root. Prefer small, focused modules with explicit imports over large catch-all utility files.

## Build, Test, and Development Commands

No build system or package manager is configured yet. When adding one, document the canonical commands in `README.md` and keep them consistent with package scripts. A JavaScript-based setup, for example, should provide:

```bash
npm run dev      # start the local development server
npm run build    # create a production build
npm test         # run the automated test suite
npm run lint     # check style and common errors
```

Do not commit generated build output, dependency directories, or local environment files.

## Coding Style & Naming Conventions

Follow the formatter and linter selected for the project; do not hand-format files against their output. Use 2-space indentation for JSON, YAML, JavaScript, and TypeScript unless a language tool requires otherwise. Name files by their role: `user-profile.ts`, `UserProfile.tsx`, and `user-profile.test.ts` are preferred over vague names such as `helpers.ts`. Use clear, descriptive names and keep public APIs documented where intent is not obvious.

## Testing Guidelines

Add or update tests with every behavior change. Name tests after the behavior under test, for example `user-profile.test.ts` or `test_user_profile.py`. Include success cases, validation failures, and regressions for fixed defects. Run the full relevant test and lint commands before opening a pull request.

## Commit & Pull Request Guidelines

Git history is not available in this workspace, so no existing commit convention can be inferred. Use concise imperative subjects, such as `Add profile validation` or `Fix mobile navigation`. Keep commits focused. Pull requests should explain the change, list verification performed, link relevant issues, and include screenshots for visible UI changes.

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
