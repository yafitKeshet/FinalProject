from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing_extensions import Annotated

from BE.lib.utils.db.models.user import User
from BE.lib.utils.db.user_db import get_db_session
from BE.lib.utils.rest_models import Login

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# 1 - Login Page:
    # 200 - Success
    # 404 - Not Found
@router.get(
    "/userValidation",
    name="Check that user email exists - Should be done before login & before signup",
    description="Check that user email exists - Should be done before login & before signup",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def login_check_user_exists(
        user_email: str,
        db: Session = Depends(get_db_session)
):
    user = db.query(User).filter(User.email == user_email).first()
    db.close()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User was not found")

    return True



# Login into profile
    # 200 - Success
    # 400 - Bad input (Wrong Password)
@router.post(
    "/login",
    name="Login to profile page. You'll get a JWT Token (Transfer it in AUTH Header)",
    description="THIS IS THE APP MAIN PAGE. This endpoint happens ONLY if user exists",
    status_code=status.HTTP_200_OK,
    response_model=Login
)
def login_to_profile(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    print(5)

# ToDO: autorizer should be in /login endpoint
@router.post("/token", response_model=dict)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    print(6)

@router.post(
    "/resetPassword1Step",
    name="User Forgot password",
    description="In this case, we send email with a temporary code, the user need to insert it in change password page",
    status_code=status.HTTP_200_OK,
    response_model=Login
)
def reset_password_first_step():
    pass


@router.post(
    "/resetPassword2Step",
    name="User Forgot password",
    description="User insert the temp code he got in email & update the password (need to insert it twice",
    status_code=status.HTTP_200_OK,
    response_model=Login
)
def reset_password_second_step():
    pass


@router.post(
    "/login/updatePassword",
    name="update the user password",
    description="In this case, we send email with a temporary code, the user need to insert it in change password page",
    status_code=status.HTTP_200_OK,
    response_model=Login
)
def login_to_profile(
        user_email: str,
        password: str
):
    pass




