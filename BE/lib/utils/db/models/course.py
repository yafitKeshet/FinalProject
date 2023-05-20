from sqlalchemy import Column, String, Float, Integer, JSON
from sqlalchemy.orm import relationship

from ..user_db import Base


class Course(Base):
    __tablename__ = 'course'

    course_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    teachers = Column(String, nullable=False)
    rating_avg = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    summary_documents = Column(String, nullable=True)
    tests = Column(String, nullable=True)
    tests_solution = Column(String, nullable=True)
    recommendations = relationship("Recommendation", back_populates="course", lazy="joined")
