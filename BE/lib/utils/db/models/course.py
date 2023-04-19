from sqlalchemy import Column, String

from BE.lib.utils.db.user_db import Base


class Cours(Base):
    __tablename__ = "course"


    id = Column(String, primary_key=True, unique=True, index=True)

