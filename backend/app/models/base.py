from datetime import datetime

from database import Base
from sqlalchemy import Column, String


class BaseMixin:
    created_at = Column(String, nullable=False, default=datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    updated_at = Column(String, nullable=False, default=datetime.now().strftime('%Y-%m-%d %H:%M:%S'), onupdate=datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    deleted_at = Column(String, nullable=True)
    
class BaseModelMixin(Base, BaseMixin):
    __abstract__ = True
    
    def delete(self, db):
        self.deleted_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        db.commit()