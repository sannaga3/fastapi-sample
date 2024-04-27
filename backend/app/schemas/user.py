from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    username: str = Field(min_length=2, examples=["user1"])
    email: EmailStr = Field(..., min_length=6, example="user@example.com")
    password: str = Field(min_length=6, examples=["pass11"])


class User(BaseModel):
    id: int = Field(gt=0, examples=[1])
    username: str = Field(min_length=2, examples=["user1"])
    email: EmailStr = Field(..., min_length=6, example="user@example.com")
    created_at: str = Field(min_length=19, max_length=19, examples=["2024-04-17 00:32:48"])
    updated_at: str = Field(min_length=19, max_length=19, examples=["2024-04-17 00:32:48"])
    deleted_at: Optional[str] = Field(None, min_length=19, max_length=19, examples=["2024-04-17 00:32:48"])
    
    model_config = ConfigDict(from_attributes=True)