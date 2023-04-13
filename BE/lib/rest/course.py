from typing import List

from fastapi import APIRouter, status

from BE.lib.utils.rest_models import Course, CourseUpdate

course_router = APIRouter()


@course_router.get(
    "/courses",
    name="Get courses data",
    status_code=status.HTTP_200_OK,
    response_model=List[Course]
)
def get_courses():
    pass


@course_router.patch(
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
