import uuid
from BE.lib.utils.db.models.course import Course
from BE.lib.utils.db.user_db import UserDBSession


class CoursesManager:
    def __init__(self, db_session: UserDBSession):
        self.db_session = db_session

    def create_new_course(self, course: Course) -> Course:
        course_to_add_dict = {
            Course.course_id:str(uuid.uuid4()),
            Course.name: course.name,
            Course.tests: course.tests,
            Course.rating_avg: 0,
            Course.description: course.description,
            Course.teachers: course.teachers,
            Course.summary_documents: course.summary_documents,
            Course.tests_solution: course.tests_solution,
        }
        course_to_add = Course(**course_to_add_dict)
        self.db_session.add(Course(**course_to_add_dict))
        self.db_session.commit()
        # Create response
        response = Course(**course_to_add_dict)
        return response
