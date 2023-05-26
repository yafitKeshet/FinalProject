from fastapi import APIRouter, status, Depends
from typing_extensions import Annotated
from ..utils.db.models.user import User
from ..utils.auth.decode_token import get_current_active_user
from ..utils.db.user_db import UserDBSession, get_db_session
from ..utils.rest_models import UserProfileOut, UpdateUserProfile
from ..utils.db.models.user import User as UserTable

router = APIRouter()


@router.get(
    "/profile",
    name="Get user profile",
    status_code=status.HTTP_200_OK,
    response_model=UserProfileOut
)
def get_profile(
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session)
):
    return UserProfileOut(**{**user.__dict__})


# 200 - Success
# 400 - invalid structure
# 404 - User was not found
@router.patch(
    "/profile",
    name="Update user profile",
    description="User can update any fields he wants (according to Scheme) -"
                "After the request the user details should refresh (changing State / invoking a get request)",
    status_code=status.HTTP_200_OK,
    response_model=UserProfileOut
)
def update_profile(
        user: Annotated[User, Depends(get_current_active_user)],
        user_profile: UpdateUserProfile
):
    pass


@router.get(
    "/profile/resume",
    name="Generate User resume (Random template). Return URL",
    description="TBD: This one is currently not going to be implemented",
    status_code=status.HTTP_200_OK,
    response_model=str
)
def get_resume():
    pass
