from sqlalchemy import Column, String

from BE.lib.utils.db.user_db import Base


# ToDo: Foregin key must be job id
class JobApplies(Base):
    __tablename__ = "job_applies"


    id = Column(String, primary_key=True, unique=True, index=True)

