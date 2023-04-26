from typing import List

from fastapi import APIRouter, status, Depends
from typing_extensions import Annotated

from BE.lib.utils.auth.decode_token import get_current_active_user
from BE.lib.utils.rest_models import Course, CourseUpdate

router = APIRouter()


@router.get(
    "/courses",
    name="Get courses data",
    status_code=status.HTTP_200_OK,
    response_model=List[Course]
)
def get_courses(
        user: Annotated[str, Depends(get_current_active_user)]
):
    print(5)


@router.patch(
    "/courses/{course_id}",
    name="Insert new data related course",
    status_code=status.HTTP_200_OK,
    response_model=dict
)
def update_course_data(
        course_id,
        course_data: CourseUpdate
):
    pass
