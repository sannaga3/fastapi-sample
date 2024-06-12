from datetime import timedelta
from typing import Annotated

from cruds import auth as auth_crud
from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from schemas.auth import Token, TokenData
from schemas.user import User, UserCreate
from sqlalchemy.orm import Session
from starlette import status

DbDependency = Annotated[Session, Depends(get_db)]
formDependency = Annotated[OAuth2PasswordRequestForm, Depends()]
AuthDependency = Annotated[TokenData, Depends(auth_crud.get_current_user)]


router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/signup", response_model = User, status_code=status.HTTP_200_OK)
async def create_user(db: DbDependency, user: UserCreate):
    return auth_crud.create_user(db, user)


@router.post("/login", status_code = status.HTTP_200_OK, response_model=Token)
async def login_user(db: DbDependency, form_data: formDependency):
    if not form_data.username or not form_data.password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ユーザー名とパスワードを両方入力してください")
    
    user = auth_crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="ユーザー名とパスワードを正しく入力してください")
    
    token = auth_crud.create_token(user.username, user.id, timedelta(minutes=60))
    
    return {
        "access_token": token,
        "token_type": "bearer"
    }

    
@router.get("/me", response_model=User, status_code=200)
async def find_me(db: DbDependency, authInfo: AuthDependency):
    print(authInfo)
    user = auth_crud.find_me(db, authInfo.user_id)
    if not user:
        raise HTTPException(status_code=401, detail="認証情報を取得できませんでした")
    return user