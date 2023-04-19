from sqlalchemy import Column, String

from BE.lib.utils.db.user_db import Base


class Posts(Base):
    __tablename__ = "posts"


    id = Column(String, primary_key=True, unique=True, index=True)

