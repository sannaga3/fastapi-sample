from typing import Optional

from models.task import TaskStatus
from pydantic import BaseModel, ConfigDict, Field


class Task(BaseModel):
    id: int = Field(gt=0, examples=[2])
    title: str = Field(min_length=2, max_length=20, examples=["sample_title"])
    content: str = Field(min_length=2, max_length=20, examples=["sample_content"])
    status: TaskStatus = Field(examples=[TaskStatus.TODO])
    created_at: str = Field(min_length=19, max_length=19, examples=["2024-04-17 00:32:48"])
    updated_at: str = Field(min_length=19, max_length=19, examples=["2024-04-17 00:32:48"])
    deleted_at: Optional[str] = Field(None, min_length=19, max_length=19, examples=["2024-04-17 00:32:48"])
    
    model_config = ConfigDict(from_attributes=True) # レスポンスを辞書型で返す
    

class TaskCreate(BaseModel):
    title: str = Field(min_length=2, max_length=20, examples=["sample_title"])
    content: str = Field(min_length=2, max_length=20, examples=["sample_content"])
    

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=20, examples=["updated_title"])
    content: Optional[str] = Field(None, min_length=2, max_length=20, examples=["updated_content"])
    status: Optional[TaskStatus] = Field(None, examples=[TaskStatus.TODO])
