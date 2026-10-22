# Phased build prompts

## Phase 1 — evidence collector

Build an idempotent worker that runs a fixed buyer-prompt cohort against approved engine adapters. Persist engine, model surface, locale, prompt version, response hash, cited URLs, timestamp, latency, and cost. Add contract tests and never fabricate a successful observation when an adapter fails.

## Phase 2 — page intelligence

Normalize URLs, classify page type, snapshot permitted public HTML, and extract visible facts with evidence spans. Implement SSRF protection, robots/terms controls, content hashes, confidence scores, and fixture-based tests for pricing, docs, and comparison pages.

## Phase 3 — explainable repair rules

Create a versioned rule registry that turns missing page signals and competitor evidence into recommendations. Every recommendation must expose inputs, rule version, rationale, confidence, and a reversible status. Keep LLM copy drafting optional and human-approved.

## Phase 4 — experiment loop

Let users record shipped edits, freeze a baseline prompt cohort, rerun on days 7/14/28, and visualize variance. Report association, not causation. Add minimum sample rules and flag engine/model changes that invalidate comparisons.

## Phase 5 — commercial hardening

Add workspaces, RBAC, usage caps, billing entitlements, deletion/export, engine-cost budgets, SLOs, audit logs, and agency multi-workspace support. Prove paid concierge demand before automating report generation.
