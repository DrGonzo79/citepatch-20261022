# CitePatch

CitePatch is a runnable prototype for page-level AI citation repair. It shows a small SaaS team which pricing, docs, or comparison page lost citations to competitors and produces an explainable repair queue.

The browser demo uses clearly labeled fictional data and simulated analysis. No live model API is called. The included FastAPI backend performs the real deterministic scoring and prioritization operation, but is not publicly hosted.

## Run the frontend

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Try invalid URL validation, run the sample audit, switch among three page types, and mark repair steps complete.

## Run the API

```bash
uv sync --project api --locked --dev
uv run --project api uvicorn api.main:app --reload
```

Example operation: `POST /audit` with a URL, engine/citation counts, and four page signals. The API validates impossible counts, calculates readiness and citation gap, and returns prioritized repairs.

## Verify

```bash
npm run typecheck
npm run test:e2e
npm run build
npm audit --audit-level=high
uv run --project api pytest api/tests
```

## Repository map

- `app/` — responsive Next.js workflow
- `lib/audit.ts` — typed frontend domain operation
- `data/demo_audit.json` — explicit fictional fixtures
- `api/` — FastAPI operation and integration tests
- `tests/` — desktop/mobile Playwright interactions and overflow check
- `research/notes.md` — derived IdeaBrowser research summary
- `docs/` — product, architecture, diagnostic, review, score, and build prompts
- `evidence/` — screenshots produced by Playwright

## Source and status

Derived from the accessible IdeaBrowser Idea of the Day report for October 22, 2026: https://www.ideabrowser.com/hub/ideas/today. Revenue figures and market evidence are illustrative and are not investment advice. See [research/notes.md](research/notes.md) for evidence and uncertainty.

GitHub Pages deploys the static frontend under the repository base path. The Python backend remains tested source until a separate host is approved.
