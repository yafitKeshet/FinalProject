from sqlalchemy import Column, String, Float, ARRAY
from BE.lib.utils.db.user_db import Base


class Course(Base):
    __tablename__ = 'courses'

    course_id = Column(String, primary_key=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    teachers = Column(String, nullable=False)
    rating_avg = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    summary_documents = Column(String, nullable=True)
    tests = Column(String, nullable=True)
    tests_solution = Column(String, nullable=True)

