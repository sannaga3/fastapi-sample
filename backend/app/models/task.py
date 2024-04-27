from enum import Enum

from database import Base
from models.base import BaseModelMixin
from sqlalchemy import Column, ForeignKey, Integer, String, Enum as EnumValid
from sqlalchemy.orm import relationship

class TaskStatus(Enum):
    TODO = '未着手'
    IN_PROGRESS = '対応中'
    DONE = '完了'


class Task(BaseModelMixin, Base):
    __tablename__ = 'tasks'
    
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=True)
    status = Column(EnumValid(TaskStatus), nullable=False, default=TaskStatus.TODO)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    user = relationship("User", back_populates="tasks")
    
    # 論理削除呼び出し　cls は selfの代わりの為、呼び出す際に引数の考慮不要
    def delete(cls, db_task):
        return super().delete(db_task) 