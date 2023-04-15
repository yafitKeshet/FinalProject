from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship

from .database import Base
from ...enums import Faculty, Year

# ToDo: Foregin Key must be course
class CourseReviews(Base):
    __tablename__ = "course_reviews"


    id = Column(String, primary_key=True, unique=True, index=True)

