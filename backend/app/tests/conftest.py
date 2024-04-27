import os
import sys

app_dir = os.path.join(os.path.dirname(__file__), "..")  #  ルートディレクトリ配下の各ファイルをテストでインポートできるようにパスを追加
sys.path.append(app_dir)
import pytest
from cruds.auth import get_current_user
from database import Base, get_db
from fastapi.testclient import TestClient
from main import app
from models.task import Task
from models.user import User
from passlib.context import CryptContext
from schemas.auth import TokenData
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool


@pytest.fixture()
def session_fixture():
    engine = create_engine(
        url="sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool
    )
    # モデルで定義したテーブルをテスト用にmysqlで作成
    Base.metadata.create_all(engine)
    # データベースへの接続とトランザクションの管理, bind=engineでセッションがenginにバインドされる
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    # セッション作成
    db= SessionLocal()
    
    try:
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        hashed_password = pwd_context.hash("password")
        user = User(username="testuser", email="test@example.com", password=hashed_password)
        db.add(user)
        
        task = Task(title="title", content="content", user_id=1)
        task2 = Task(title="title2", content="content2", user_id=1)
        db.add(task)
        db.add(task2)
        db.commit()
        yield db
    finally:
        db.close()
        

@pytest.fixture()
def token_fixture():
    return TokenData(username="user1", user_id="1")

@pytest.fixture()
def client_fixture(session_fixture: Session, token_fixture: TokenData):
    def override_get_db():
        return session_fixture
    
    def override_get_current_user():
        return token_fixture
    
    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user

    client = TestClient(app)
    yield client

    app.dependency_overrides.clear()
