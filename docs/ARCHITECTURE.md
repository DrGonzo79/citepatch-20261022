# Architecture

## Prototype

The Next.js 16 App Router frontend statically exports for GitHub Pages under `/citepatch-20261022`. It imports a shared fictional JSON fixture and runs a typed deterministic audit in the browser. The FastAPI service independently exposes the same core domain operation (`POST /audit`) with Pydantic validation. Pages hosts only the frontend; the Python API is runnable and tested source, not deployed.

## Production boundary

`scheduler → engine adapters → observation store → URL/page classifier → rules engine → repair brief → experiment reruns`

- Adapter workers isolate engine-specific rate limits and terms.
- Postgres owns normalized prompts, pages, observations, citations, recommendations, and experiments.
- Object storage retains permitted evidence snapshots with expiry metadata.
- The rules engine is deterministic and versioned; an optional LLM drafts copy from approved evidence.
- A queue handles runs idempotently by workspace, prompt cohort, engine, and scheduled time.

## Reliability and observability

Track success/error/latency/cost per engine; prompt completion ratio; citation parse failures; URL-classification confidence; run freshness; rule version; recommendation acceptance; shipped edits; and rerun outcomes. Alert on stale cohorts, adapter failure, and spend caps. Attach a correlation ID from run through citation and report. Never silently substitute one engine for another.

## Security and privacy

Require explicit ownership/authorization for private pages, use server-side secret storage, redact query strings, minimize raw response retention, and isolate tenants by workspace. Validate outbound URLs against SSRF, block private address ranges, sanitize captured HTML, and make deletion auditable.
