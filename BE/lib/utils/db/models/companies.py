from sqlalchemy import Column, String, Integer

from ..user_db import Base


class Company(Base):
    __tablename__ = "company"

    name = Column(String, primary_key=True,  unique=True, index=True)
    logo = Column(String, nullable=False)
    about = Column(String, nullable=False)
    website = Column(String, nullable=False)
    number_of_employees = Column(Integer, nullable=False)
