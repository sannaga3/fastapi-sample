from models.task import Task
from schemas.task import TaskCreate, TaskUpdate
from sqlalchemy import desc
from sqlalchemy.orm import Session


def find_all(db: Session):
    return (
        db.query(Task)
        .filter(Task.deleted_at == None)
        .order_by(desc(Task.id))
        .all()
    )

def find_by_id(db: Session, id: int):
    return (
        db.query(Task)
            .filter(Task.id == id)
            .filter(Task.deleted_at == None)
            .first()
    )

def create(db: Session, task: TaskCreate, user_id: int):
    new_task = Task(
        **task.model_dump(),
        user_id = user_id
    )
    db.add(new_task)
    db.commit()
    return new_task


def update(db: Session, id: int, update_task: TaskUpdate):
    db_task = find_by_id(db, id)
    if db_task is None:
        return None
    
    if update_task.title is not None:
        db_task.title = update_task.title
    if update_task.content is not None:
        db_task.content = update_task.content
    if update_task.status is not None:
        db_task.status = update_task.status
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def delete(db: Session, id: int):
    db_task = find_by_id(db, id)
    if db_task is None:
        return None
    
    db_task.delete(db)
    return db_task