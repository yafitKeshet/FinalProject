from sqlalchemy import Column, String, Float, Enum
from sqlalchemy.orm import relationship

from ..user_db import Base
from ...enums import Faculty


class Course(Base):
    __tablename__ = 'course'

    course_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    teachers = Column(String, nullable=False)
    rating_avg = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    relevant_faculty = Column(Enum(Faculty), default=Faculty.Elective)
    recommendations = relationship("Recommendation", back_populates="course", lazy="joined")
