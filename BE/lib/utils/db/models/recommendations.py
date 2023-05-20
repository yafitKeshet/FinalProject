from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from ..user_db import Base


class Recommendation(Base):
    __tablename__ = "recommendation"

    id = Column(String, primary_key=True, unique=True, index=True)
    title = Column(String)
    description = Column(String)
    rating = Column(Integer)

    course_id = Column(Integer, ForeignKey('course.course_id'))
    course = relationship("Course", back_populates="recommendations", lazy="joined")
