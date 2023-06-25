from datetime import datetime

from sqlalchemy import Column, String, Enum, DateTime
from sqlalchemy.orm import relationship

from ..user_db import Base
from ...enums import Faculty


class Question(Base):
    __tablename__ = 'question'
    question_id = Column(String, primary_key=True, unique=True, nullable=False)
    author_email = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    faculty = Column(Enum(Faculty), nullable=True)
    published_time = Column(DateTime, default=datetime.utcnow)
    question_comments = relationship("QuestionComment", back_populates="question", lazy="joined")
