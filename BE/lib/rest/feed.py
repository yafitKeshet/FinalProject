from typing import List
from fastapi import APIRouter, status, Depends
from typing_extensions import Annotated

from ..bussiness_logic.posts_manager import PostsManager
from ..utils.auth.decode_token import get_current_active_user
from ..utils.db.models.user import User
from ..utils.db.user_db import get_db_session, UserDBSession
from ..utils.rest_models import PostOut, NewPost


router = APIRouter()


@router.get(
    "/feed",
    name="Get all existing post. Sorted by BE algorithm",
    description="This is the user main page (after Login)",
    status_code=status.HTTP_200_OK,
    response_model=List[PostOut]
)
def get_all_posts(
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session)
):
    return PostsManager(db).get_user_feed(user)


@router.post(
    "/feed/new",
    name="Write new post",
    description="After writing post - (state should be updated). BackEnd Notice: Likes amount should be 0",
    status_code=status.HTTP_200_OK,
    response_model=PostOut
)
def new_post(
    post: NewPost,
    user: Annotated[User, Depends(get_current_active_user)],
    db: UserDBSession = Depends(get_db_session)

):
    return PostsManager(db).create_new_post(user, post, db)


@router.patch(
    "/feed/like",
    name="Like a post",
    description="Like unlike a post. We determine if user like or not according to the Likes set n Post scheme."
                "FrontEnd - Notice: Update State OR Get request (on post) should happen in order to update state)."
                "Return value is the list of users that like the post ",
    status_code=status.HTTP_200_OK,
    response_model=List[str]
)
def like_post(
        like: bool,
        id: str,
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session)
):
    return PostsManager(db).manage_like_post(user, id, like)


@router.delete(
    "/feed",
    name="Delete a post",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def delete_post(
    id: str,
    user: Annotated[User, Depends(get_current_active_user)],
    db: UserDBSession = Depends(get_db_session)
):
    return PostsManager(db).delete_post(user, id)
