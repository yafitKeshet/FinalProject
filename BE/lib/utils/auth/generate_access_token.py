from datetime import timedelta, datetime
from typing import Optional

from fastapi import Depends, HTTPException, status
from jose import jwt


from ..db.models.user import User
from ..db.user_db import get_db_session, UserDBSession
from ..rest_models import UserLogin, Login

SECRET_KEY = 'a9c5a47a668c690fb675a3d892dbf6507663f1a80aec9316e09834bf9e5c82ff'
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30


# Create Token:
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(given_password: str, user_password: str) -> bool:
    return given_password == user_password


def authenticate_user(db: UserDBSession, user_email: str, password: str) -> User:
    user = db.get_user_query(user_email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User does not exist",
        )
    if not verify_password(password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
        )
    return user


def login_for_access_token(
    db: UserDBSession,
    form_data: UserLogin
) -> Login:
    user = authenticate_user(db, form_data.user_email, form_data.password)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.dict()}, expires_delta=access_token_expires
    )
    return Login(jwt_token=access_token, token_type="bearer")
