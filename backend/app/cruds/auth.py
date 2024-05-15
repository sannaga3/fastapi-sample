from datetime import datetime, timedelta
from typing import Annotated

from config import get_settings
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from models.user import User
from passlib.context import CryptContext
from schemas.auth import TokenData
from schemas.user import UserCreate
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

settings = get_settings()
ALGORITHM = settings.algorithm
JWT_SECRET_KEY = settings.jwt_secret_key

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def create_user(db: Session, user: UserCreate):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash(user.password)

    try:
        new_user = User(
            username = user.username,
            email= user.email,
            password = hashed_password,
        )
        db.add(new_user)
        db.commit()
        
        return new_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ユーザー名もしくはメールアドレスが既に使われています")


def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    if not pwd_context.verify(password, user.password):
        return None
    
    return user


def create_token(username: str, user_id: int, expires_delta: timedelta):
    expires = datetime.now() + expires_delta
    payload = {
        "sub": username, 
        "id": user_id, 
        "exp": expires
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=ALGORITHM)
    
    return token


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY)
        username = payload.get("sub")
        user_id = str(payload.get("id"))
        if username is None or user_id is None:
            return None
        return TokenData(username=username, user_id=user_id)
    except JWTError:
        raise JWTError