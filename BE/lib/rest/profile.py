from fastapi import APIRouter, status

from BE.lib.utils.rest_models import UserProfile, UpdateUserProfile

profile_router = APIRouter()


@profile_router.get(
    "/profile",
    name="Get user profile",
    status_code=status.HTTP_200_OK,
    response_model=UserProfile
)
def get_profile():
    pass


# 200 - Success
# 400 - invalid structure
# 404 - User was not found
@profile_router.patch(
    "/profile",
    name="Update user profile",
    description="User can update any fields he wants (according to Scheme) -"
                "After the request the user details should refresh (changing State / invoking a get request)",
    status_code=status.HTTP_200_OK,
    response_model=UserProfile
)
def update_profile(
        user_profile: UpdateUserProfile
):
    pass


@profile_router.get(
    "/profile/resume",
    name="Generate User resume (Random template). Return URL",
    description="TBD: This one is currently not going to be implemented",
    status_code=status.HTTP_200_OK,
    response_model=str
)
def get_resume():
    pass












