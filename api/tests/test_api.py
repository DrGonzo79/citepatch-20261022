from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)


def test_health():
    assert client.get("/health").json() == {"status": "ok"}


def test_audit_prioritizes_missing_signals():
    response = client.post("/audit", json={
        "url": "https://northstar.example/pricing", "engines": 4,
        "brand_citations": 1, "competitor_citations": 4,
        "signals": {"clear_price": False, "updated_date": False, "proof": True, "comparison": False}
    })
    assert response.status_code == 200
    body = response.json()
    assert body["score"] == 25
    assert body["gap"] == 3
    assert body["repairs"][0]["title"] == "Make pricing extractable"


def test_rejects_bad_url():
    response = client.post("/audit", json={"url": "northstar.example", "engines": 4, "brand_citations": 1, "competitor_citations": 2, "signals": {"clear_price": True, "updated_date": True, "proof": True, "comparison": True}})
    assert response.status_code == 422


def test_rejects_impossible_count():
    response = client.post("/audit", json={"url": "https://northstar.example", "engines": 2, "brand_citations": 3, "competitor_citations": 1, "signals": {"clear_price": True, "updated_date": True, "proof": True, "comparison": True}})
    assert response.status_code == 422
