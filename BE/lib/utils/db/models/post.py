from sqlalchemy import Column, String

from BE.lib.utils.db.user_db import Base


class Post(Base):
    __tablename__ = "post"


    id = Column(String, primary_key=True, unique=True, index=True)

