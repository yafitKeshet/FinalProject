from typing import List
from fastapi import APIRouter, status, Depends,HTTPException
from BE.lib.utils.db.user_db import get_db_session, UserDBSession
from BE.lib.utils.rest_models import CourseOut,CourseIn, CourseUpdate
from BE.lib.utils.db.models.course import Course as CourseTable
unique_course_id = 1
router = APIRouter()
@router.get(
    "/courses",
    name="Get courses data",
    status_code=status.HTTP_200_OK,
    response_model=List[CourseOut]
)
def get_courses(
        db: UserDBSession = Depends(get_db_session)
):
    return [c.__dict__ for c in db.query(CourseTable).all()]


@router.post(
    "/courses",
    name="Create new course",
    status_code=status.HTTP_200_OK,
    response_model=CourseOut
)
def post_courses(
        course: CourseIn,
        db: UserDBSession = Depends(get_db_session)
):
    global unique_course_id
    unique_course_id += 1
    course_to_add = {
        'course_id': ++unique_course_id,
        'name': course.name,
        'teachers': course.teachers,
        'rating_avg': 0,
        'description': course.description,
        'summary_documents': course.summary_documents,
        'tests': course.tests,
        'tests_solution': course.tests_solution,
    }
    db.add(CourseTable(**course_to_add))
    db.commit()
    return course_to_add


@router.patch(
    "/courses/{course_id}",
    name="Insert new data related course",
    status_code=status.HTTP_200_OK,
    response_model=dict
)
def update_course_data(
        course_id,
        course_data: CourseUpdate,
        db: UserDBSession = Depends(get_db_session)
):
    existing_course = db.get_course_by_id(course_id).first()
    if existing_course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course was not found")
    course_data_dict = CourseUpdate.dict(exclude_unset=True)
    for key, value in course_data_dict.items():
        setattr(existing_course, key, value)
    db.get_course_by_id(course_id).update(existing_course)
    db.commit()
    db.refresh(existing_course)
    return True
