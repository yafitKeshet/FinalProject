from sqlalchemy import Column, String

from BE.lib.utils.db.user_db import Base


# ToDo: Foregin Key must be course
class CourseReview(Base):
    __tablename__ = "course_review"


    id = Column(String, primary_key=True, unique=True, index=True)

