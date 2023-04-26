import logging
from sqlalchemy.engine import Engine
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from .base import Base

from .models.user import User


#
# # ToDo: Make abstract interface class in order to inherit from it (all db types will implement it)
# class GenericDB(abc.ABC):
#     pass


class UserDb:

    DATABASE_URL = "sqlite:///./server_db.db"

    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.engine = self._get_engine()
        Base.metadata.create_all(bind=self.engine)
        self._session_maker = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

    @staticmethod
    def _get_engine() -> Engine:
        return create_engine(
            UserDb.DATABASE_URL,
            echo=True,
            pool_size=8,
            connect_args={"check_same_thread": False} # For foreignkey support in sqlite
        )

    def get_db(self) -> Session:
        return self._session_maker()


db = None


def initalize_db():
    global db
    if not db:
        db = UserDb()
    return db


def get_db_session():
    db = initalize_db().get_db()
    try:
        yield db
    except Exception as error:
        raise error
    finally:
        db.close()