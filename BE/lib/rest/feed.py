from typing import List
from fastapi import APIRouter, status, Depends, HTTPException
from pydantic import BaseModel
from typing_extensions import Annotated

from lib.bussiness_logic.posts_manager import PostsManager
from lib.utils.auth.decode_token import get_current_active_user
from lib.utils.db.models.user import User
from lib.utils.db.user_db import get_db_session, UserDBSession
from lib.utils.rest_models import PostOut, NewPost


router = APIRouter()
class Message(BaseModel):
    message: str


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
    return PostsManager(db).create_new_post(user, post)


@router.patch(
    "/feed/like",
    name="Like a post",
    description="Like unlike a post. We determain if user like or not according to the Likes set n Post scheme."
                "FrontEnd - Notice: Update State OR Get request (on post) should happen in order to update state) ",
    status_code=status.HTTP_200_OK,
    responses={
        401: {"description": "Unauthorized", "model": Message},
        404: {"description": "Post not found", "model": Message},
    },
)
def like_post(
        like_status: bool,
        post_id: str
):
    pass


@router.delete(
    "/feed/{post_id}",
    name="Delete a post",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def delete_post(
        post_id: str
):
    pass



