from typing import List
from fastapi import APIRouter, status, Depends, HTTPException
import json

from BE.lib.utils.db.user_db import get_db_session, UserDBSession
from BE.lib.utils.rest_models import CourseOut, CourseIn, CourseUpdate, RecommendationIn, RecommendationOut
from BE.lib.utils.db.models.course import Course as CourseTable
from BE.lib.utils.db.models.recommendations import Recommendation as RecommendationTable

unique_course_id = 0
unique_recommendation_id = 0
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
    courses_json = []
    for c in db.query(CourseTable).all():
        courses_json.append(c.__dict__)
    for course in courses_json:
        recommendations = db.get_recommendation_by_id(c.course_id).all()
        recommendations_json = []
        for rec in recommendations:
            recommendations_json.append(RecommendationOut(**rec.__dict__))
        course['recommendations'] = recommendations_json
    return courses_json

@router.post(
    "/courses/{course_id}/recommendations",
    name="Add recommendations",
    status_code=status.HTTP_200_OK,
    response_model=RecommendationOut
)
def add_recommendation(
        course_id,
        recommendation: RecommendationIn,
        db: UserDBSession = Depends(get_db_session)
):
    existing_course = db.get_course_by_id(course_id).first()
    if existing_course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course was not found")
    recommendation_to_add = {
        'id': ++unique_recommendation_id,
        'title': recommendation.title,
        'description': recommendation.description,
        'rating': recommendation.rating,
        'course_id': course_id
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
        'recommendations': []
    }
    db.add(CourseTable(**course_to_add))
    db.commit()
    return course_to_add


@router.patch(
    "/courses/{course_id}",
    name="Insert new data related course",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def update_course_data(
        course_id,
        course_data: CourseUpdate,
        db: UserDBSession = Depends(get_db_session)
):
    existing_course = db.get_course_by_id(course_id).first()
    if existing_course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course was not found")
    non_null_props = {prop: value for prop, value in course_data.dict(exclude_unset=True).items()}
    db.get_course_by_id(course_id).update(non_null_props)
    db.commit()
    db.refresh(existing_course)
    return True
