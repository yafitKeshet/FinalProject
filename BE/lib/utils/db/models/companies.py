from sqlalchemy import Column, String

from BE.lib.utils.db.user_db import Base


class Companies(Base):
    __tablename__ = "companies"


    id = Column(String, primary_key=True, unique=True, index=True)

