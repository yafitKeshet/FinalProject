
from fastapi import APIRouter, status, Depends, HTTPException
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
        user: Annotated[User, Depends(get_current_active_user)]
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
    response_model=bool
)
def update_profile(
        user: Annotated[User, Depends(get_current_active_user)],
        user_data: UpdateUserProfile,
        db: UserDBSession = Depends(get_db_session)
):
    existing_course = db.get_user_query(user.user_email).first()
    if existing_course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course was not found")
    db.db.get_user_query(user.user_email).update({k: v for k, v in user_data.dict().items() if v is not None})
    db.commit()
    return True


@router.get(
    "/profile/resume",
    name="Generate User resume (Random template). Return URL",
    description="TBD: This one is currently not going to be implemented",
    status_code=status.HTTP_200_OK,
    response_model=str
)
def get_resume():
    pass
