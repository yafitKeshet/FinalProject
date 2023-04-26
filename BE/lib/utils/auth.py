from datetime import timedelta, datetime
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from typing_extensions import Annotated

# from BE.lib.rest.login import oauth2_scheme
from BE.lib.utils.db.models.user import User
from BE.lib.utils.db.user_db import get_db_session, UserDBSession
from BE.lib.utils.rest_models import UserLogin, Login

SECRET_KEY = 'a9c5a47a668c690fb675a3d892dbf6507663f1a80aec9316e09834bf9e5c82ff'
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30


# Create Token:
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(given_password: str, user_password: str) -> bool:
    return given_password == user_password


def authenticate_user(db: UserDBSession, user_email: str, password: str) -> User:
    user = db.get_user_query(user_email).first()
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def login_for_access_token(
    db: UserDBSession,
    form_data: UserLogin
) -> Login:
    user = authenticate_user(db, form_data.user_email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.dict()}, expires_delta=access_token_expires
    )
    return Login(jwt_token=access_token, token_type="bearer")



 # # Auth with existing token
# def get_user(db, user_email: str):
#
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)
#
# async def get_current_user(
#         token: Annotated[str, Depends(oauth2_scheme)],
#         db: Session = Depends(get_db_session)
# ):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         user_email: str = payload.get("sub", {}).get("user_email")
#         if user_email is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception
#     user = get_user(db, user_email=user_email)
#     if user is None:
#         raise credentials_exception
#     return user
#
#
# def get_current_active_user(
#     current_user: Annotated[User, Depends(get_current_user)]
# ):
#     if current_user.disabled:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user
