from sqlalchemy import Column, String

from lib.utils.db.user_db import Base
from ...enums import Rating


# ToDo: Foreign key must be post id
class Recommendation(Base):
    __tablename__ = "recommendation"
    id = Column(Integer, primary_key=True, unique=True, index=True)
    title = Column(String)
    description = Column(String)
    rating = Column(Enum(Faculty))

    course_id = Column(String, ForeignKey('course.id'))
    course = relationship("Course", back_populates="recommendations")
