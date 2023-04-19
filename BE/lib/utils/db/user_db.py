import abc

from sqlalchemy import create_engine, Engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker



# ToDo: Make abstract interface class in order to inherit from it (all db types will implement it)
class GenericDB(abc.ABC):
    pass


class DbManager(GenericDB):

    DATABASE_URL = "sqlite:///./server_db.db"

    def __init__(self):
        self.engine = DbManager._get_engine()




    @staticmethod
    def _get_engine() -> Engine:
        return create_engine(
            DbManager.DATABASE_URL,
            echo=True,
            pool_size=8,
            connect_args={"check_same_thread": False} # For foreignkey support in sqlite
        )

    def
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()