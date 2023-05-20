from datetime import datetime
from fastapi import APIRouter, status, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from typing_extensions import Annotated

from BE.lib.utils.auth.decode_token import get_current_active_user
from BE.lib.utils.auth.generate_access_token import login_for_access_token
from BE.lib.utils.db.models.user import User
from BE.lib.utils.db.user_db import get_db_session, UserDBSession
from BE.lib.utils.mail_handler.mail_sender import EmailSender
from BE.lib.utils.rest_models import Login, UserProfileIn, SignUpUserProfile, UserProfileOut, OnBoardingUserProfile, \
    UserLogin, SignupSecondStep

router = APIRouter()


# Register new user
# 200 - Success
# 409 - User already exist
@router.post(
    "/signUp/firstStep",
    name="Sign up new profile. Send code to user email (in order to be submitted in second step",
    description="This endpoint should happen only after validate DO NOT already exists",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def sign_up_new_profile_first_step(
        user_email: str = Body(...),
        db: UserDBSession = Depends(get_db_session),
):
    if db.get_user_query(user_email).first():
        raise HTTPException(status.HTTP_409_CONFLICT, "User already registered")

    EmailSender(db).send_mail_to_user(user_email)
    return True



# 400 - temp code is not correct
# 404 - User email does not exist in this "step" (Creation)
@router.post(
    "/signUp/secondStep",
    name="Sign up new profile",
    description="This step happens after First step - The user should enter a temp code (got by email). By doing this"
                "we ensure that the email is really belong to the user"
                "Return value repeesent if the mail belongs to the user in out point of view",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def sign_up_new_profile_second_step(
        body: SignupSecondStep,
        db: UserDBSession = Depends(get_db_session),
):
    # First Assert that temp password is correct
    existing_user_temp_password = db.get_user_temp_password_entry(body.user_email)
    if not existing_user_temp_password:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The user {body.user_email} is not in this step")

    if existing_user_temp_password.temp_password != body.temp_password:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, f"The temp password is incorrect for user {body.user_email}")

    # Delete the temp password entry from DB
    db.delete(existing_user_temp_password)
    # Committing changes
    db.commit()
    return True


@router.post(
    "/signUp",
    name="Sign up new profile",
    description="After second login step successfully happen, and temp code is correct - we signup the user",
    status_code=status.HTTP_200_OK,
    response_model=Login
)
async def sign_up_new_profile_third_step(
        signup_user_profile: SignUpUserProfile,
        db: UserDBSession = Depends(get_db_session)
):
    existing_user = db.get_user_query(signup_user_profile.user_email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
    new_user = User(**signup_user_profile.dict())

    db.add(new_user)
    db.commit()
    return login_for_access_token(db, UserLogin(**signup_user_profile.dict()))


@router.post(
    "/onBoarding",
    name="First time - fill details",
    description="The user should fill params (Some are mandatory, check UserProfile Scheme)",
    status_code=status.HTTP_200_OK,
    response_model=UserProfileOut
)
def sign_up_new_profile(
        auth: Annotated[User, Depends(get_current_active_user)],
        updated_user_profile: OnBoardingUserProfile,
        db: UserDBSession = Depends(get_db_session)
):
    existing_user = db.get_user_query(updated_user_profile.user_email).first()
    if existing_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User was not found")

    db.get_user_query(updated_user_profile.user_email).update(
        updated_user_profile.dict())
    db.commit()
    return UserProfileOut(**updated_user_profile.dict())
