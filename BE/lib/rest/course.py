from typing import List

from fastapi import APIRouter, status, Depends
from typing_extensions import Annotated

from BE.lib.utils.auth.decode_token import get_current_active_user
from BE.lib.utils.db.models.course import Course as CourseTable
from BE.lib.utils.db.user_db import get_db_session, UserDBSession
from BE.lib.utils.rest_models import Course, CourseUpdate

router = APIRouter()


@router.get(
    "/courses",
    name="Get courses data",
    status_code=status.HTTP_200_OK,
    response_model=List[Course]
)
def get_courses(
        user: Annotated[str, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session)
):
    return db.query(CourseTable).all()


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
