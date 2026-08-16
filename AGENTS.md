# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static front-end app: **Aevum Institutional Digital Assets**, a Vite + React 19 + TypeScript marketing/landing site (dark theme, animated canvas, interactive modals). There is no backend service or database; everything runs client-side.

- **Package manager is Bun** (`bun.lock` is the source of truth). Bun is installed at `~/.bun/bin/bun`. Standard scripts live in `package.json`:
  - Lint / type-check: `bun run lint` (runs `tsc --noEmit`)
  - Build: `bun run build` (runs `vite build`)
  - Dev server: `bun run dev` (Vite on port `3000`, bound to `0.0.0.0`)
- **No secrets are required to run or test.** `.env.example` lists `GEMINI_API_KEY`/`APP_URL` (auto-injected by AI Studio), but `@google/genai` is not imported anywhere in `src/` — the `process.env` references only appear inside display-only code-example strings in `src/data/mockData.ts`. The app runs fully without any env vars.
- **HMR toggle:** `vite.config.ts` disables HMR/file-watching when `DISABLE_HMR=true`. Locally HMR is on by default; if you edit files and don't see updates, check that env var.
- **Hello-world flow to verify the app:** load `http://localhost:3000/`, open the "Apply for Institutional Access" modal via the "Create Account" button in the hero section (note: the navbar "Create Account" opens the login modal instead), fill entity/name/email, and submit to reach the "Institutional Application Received" confirmation screen.
