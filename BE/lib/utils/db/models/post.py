import uuid

from sqlalchemy import Column, String, JSON


from BE.lib.utils.db.user_db import Base


class Post(Base):

    __tablename__ = "post"

    AUTHOR = "author"

    post_id = Column(String, primary_key=True, unique=True, nullable=False)
    author_email = Column(String, nullable=False)
    faculty = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    likes = Column(JSON, nullable=True, default=[])  # Use ARRAY data type for likes

    def add_like(self, user_email):
        if user_email not in self.likes:
            self.likes.append(user_email)

    def remove_like(self, user_email):
        if user_email in self.likes:
            self.likes.remove(user_email)
