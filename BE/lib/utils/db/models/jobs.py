from sqlalchemy import Column, String

from BE.lib.utils.db.user_db import Base


class Jobs(Base):
    __tablename__ = "jobs"


    id = Column(String, primary_key=True, unique=True, index=True)

