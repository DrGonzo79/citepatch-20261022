export type Signals = { clearPrice: boolean; updatedDate: boolean; proof: boolean; comparison: boolean };
export type PageInput = { id: string; label: string; url: string; prompt: string; engines: number; brandCitations: number; competitorCitations: number; signals: Signals; competitors: string[] };
export type Repair = { priority: number; title: string; detail: string; impact: "high" | "medium" };
export type AuditResult = { score: number; gap: number; status: string; repairs: Repair[] };

const checks: Array<[keyof Signals, string, string]> = [
  ["clearPrice", "Make pricing extractable", "Put plan names, prices, limits, and billing periods in a plain HTML table above the fold."],
  ["updatedDate", "Add freshness evidence", "Show a visible last-reviewed date and keep product facts synchronized with release notes."],
  ["proof", "Ground claims in proof", "Attach a named customer result or benchmark to each major claim; avoid unsupported superlatives."],
  ["comparison", "Answer the comparison", "Add a neutral fit matrix that states when your product is and is not the better choice."]
];

export function auditPage(page: PageInput): AuditResult {
  if (page.engines < 1 || page.brandCitations < 0 || page.competitorCitations < 0) throw new Error("Citation counts and engines must be valid.");
  const gap = Math.max(0, page.competitorCitations - page.brandCitations);
  const signalScore = Object.values(page.signals).filter(Boolean).length * 15;
  const citationScore = Math.round((Math.min(page.brandCitations, page.engines) / page.engines) * 40);
  const score = Math.min(100, signalScore + citationScore);
  const repairs = checks.filter(([key]) => !page.signals[key]).map(([, title, detail], index) => ({priority: index + 1, title, detail, impact: index === 0 || gap >= 3 ? "high" as const : "medium" as const}));
  if (repairs.length === 0) repairs.push({priority: 1, title: "Test citation stability", detail: "Re-run this prompt weekly; passing page signals do not guarantee a stable citation.", impact: "medium"});
  return {score, gap, status: gap >= 3 ? "Urgent citation gap" : gap > 0 ? "Citation gap" : "Competitive", repairs};
}
