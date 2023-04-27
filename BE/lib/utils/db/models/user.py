from datetime import datetime

from sqlalchemy import Boolean, Column, String, Enum, DateTime, Integer

from lib.utils.db.base import Base
from ...enums import Faculty, Year
from ...rest_models import UserProfileOut


# CRUD pydantic models - will be used on crud endpoints


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
    # Should be in all tables
    created_date = Column(DateTime, default=datetime.utcnow)
    updated_date = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def dict(self):
        return UserProfileOut(**self.__dict__).dict()
