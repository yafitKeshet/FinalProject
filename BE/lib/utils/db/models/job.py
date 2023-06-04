from sqlalchemy import Column, String

from ..user_db import Base


class Job(Base):
    __tablename__ = "job"


    id = Column(String, primary_key=True, unique=True, index=True)

