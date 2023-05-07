import uuid
from typing import List

from fastapi import APIRouter, status, Depends
from typing_extensions import Annotated

from BE.lib.utils.auth.decode_token import get_current_active_user
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
        db: UserDBSession = Depends(get_db_session)
):
    courses = db.query(Course).all()
    return courses

@router.post(
    "/courses",
    name="Create new course",
    status_code=status.HTTP_200_OK,
    response_model=Course
)
def post_courses(
        course: Course,
        db: UserDBSession = Depends(get_db_session)
):
    course_to_add = {
        Course.course_id: course.course_id,
        Course.name: course.name,
        Course.tests: course.tests,
        Course.tests_solution: course.tests_solution,
        Course.summary_documents: course.summary_documents,
        Course.teachers: course.teachers,
        Course.description: course.description,
        Course.rating_avg: 0
    }
    db.add(Course(course_to_add))
    db.commit()
    # Create response
    return course_to_add


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
