"use client";

import { useMemo, useState } from "react";
import fixture from "@/data/demo_audit.json";
import { auditPage, type PageInput } from "@/lib/audit";

export default function Home() {
  const [selected, setSelected] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<string[]>([]);
  const page = fixture.pages.find((item) => item.id === selected) as PageInput | undefined;
  const result = useMemo(() => page ? auditPage(page) : null, [page]);

  function runAudit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!/^https?:\/\/[a-z0-9.-]+/i.test(url)) { setError("Enter a full URL beginning with http:// or https://"); return; }
    setLoading(true);
    setDone([]);
    window.setTimeout(() => { setSelected("pricing"); setLoading(false); }, 450);
  }

  function toggle(title: string) {
    setDone((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title]);
  }

  return <main>
    <header className="topbar"><a className="brand" href="#top" aria-label="CitePatch home"><span>CP</span>CitePatch</a><div className="demo-pill">Demo data · simulated analysis</div></header>
    <section className="hero" id="top">
      <div><p className="eyebrow">AI CITATION REPAIR DESK</p><h1>Fix the page<br/>AI <em>skipped.</em></h1><p className="lede">See which pricing, docs, or comparison page lost to a competitor—then leave with a concrete repair queue.</p></div>
      <form className="audit-form" onSubmit={runAudit} noValidate>
        <label htmlFor="page-url">Page to inspect</label>
        <div className="input-row"><input id="page-url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://your-saas.com/pricing" aria-describedby="url-help"/><button disabled={loading}>{loading ? "Analyzing…" : "Run free audit"}</button></div>
        <small id="url-help">Prototype uses fictional Northstar Billing results across four engines.</small>
        {error && <p className="error" role="alert">{error}</p>}
      </form>
    </section>

    <section className="workspace" aria-label="Citation audit workspace">
      <aside>
        <p className="section-label">DEMO PAGE SET</p>
        {fixture.pages.map((item) => <button key={item.id} className={`page-tab ${selected === item.id ? "active" : ""}`} onClick={() => { setSelected(item.id); setDone([]); }}>
          <span>{item.label}</span><small>{item.url}</small><b>{item.brandCitations}/{item.engines} cited</b>
        </button>)}
      </aside>
      <div className="panel">
        {!page || !result ? <div className="empty"><div className="radar">◎</div><h2>Choose a page or run the audit</h2><p>We’ll compare demo citations, inspect page signals, and rank the first edits to ship.</p></div> : <>
          <div className="panel-head"><div><p className="section-label">{page.prompt}</p><h2>{page.label} repair brief</h2></div><div className={`score ${result.score < 50 ? "warn" : ""}`}><strong>{result.score}</strong><span>/100 readiness</span></div></div>
          <div className="metrics"><div><span>Brand citations</span><strong>{page.brandCitations}/{page.engines}</strong></div><div><span>Competitor citations</span><strong>{page.competitorCitations}/{page.engines}</strong></div><div><span>Gap</span><strong>−{result.gap}</strong></div><div><span>Status</span><strong>{result.status}</strong></div></div>
          <div className="split"><section><h3>Competitors cited instead</h3>{page.competitors.map((item) => <div className="competitor" key={item}><span>↗</span>{item}</div>)}</section><section><h3>Repair queue</h3>{result.repairs.map((repair) => <button className={`repair ${done.includes(repair.title) ? "done" : ""}`} key={repair.title} onClick={() => toggle(repair.title)} aria-pressed={done.includes(repair.title)}><span className="check">{done.includes(repair.title) ? "✓" : repair.priority}</span><span><b>{repair.title}</b><small>{repair.detail}</small></span><i>{repair.impact}</i></button>)}</section></div>
          {done.length > 0 && <p className="progress-note" role="status">{done.length} of {result.repairs.length} demo edits marked ready.</p>}
        </>}
      </div>
    </section>
    <footer><span>CitePatch prototype</span><span>Analysis is simulated; no live AI engines are queried.</span></footer>
  </main>;
}
