from typing import Annotated

import cruds.auth as auth_crud
import cruds.task as task_crud
from database import get_db
from fastapi import APIRouter, Depends, HTTPException, Path
from schemas.auth import TokenData
from schemas.task import Task, TaskCreate, TaskUpdate
from sqlalchemy.orm import Session
from starlette import status

DbDependency = Annotated[Session, Depends(get_db)]

router = APIRouter(prefix="/tasks", tags=["tasks"])

AuthDependency = Annotated[TokenData, Depends(auth_crud.get_current_user)]

@router.get("", response_model = list[Task], status_code=status.HTTP_200_OK)
async def find_all(db: DbDependency):
    return task_crud.find_all(db)


@router.get("/{id}", response_model = Task, status_code=status.HTTP_200_OK)
async def find_by_id(db: DbDependency, _: AuthDependency, id: int=Path(gt=0)):
    task = task_crud.find_by_id(db, id)
    if not task:
        raise HTTPException(status_code=404, detail="task not found")
    return task

@router.post("", response_model = Task, status_code=status.HTTP_201_CREATED)
async def create(db: DbDependency, authInfo: AuthDependency, request: TaskCreate):
    return task_crud.create(db, request, authInfo.user_id)


@router.put("/{id}", response_model = Task, status_code=status.HTTP_200_OK)
async def update(db: DbDependency, _: AuthDependency , request: TaskUpdate, id: int=Path(gt=0)):
    updated_task = task_crud.update(db, id, request)
    if not updated_task:
        raise HTTPException(status_code=404, detail="task not found")
    return updated_task


@router.delete("/{id}", response_model = Task, status_code=status.HTTP_200_OK)
async def delete(db: DbDependency, _: AuthDependency , id: int=Path(gt=0)):
    deleted_task = task_crud.delete(db, id)
    if not deleted_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return deleted_task