from sqlalchemy import Column, String, JSON
from sqlalchemy.ext.mutable import MutableDict

from lib.utils.db.user_db import Base


class Course(Base):
    __tablename__ = "course"

    id = Column(String, primary_key=True, unique=True, index=True)
    name = Column(String, primary_key=True)
    teachers = Column(ARRAY(String))
    rating_avg = Column(Integer)
    summary_documents = Column(ARRAY(String), nullable=True)
    tests = Column(ARRAY(String), nullable=True)
    tests_solution = Column(ARRAY(String), nullable=True)

    recommendations = relationship("Recommendation", back_populates="course")


