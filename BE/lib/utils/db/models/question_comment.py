from datetime import datetime
from typing import List

from sqlalchemy import Column, String, Integer, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship

from ..user_db import Base


class QuestionComment(Base):
    __tablename__ = "question_comment"

    comment_id = Column(String, primary_key=True, unique=True, index=True)
    author_email = Column(String, nullable=False)
    content = Column(String)
    published_time = Column(DateTime, default=datetime.utcnow)
    likes = Column(JSON, nullable=True, default=[])  # Use ARRAY data type for likes

    question_id = Column(String, ForeignKey('question.question_id'))
    question = relationship("Question", back_populates="question_comments", lazy="joined")

    def add_like(self, user_email) -> List[str]:
        likes = self.likes.copy()
        if user_email not in self.likes:
            likes.append(user_email)
        return likes

    def remove_like(self, user_email: str) -> List[str]:
        likes = self.likes.copy()
        if user_email in self.likes:
            likes = [email for email in likes if email != user_email]
        return likes