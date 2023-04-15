from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship

from .database import Base
from ...enums import Faculty, Year


class User(Base):
    __tablename__ = "users"


    email = Column(String, primary_key=True, unique=True, index=True)
    user_name = Column(String)
    private_name = Column(String)
    last_name = Column(String)
    faculty = Column(Enum(Faculty))
    year = Column(Enum(Year))

    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")