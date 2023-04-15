from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship

from .database import Base
from ...enums import Faculty, Year


class Courses(Base):
    __tablename__ = "courses"


    id = Column(String, primary_key=True, unique=True, index=True)

