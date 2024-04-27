from database import Base
from models.base import BaseModelMixin
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class User(BaseModelMixin, Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username =  Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    
    tasks = relationship("Task", back_populates="user")