from datetime import datetime
from typing import List
from sqlalchemy import Boolean, Column, String, Enum, DateTime, Integer, JSON

from ..base import Base
from ...enums import Faculty
from ...rest_models import UserProfileOut


class User(Base):
    __tablename__ = "user"

    user_email = Column(String, primary_key=True)
    password = Column(String)
    private_name = Column(String)
    last_name = Column(String)
    faculty = Column(Enum(Faculty), nullable=True)
    year = Column(Integer, nullable=True)
    birthday_date = Column(String, nullable=True)
    job_company_name = Column(String, nullable=True)
    job_start_year = Column(Integer, nullable=True)
    job_description = Column(String, nullable=True)
    user_image = Column(String, nullable=True)  # URL to image
    cv_resume = Column(String, nullable=True)  # URL to the cv resume
    is_active = Column(Boolean, default=True)
    saved_jobs = Column(JSON, nullable=True, default=[])
    # Should be in all tables
    created_date = Column(DateTime, default=datetime.utcnow)
    updated_date = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def add_job(self, job_id: str) -> List[str]:
        saved_jobs = self.saved_jobs.copy()
        if job_id not in self.saved_jobs:
            saved_jobs.append(job_id)
        return saved_jobs

    def remove_job(self, job_id: str) -> List[str]:
        saved_jobs = self.saved_jobs.copy()
        if job_id in self.saved_jobs:
            saved_jobs = [job for job in saved_jobs if job != job_id]
        return saved_jobs

    def dict(self):
        return UserProfileOut(**self.__dict__).dict()
