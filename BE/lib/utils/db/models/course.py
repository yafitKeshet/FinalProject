from sqlalchemy import Column, String, JSON
from sqlalchemy.ext.mutable import MutableDict

from lib.utils.db.user_db import Base


class Course(Base):
    __tablename__ = "course"

    name = Column(String)
    teachers = Column(ARRAY(String))
    rating_avg = Column(Integer)
    summary_documents = Column(ARRAY(String), nullable=True)
    tests = Column(ARRAY(String), nullable=True)
    tests_solution = Column(ARRAY(String), nullable=True)
    recommendations = Column(ARRAY(JSON), nullable=True)

    course_instance = MyTable(recommendations={
        "title": "Example",
        "description": "This is an example object.",
        "rating": "NotRecommended"
    })

    Note that the JSON data type is only available in certain database engines, such as PostgreSQL and MySQL 5.7+. If you are using a different database engine, you may need to use a different data type or find a way to store the JSON data as a string.








    id = Column(String, primary_key=True, unique=True, index=True)

