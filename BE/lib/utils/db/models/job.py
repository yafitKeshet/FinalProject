from sqlalchemy import Column, String, DateTime, Integer, Enum
from ..user_db import Base
from ...enums import JobTime, Faculty, Experience


class Job(Base):
    __tablename__ = "job"

    id = Column(String, primary_key=True, unique=True, index=True)
    publisher_email = Column(String, nullable=False)
    published_time = Column(DateTime, nullable=False)
    applies = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    time_required = Column(Enum(JobTime), nullable=False)
    description = Column(String, nullable=False)
    company = Column(String, nullable=False)
    faculty_relevance = Column(Enum(Faculty), nullable=False)
    experience = Column(Enum(Experience), nullable=True)

