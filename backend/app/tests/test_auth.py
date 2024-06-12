from fastapi.testclient import TestClient


def test_signup(client_fixture: TestClient):
    res = client_fixture.post(
        "/api/auth/signup",
        json={
            "username": "testuser2",
            "email": "testuser2@example.com",
            "password": "password2"
        }
    )
    assert res.status_code == 200
    assert "id" in res.json()
    assert res.json()["username"] == "testuser2"
    assert res.json()["email"] == "testuser2@example.com"


def test_login(client_fixture: TestClient):
    res = client_fixture.post(
        "/api/auth/login",
        data={"username": "testuser", "password": "password"}
    )
    assert res.status_code == 200
    assert "access_token" in res.json()
    assert "token_type" in res.json()


def test_me(client_fixture: TestClient):    
    res = client_fixture.get("/api/auth/me")
    assert res.status_code == 200
    user = res.json()
    assert user["username"] == "testuser"
    assert user["email"] == "test@example.com"
