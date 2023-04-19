from datetime import datetime
from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from BE.lib.utils.db.models.user import User
from BE.lib.utils.db.user_db import get_db_session
from BE.lib.utils.rest_models import Login, UserProfile

router = APIRouter()



# Register new user
# 200 - Success
# 409 - User already exist
@router.post(
    "/signUp/firstStep",
    name="Sign up new profile. Send code to user email (in order to be submitted in second step",
    description="This endpoint should happen only after validate DO NOT already exists",
    status_code=status.HTTP_200_OK,
    response_model=None
)
def sign_up_new_profile_first_step(
        mta_user_email: str
):
    pass


# 400 - temp code is not correct
# 404 - User email does not exists in this "step" (Creation)
@router.post(
    "/signUp/secondStep",
    name="Sign up new profile",
    description="This step happens after First step - The user should enter a temp code (got by email). By doing this"
                "we ensure that the email is really belong to the user",
    status_code=status.HTTP_200_OK,
    response_model=Login
)
def sign_up_new_profile_second_step(
        user_email: str,
        temp_code: str,
):
    pass


# 201 - Created
# 409 - User already exists
# 400 - missing details
@router.post(
    "/signUp",
    name="Sign up new profile",
    description="After second login step successfully happen, and temp code is correct - we signup the user",
    status_code=status.HTTP_200_OK,
    response_model=Login
)
async def sign_up_new_profile_third_step(
        user_email: str,
        password: str,
        # user_profile: UserProfile,
        db: Session = Depends(get_db_session)
):
    # new_user = User(password=password, **user_profile.dict())
    new_user = User(user_email=user_email, password=password)

    db.add(new_user)
    db.commit()
    db.close()


@router.post(
    "/onBoarding",
    name="First time - fill details",
    description="The user should fill params (Some are mandatory, check UserProfile Scheme)",
    status_code=status.HTTP_200_OK,
    response_model=dict
)
def sign_up_new_profile(
        user_profile: UserProfile
):
    pass