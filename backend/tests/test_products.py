import sys
import os

# Add backend folder to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))



from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_pagination():
    r1 = client.get("/products?page=1&limit=2")
    assert r1.status_code == 200
    print("Page 1:", r1.json())

    r2 = client.get("/products?page=2&limit=2")
    assert r2.status_code == 200
    print("Page 2:", r2.json())

    r3 = client.get("/products?category_id=1&page=1&limit=5")
    assert r3.status_code == 200
    print("Category 1:", r3.json())
