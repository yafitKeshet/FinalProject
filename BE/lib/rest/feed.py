from typing import List
from fastapi import APIRouter, status

from BE.lib.utils.rest_models import Post, NewPost

router = APIRouter()


@router.get(
    "/feed",
    name="Get all existing post. Sorted by BE algorithm",
    description="This is the user main page (after Login)",
    status_code=status.HTTP_200_OK,
    response_model=List[Post]
)
def get_all_posts():
    pass


@router.post(
    "/feed/new",
    name="Write new post",
    description="After writing post - (state should be updated). BackEnd Notice: Likes amount should be 0",
    status_code=status.HTTP_200_OK,
    response_model=NewPost
)
def new_post(
        new_post: NewPost
):
    pass




@router.patch(
    "/feed/like",
    name="Like a post",
    description="Like unlike a post. We determain if user like or not according to the Likes set n Post scheme."
                "FrontEnd - Notice: Update State OR Get request (on post) should happen in order to update state) ",
    status_code=status.HTTP_200_OK,
    response_model=dict
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



