# CEO review

## Premise

The category is real; the proposed product is not yet differentiated. “Track AI citations more cheaply” loses in a field of 30+ tools. The only credible opening is a service-quality answer to a narrower question: **what should I change on the exact revenue page that lost?**

**Decision:** position around pricing-page repair and measurable reruns, not generic AI visibility.

## ICP and wedge

“Small SaaS” was too broad. Teams without public pricing or the ability to edit content cannot realize value quickly. A free audit also risks attracting curiosity rather than urgency.

**Decision:** target founder-led B2B SaaS at $20K–$200K MRR with public pricing, named competitors, and a witnessed AI loss. Validate the $499 human-reviewed report before the $49 tracker.

## GTM and economics

The source plan’s 600 Reddit comments and 500 Looms are activities, not a channel advantage. At $49/month, high-touch support destroys economics, while paid search invites a capital war. The 90-day model depends mostly on assumptions.

**Decision:** gate on 3/10 paid report offers, two implemented edits, and five explicit monitoring commitments. Stop if those fail. Use consultants as leverage only after direct delivery teaches the rubric.

## Moat

Page-type filters and PDF reports are features incumbents can clone. The moat thesis must be an outcome dataset linking versioned edits to repeated observations. Even that is vulnerable if citation noise overwhelms treatment effects.

**Decision:** capture experiment provenance from day one; expose uncertainty; do not claim causal lift from a single rerun.

## Architecture and AI

An LLM-first rewrite generator would be easy to demo and hard to trust. Collection reliability, URL normalization, evidence capture, cohort stability, and cost control are the real system.

**Decision:** deterministic versioned rules first; LLM only drafts grounded copy. Isolate engine adapters, enforce idempotency, cap costs, and preserve model/locale timestamps.

## Observability and failure modes

Critical failures include silently missing an engine, classifying the wrong page, comparing different prompt cohorts, retaining prohibited responses, and treating random churn as improvement.

**Decision:** measure adapter completeness, parse confidence, cohort drift, cost, content hash, and recommendation outcomes. A partial run is visibly partial and cannot power a verdict.

## Final call

Build the concierge experiment and narrow workflow. Do not build a broad tracker until paid reports and rerun retention exist. The prototype was adjusted accordingly: page-specific views, transparent deterministic scoring, fictional data labels, actionable repairs, and no fake live-engine claims.
