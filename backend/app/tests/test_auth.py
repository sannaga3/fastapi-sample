from fastapi.testclient import TestClient


def test_signup(client_fixture: TestClient):
    response = client_fixture.post(
        "/api/auth/signup",
        json={
            "username": "testuser2",
            "email": "testuser2@example.com",
            "password": "password2"
        }
    )
    assert response.status_code == 200
    assert "id" in response.json()
    assert response.json()["username"] == "testuser2"
    assert response.json()["email"] == "testuser2@example.com"


def test_login(client_fixture: TestClient):
    response = client_fixture.post(
        "/api/auth/login",
        data={"username": "testuser", "password": "password"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "token_type" in response.json()
