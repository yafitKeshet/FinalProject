from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship

from .database import Base
from ...enums import Faculty, Year

# ToDo: Foreign key must be post id
class PostsComments(Base):
    __tablename__ = "posts_comments"


    id = Column(String, primary_key=True, unique=True, index=True)

