from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship

from .database import Base
from ...enums import Faculty, Year

# ToDo: Foregin key must be job id
class JobApplies(Base):
    __tablename__ = "job_applies"


    id = Column(String, primary_key=True, unique=True, index=True)

