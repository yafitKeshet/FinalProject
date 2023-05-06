from datetime import datetime

from sqlalchemy import Boolean, Column, String, Enum, DateTime, Integer

from BE.lib.utils.db.base import Base
from ...enums import Faculty, Year
from ...rest_models import UserProfileOut


# CRUD pydantic models - will be used on crud endpoints


class UserTempPassword(Base):
    __tablename__ = "user_temp_password"

    user_email = Column(String, primary_key=True)
    temp_password = Column(String)
