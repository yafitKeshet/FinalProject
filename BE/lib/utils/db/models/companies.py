from sqlalchemy import Column, String

from lib.utils.db.user_db import Base


class Company(Base):
    __tablename__ = "company"


    id = Column(String, primary_key=True, unique=True, index=True)

