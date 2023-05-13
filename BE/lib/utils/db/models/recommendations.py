from sqlalchemy import Column, String, Enum, Integer, ForeignKey

from BE.lib.utils.db.user_db import Base
from ...enums import Rating


# ToDo: Foreign key must be post id
class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, unique=True, index=True)
    title = Column(String)
    description = Column(String)
    rating = Column(Enum(Rating))

    course_id = Column(Integer, ForeignKey('course.id'))
