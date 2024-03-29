import uuid
from typing import List
from typing_extensions import Annotated
from fastapi import APIRouter, status, Depends, HTTPException

from ..utils.auth.decode_token import get_current_active_user
from ..utils.db.models.user import User
from ..utils.db.user_db import get_db_session, UserDBSession
from ..utils.enums import Faculty
from ..utils.rest_models import CourseOut, CourseIn, CourseUpdate, RecommendationIn, RecommendationOut
from ..utils.db.models.course import Course as CourseTable
from ..utils.db.models.recommendations import Recommendation as RecommendationTable

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
    return_value = []
    all_courses = db.query(CourseTable).all()

    for c in all_courses:
        course = c.__dict__
        course["recommendations"] = [RecommendationOut(**r.__dict__) for r in c.recommendations]
        if len(c.recommendations) > 0:
            course["rating_avg"] = sum([r.rating for r in c.recommendations]) / len(c.recommendations)
        return_value.append(course)
    return return_value


@router.post(
    "/courses/{course_id}/recommendations",
    name="Add recommendations",
    status_code=status.HTTP_200_OK,
    response_model=RecommendationOut
)
def add_recommendation(
        user: Annotated[User, Depends(get_current_active_user)],
        course_id,
        recommendation: RecommendationIn,
        db: UserDBSession = Depends(get_db_session),
):
    existing_course = db.get_course_by_id(course_id).first()
    if existing_course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course was not found")
    recommendation_to_add = {
        'id': str(uuid.uuid4()),
        'title': recommendation.title,
        'description': recommendation.description,
        'rating': recommendation.rating,
        'course_id': course_id,
        'author_email': user.user_email
    }
    db.add(RecommendationTable(**recommendation_to_add))
    db.commit()
    return recommendation_to_add


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
    course_to_add = {
        'course_id': str(uuid.uuid4()),
        'name': course.name,
        'teachers': course.teachers,
        'rating_avg': 0,
        'description': course.description,
        'relevant_faculty': course.relevant_faculty,
        'recommendations': []
    }
    db.add(CourseTable(**course_to_add))
    db.commit()
    if not course.relevant_faculty:
        course_to_add["relevant_faculty"] = Faculty.Elective
    return course_to_add

