from sqlalchemy import Column, String

from ..user_db import Base


class Company(Base):
    __tablename__ = "company"

    id = Column(String, primary_key=True, unique=True, index=True)
    name = Column(String, index=True, nullable=False)
    logo = Column(String, nullable=False)


