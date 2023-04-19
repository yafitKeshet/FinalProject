from sqlalchemy import Column, String

from BE.lib.utils.db.user_db import Base


class Courses(Base):
    __tablename__ = "courses"


    id = Column(String, primary_key=True, unique=True, index=True)

