from datetime import timedelta
from typing import Annotated

from cruds import auth as auth_cruds
from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from schemas.auth import Token
from schemas.user import User, UserCreate
from sqlalchemy.orm import Session
from starlette import status

DbDependency = Annotated[Session, Depends(get_db)]
formDependency = Annotated[OAuth2PasswordRequestForm, Depends()]

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", response_model = User, status_code=status.HTTP_200_OK)
async def create_user(db: DbDependency, user: UserCreate):
    return auth_cruds.create_user(db, user)


@router.post("/login", status_code = status.HTTP_200_OK, response_model=Token)
async def login_user(db: DbDependency, form_data: formDependency):
    user = auth_cruds.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password.")
    
    token = auth_cruds.create_token(user.username, user.id, timedelta(minutes=30))
    return {
      "access_token": token,
      "token_type": "bearer"
    }