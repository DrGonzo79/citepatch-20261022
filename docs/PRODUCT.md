# Product plan

## ICP and JTBD

Founder-led B2B SaaS teams at $20K–$200K MRR with editable pricing/docs pages hire CitePatch when an AI answer recommends a competitor, so they can understand the specific content gap, ship an evidence-backed fix, and measure whether citations improve without buying an enterprise suite.

## MVP

1. Configure one domain, three competitors, and 25 buyer prompts.
2. Capture engine, response, cited URLs, timestamp, locale, and model surface across four engines.
3. Classify owned and competitor citations by page type: pricing, docs, comparison, editorial, or other.
4. Produce a deterministic page-readiness score and six-edit repair queue with evidence links.
5. Record shipped edits and rerun the unchanged prompt cohort at 7/14/28 days.

The shipped demo covers the last mile with fictional fixtures: URL validation, page switching, gap calculation, prioritized repair rules, and completion tracking. It labels simulated analysis and demo-only state.

## Data model

- `workspace(id, domain, plan, created_at)`
- `page(id, workspace_id, url, page_type, content_hash, last_seen_at)`
- `prompt(id, workspace_id, text, intent, locale, active)`
- `observation(id, prompt_id, engine, run_id, response_hash, observed_at)`
- `citation(id, observation_id, url, domain, rank, page_id?)`
- `page_signal(id, page_id, run_id, key, value, evidence)`
- `recommendation(id, page_id, rule_id, priority, rationale, status)`
- `experiment(id, page_id, baseline_run_id, edit_summary, shipped_at, verdict)`

Store evidence snapshots separately with strict retention. Hash raw responses where licensing or engine terms prohibit storage.

## AI/model strategy

Use deterministic extraction and rules first. Engine calls collect observations; a URL normalizer and classifier assign page types. Recommendations come from versioned rules whose inputs are visible. An LLM may draft copy only after the rule identifies a missing fact, with every claim grounded in user-provided source text and requiring approval. Never imply an edit caused a citation change without repeated cohort evidence.

## Economics

Validate with a $499 report, then offer $49/month Solo and $149/month Studio. The report estimates $9K booked by day 90 from 80 audits, ten reports, 20 Solo, and three Studio customers; eight of those funnel assumptions are unverified. At $49 ARPU, inference/scrape costs must remain under roughly $10/customer/month to leave room for support and gross margin. Cache identical prompt cohorts, cap reruns, and expose usage.

## Validation and GTM

Run 20 founder interviews, five manual free audits, then ten paid offers. Pass gate: 3/10 buy at $499, 2/3 ship at least one edit, and five total accept $49/month after rerun. Distribute via evidence-rich teardown posts, direct Loom audits, and partnerships with boutique SaaS SEO consultants. Do not buy broad search ads during validation.

## Moat

Page filtering is not a moat. The potential moat is an outcome corpus connecting page structure and specific edits to repeated prompt-level observations by engine and vertical. Compound it through versioned experiments, transparent benchmarks, and agency workflow—not opaque AI prose.

## Risks

- Competitors can add page-level views quickly.
- Citation variance can make good edits look ineffective or vice versa.
- Collection can violate engine terms or become uneconomic.
- Customers may confuse correlation with causation.
- Advice can encourage spammy or factually unsafe copy.
- Founder-led distribution may not scale past the first few hundred customers.

## 30/60/90 days

**Day 0–30:** deliver five concierge audits; version the rubric; secure three paid reports; establish stable prompt cohorts and evidence retention rules.

**Day 31–60:** build authenticated workspaces, scheduled runs, observation diffs, and edit logging for ten design partners; publish two anonymized case studies with uncertainty disclosed.

**Day 61–90:** launch $49 monitoring to customers who completed reports; add agency multi-workspace at $149 only after three consultants request it; decide continue/pivot/kill from paid conversion and rerun retention.
