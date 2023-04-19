from sqlalchemy import Column, String

from BE.lib.utils.db.user_db import Base


# ToDo: Foregin key must be job id
class JobApply(Base):
    __tablename__ = "job_apply"


    id = Column(String, primary_key=True, unique=True, index=True)

