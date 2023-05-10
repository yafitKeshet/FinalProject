from sqlalchemy import Column, String

from lib.utils.db.user_db import Base


class Course(Base):
    __tablename__ = "course"


    id = Column(String, primary_key=True, unique=True, index=True)

