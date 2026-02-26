# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

"Weddy" — a SvelteKit 2 + Svelte 5 wedding website (single-page app). No backend, no database, no API keys required.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` (port 5173) |
| Type check | `pnpm check` |
| Production build | `pnpm build` |
| Preview prod build | `pnpm preview` |

### Notes

- `pnpm check` has 1 pre-existing type error (`crossorigin` attribute type mismatch in `src/routes/+layout.svelte`). This is a known Svelte/TS strictness issue and does not affect runtime.
- The Vite dev server may exit immediately when run via `pnpm dev &` in certain shell contexts. Use `npx vite dev --host 0.0.0.0` directly in those cases, or run it as a foreground blocking command.
- `@tailwindcss/oxide` is approved for build scripts in `package.json` under `pnpm.onlyBuiltDependencies`.
- No `.env` files are needed — the app has no secrets or environment variable requirements.
