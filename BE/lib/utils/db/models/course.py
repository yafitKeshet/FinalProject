from sqlalchemy import Column, String, JSON, Integer

from BE.lib.utils.db.user_db import Base


class Course(Base):
    __tablename__ = "course"

    course_id = Column(String, primary_key=True, unique=True, index=True)
    name = Column(String, primary_key=True)
    description = Column(String)
    teachers = Column(JSON)
    rating_avg = Column(Integer)
    summary_documents = Column(JSON, nullable=True)
    tests = Column(JSON, nullable=True)
    tests_solution = Column(JSON, nullable=True)


