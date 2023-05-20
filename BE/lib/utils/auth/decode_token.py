from fastapi import Depends, HTTPException, status
from jose import jwt
from typing_extensions import Annotated


from .generate_access_token import ALGORITHM, SECRET_KEY
from .oauth2 import oauth2_scheme
from ..db.models.user import User
from ..db.user_db import get_db_session, UserDBSession


async def get_current_user(
        token: Annotated[str, Depends(oauth2_scheme)],
        db: UserDBSession = Depends(get_db_session)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM], options={"verify_sub": False})
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Bearer token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user_email: str = payload.get("sub", {}).get("user_email")
    if user_email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.get_user_query(user_email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User was not found")
    return user


def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
