import uuid
from datetime import datetime
from typing import List

from sqlalchemy import Column, String, JSON, DateTime


from ..user_db import Base


class Post(Base):

    __tablename__ = "post"

    AUTHOR = "author"

    post_id = Column(String, primary_key=True, unique=True, nullable=False)
    author_email = Column(String, nullable=False)
    faculty = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    likes = Column(JSON, nullable=True, default=[])  # Use ARRAY data type for likes
    published_time = Column(DateTime, default=datetime.utcnow)

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
