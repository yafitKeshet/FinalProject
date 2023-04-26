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


class UserDBSession(Session):
    def __init__(self, new_session):
        self.session: Session = new_session

    def __getattr__(self, name):
        if name in self.__dict__:
            return self.__dict__.get(name)
        return getattr(self.session, name)

    def get_user(self, user_email):
        return self.query(User).filter(User.user_email == user_email).first()


class DBManager:

    DATABASE_URL = "sqlite:///./server_db.db"

    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.engine = self._get_engine()
        Base.metadata.create_all(bind=self.engine)
        self._session_maker = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

    @staticmethod
    def _get_engine() -> Engine:
        return create_engine(
            DBManager.DATABASE_URL,
            echo=True,
            pool_size=8,
            connect_args={"check_same_thread": False} # For foreignkey support in sqlite
        )

    def get_db(self) -> UserDBSession:
        return UserDBSession(self._session_maker())


db = None


def initialize_db():
    global db
    if not db:
        db = DBManager()
    return db


def get_db_session() -> UserDBSession:
    db_session = initialize_db().get_db()
    try:
        yield db_session
    except Exception as error:
        raise error
    finally:
        db_session.close()
