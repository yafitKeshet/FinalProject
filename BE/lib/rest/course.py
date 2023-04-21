from typing import List

from fastapi import APIRouter, status, Depends
from typing_extensions import Annotated

from BE.lib.rest.login import oauth2_scheme
from BE.lib.utils.rest_models import Course, CourseUpdate

router = APIRouter()


@router.get(
    "/courses",
    name="Get courses data",
    status_code=status.HTTP_200_OK,
    response_model=List[Course]
)
def get_courses(
        token: Annotated[str, Depends(oauth2_scheme)]
):
    pass


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