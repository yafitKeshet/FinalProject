from datetime import datetime
from typing import Optional, Set, Tuple, List
from pydantic import BaseModel
from fastapi import UploadFile

from .enums import JobTime, Faculty, Experience, Year


class ProjectBaseModel(BaseModel):
    class Config:
        use_enum_values = True


# User:
class SignUpUserProfile(ProjectBaseModel):
    user_email: str
    password: str
    private_name: str
    last_name: str
    birthday_date: Optional[str]
    faculty: Optional[Faculty]
    year: Optional[Year]
    job_company_name: Optional[str]
    job_start_year: Optional[int]
    job_description: Optional[str]
    user_image: Optional[str]  # URL to image


class OnBoardingUserProfile(ProjectBaseModel):
    user_email: Optional[str]
    private_name: str
    last_name: str
    birthday_date: str
    faculty: Faculty
    year: Year
    job_company_name: Optional[str]
    job_start_year: Optional[int]
    job_description: Optional[str]
    user_image: Optional[str]  # URL to image


class UserProfileIn(ProjectBaseModel):
    user_email: str
    private_name: str
    last_name: str
    birthday_date: str
    faculty: Faculty
    year: Year
    job_company_name: Optional[str]
    job_start_year: Optional[int]
    job_description: Optional[str]
    user_image: Optional[str]  # URL to image


class UserProfileOut(ProjectBaseModel):
    user_email: str
    private_name: str
    last_name: str
    birthday_date: Optional[str]
    faculty: Optional[Faculty]
    year: Optional[Year]
    job_company_name: Optional[str]
    job_start_year: Optional[int]
    job_description: Optional[str]
    user_image: Optional[str]  # URL to image
    cv_resume: Optional[str]  # URL to the cv resume


class UpdateUserProfile(ProjectBaseModel):
    faculty: Optional[Faculty]
    year: Optional[Year]
    job_company_name: Optional[str]
    job_start_year: Optional[int]
    job_description: Optional[str]
    user_image: Optional[str]  # URL to image


############################################################


# Login:
class UserLogin(ProjectBaseModel):
    user_email: str
    password: str


class Login(ProjectBaseModel):
    jwt_token: str
    token_type: str


class ResetPasswordBody(ProjectBaseModel):
    user_email: str
    temp_password: str
    new_password: str


class SignupSecondStep(ProjectBaseModel):
    user_email: str
    temp_password: str


# Post
class PostOut(ProjectBaseModel):
    author: UserProfileOut
    post_id: str
    content: str
    title: str
    faculty: Faculty
    likes: Set[str] = set()


class NewPost(ProjectBaseModel):
    content: str
    title: str
    faculty: Faculty


class Company(ProjectBaseModel):
    name: str
    logo: str  # URL to the logo
    number_of_employees: Tuple[int, int]


class Job(ProjectBaseModel):
    id: str
    publisher_email: str
    published_time: datetime
    applies: int = 0
    title: str
    time_required: JobTime
    description: str
    company: str
    faculty_relevance: Faculty
    experience: Optional[Experience]


class NewJobIn(ProjectBaseModel):
    publisher_email: str
    title: str
    time_required: JobTime
    description: str
    company: str
    faculty_relevance: Faculty
    experience: Optional[Experience]


class RecommendationIn(ProjectBaseModel):
    title: str
    description: str
    rating: int


class RecommendationOut(ProjectBaseModel):
    course_id: str
    description: str
    id: str
    rating: int
    title: str


class CourseOut(ProjectBaseModel):
    course_id: str
    name: str
    teachers: str
    rating_avg: float
    description: str
    summary_documents: Optional[str]  # List of URLs
    tests: Optional[str]
    tests_solution: Optional[str]
    recommendations: Optional[List[RecommendationIn]]


class CourseIn(ProjectBaseModel):
    name: str
    teachers: str
    description: str
    summary_documents: Optional[List[str]]  # List of URLs
    tests: Optional[List[str]]
    tests_solution: Optional[List[str]]


class CourseUpdate(ProjectBaseModel):
    tests: Optional[List[UploadFile]]
    tests_solution: Optional[List[UploadFile]]
    summary_documents: Optional[List[UploadFile]]


class JobCV(ProjectBaseModel):
    job_title: str
    company: str
    start_date: str
    end_date: Optional[str]
    description: Optional[str]


class EducationCV(ProjectBaseModel):
    institution: str
    degree: str
    start_date: str
    end_date: Optional[str]


class UserCV(ProjectBaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    private_email: Optional[str]
    phone: str
    job_title: str
    summary: str
    skills: List[str]
    jobs: Optional[List[JobCV]]
    education: Optional[List[EducationCV]]

    class Config:
        schema_extra = {
            "example": {
                "first_name": "OPTIONAL",
                "last_name": "OPTIONAL",
                "private_email": "OPTIONAL",
                "phone": "+1234567890",
                "summary": "A highly skilled software engineer with 7 years of experience in the industry.",
                "job_title": "Senior Software Engineer",
                "skills": ["Python", "JavaScript", "React", "Django"],
                "jobs": [
                    {
                        "job_title": "Senior Software Engineer",
                        "company": "ABC Corp",
                        "start_date": "2018-01-01",
                        "end_date": "2022-12-31",
                        "description": "Developed and maintained key software applications."
                    },
                    {
                        "job_title": "Junior Software Engineer",
                        "company": "XYZ Inc",
                        "start_date": "2015-01-01",
                        "end_date": "2017-12-31",
                        "description": "Worked on various software projects and learned key skills."
                    }
                ],
                "education": [
                    {
                        "institution": "Example University",
                        "degree": "BSc in Computer Science",
                        "start_date": "2010-09-01",
                        "end_date": "2014-06-30"
                    }
                ]
            },
        }
