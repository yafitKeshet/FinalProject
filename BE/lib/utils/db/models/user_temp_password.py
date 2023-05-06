from sqlalchemy import Column, String

from BE.lib.utils.db.base import Base


class UserTempPassword(Base):
    __tablename__ = "user_temp_password"

    user_email = Column(String, primary_key=True)
    temp_password = Column(String)
