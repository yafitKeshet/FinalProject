from sqlalchemy import Column, String

from BE.lib.utils.db.user_db import Base


# ToDo: Foreign key must be post id
class PostComment(Base):
    __tablename__ = "post_comment"


    id = Column(String, primary_key=True, unique=True, index=True)

