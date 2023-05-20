from fastapi import APIRouter, status, Depends, HTTPException
from typing_extensions import Annotated

from ..utils.auth.decode_token import get_current_active_user
from ..utils.auth.generate_access_token import login_for_access_token
from ..utils.db.models.user import User
from ..utils.db.user_db import get_db_session, UserDBSession
from ..utils.mail_handler.mail_sender import EmailSender
from ..utils.rest_models import UserLogin, Login, ResetPasswordBody

router = APIRouter()


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
        db: UserDBSession = Depends(get_db_session)
):
    user = db.query(User).filter(User.user_email == user_email).first()
    db.close()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User was not found")

    return True


# Login into profile
    # 200 - Success
    # 401 - Bad input (Wrong Password)
@router.post(
    "/login",
    name="Login to profile page. You'll get a JWT Token (Transfer it in AUTH Header)",
    description="THIS IS THE APP MAIN PAGE. This endpoint happens ONLY if user exists",
    status_code=status.HTTP_200_OK,
    response_model=Login
)
def login_to_profile(
        user_login: UserLogin,
        db: UserDBSession = Depends(get_db_session)
):
    return login_for_access_token(db, user_login)


@router.post(
    "/resetPassword1Step",
    name="User Forgot password",
    description="In this case, we send email with a temporary code, the user need to insert it in change password page."
                "Return value is whether the email has been sent successfully or not",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def reset_password_first_step(
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session),
):
    EmailSender(db).send_mail_to_user(user.user_email)
    return True


@router.post(
    "/resetPassword2Step",
    name="User Forgot password",
    description="User insert the temp code he got in email & update the password (need to insert it twice."
                "Return value is True if password has been successfully reset",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def reset_password_second_step(
        body: ResetPasswordBody,
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session),
):
    # First Assert that temp password is correct & delete the temp password entry from DB
    existing_user_temp_password = db.get_user_temp_password_entry(user.user_email)
    if not existing_user_temp_password:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The user {user.user_email} is not in reset password process")

    if existing_user_temp_password.temp_password != body.temp_password:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, f"The temp password is incorrect for user {user.user_email}")

    db.delete(existing_user_temp_password)

    # Assign the new password to the User entry in User table
    existing_user = db.get_user_query(user.user_email).first()
    existing_user.password = body.new_password
    db.add(existing_user)

    # Committing changes
    db.commit()
    return True


@router.patch(
    "/login/updatePassword",
    name="update the user password",
    description="User logged in & want to change password",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def update_password(
        user: Annotated[User, Depends(get_current_active_user)],
        new_password,
        db: UserDBSession = Depends(get_db_session)
):
    existing_user = db.get_user_query(user.user_email).first()
    if existing_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User was not found")
    db.get_user_query(user.user_email).update({"password": new_password})
    db.commit()
    return True




