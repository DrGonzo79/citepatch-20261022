from typing import Literal
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="CitePatch API", version="1.0.0")


class Signals(BaseModel):
    clear_price: bool
    updated_date: bool
    proof: bool
    comparison: bool


class AuditRequest(BaseModel):
    url: str = Field(pattern=r"^https?://", max_length=500)
    engines: int = Field(ge=1, le=10)
    brand_citations: int = Field(ge=0, le=10)
    competitor_citations: int = Field(ge=0, le=10)
    signals: Signals


class Repair(BaseModel):
    priority: int
    title: str
    detail: str
    impact: Literal["high", "medium"]


CHECKS = (
    ("clear_price", "Make pricing extractable", "Put plan names, prices, limits, and billing periods in a plain HTML table above the fold."),
    ("updated_date", "Add freshness evidence", "Show a visible last-reviewed date and synchronize facts with release notes."),
    ("proof", "Ground claims in proof", "Attach a named customer result or benchmark to each major claim."),
    ("comparison", "Answer the comparison", "Add a neutral fit matrix stating when your product is and is not the better choice."),
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/audit")
def audit(payload: AuditRequest) -> dict:
    if payload.brand_citations > payload.engines or payload.competitor_citations > payload.engines:
        raise HTTPException(status_code=422, detail="Citation counts cannot exceed engines checked")
    gap = max(0, payload.competitor_citations - payload.brand_citations)
    values = payload.signals.model_dump()
    score = min(100, sum(values.values()) * 15 + round(payload.brand_citations / payload.engines * 40))
    repairs = [Repair(priority=index + 1, title=title, detail=detail, impact="high" if index == 0 or gap >= 3 else "medium") for index, (key, title, detail) in enumerate(item for item in CHECKS if not values[item[0]])]
    if not repairs:
        repairs = [Repair(priority=1, title="Test citation stability", detail="Re-run weekly; page readiness does not guarantee a stable citation.", impact="medium")]
    return {"url": payload.url, "score": score, "gap": gap, "status": "Urgent citation gap" if gap >= 3 else "Citation gap" if gap else "Competitive", "repairs": [repair.model_dump() for repair in repairs]}
