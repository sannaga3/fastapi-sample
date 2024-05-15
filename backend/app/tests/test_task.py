from fastapi.testclient import TestClient


def test_find_all(client_fixture: TestClient):
    res = client_fixture.get("/api/tasks")
    assert res.status_code == 200
    tasks = res.json()
    assert len(tasks) == 2
    

def test_find_by_id_successful(client_fixture: TestClient):
    res = client_fixture.get("/api/tasks/1")
    assert res.status_code == 200
    item = res.json()
    assert item["id"] == 1


def test_find_by_id_failure(client_fixture: TestClient):
    res = client_fixture.get("/api/tasks/3")
    assert res.status_code == 404
    assert res.json()["detail"] == "タスクが見つかりません"


def test_create_item_successful(client_fixture: TestClient):
    res = client_fixture.post("/api/tasks", json={  
        "title": "title3",
        "content": "content3",
        "user_id": 1
    })
    assert res.status_code == 201
    task = res.json()
    assert task["id"] == 3
    assert task["title"] == "title3"
    
    res = client_fixture.get("/api/tasks")
    assert len(res.json()) == 3
    
    
def test_update_item_successful(client_fixture: TestClient):
    res = client_fixture.put("/api/tasks/1", json={  
        "title": "updated_title1",
        "content": "updated_content1",
    })
    assert res.status_code == 200
    item = res.json()
    assert item["id"] == 1
    assert item["title"] == "updated_title1"
    assert item["content"] == "updated_content1"
    
    
def test_delete_item_successful(client_fixture: TestClient):
    res = client_fixture.get("/api/tasks")
    assert len(res.json()) == 2
    
    res = client_fixture.delete("/api/tasks/1")
    item = res.json()
    assert res.status_code == 200
    assert item["id"] == 1
    
    res = client_fixture.get("/api/tasks")
    assert res.status_code == 200
    assert len(res.json()) == 1

