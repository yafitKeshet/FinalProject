from datetime import datetime
from typing import Optional, Set, Tuple, List
from pydantic import BaseModel
from fastapi import UploadFile

from lib.utils.enums import JobTime, Faculty, Experience, Year, Rating


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
    birthday_date: str
    faculty: Faculty
    year: Year
    job_company_name: Optional[str]
    job_start_year: Optional[int]
    job_description: Optional[str]
    user_image: Optional[str]  # URL to image
    cv_resume: Optional[str]  # URL to the cv resume


class UpdateUserProfile(ProjectBaseModel):
    faculty: Optional[str]
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
    job_id: str
    publisher_email: str
    published_time: datetime
    applies: int = 0
    title: str
    time_required: JobTime
    description: str
    company: Company
    faculty_relevance: Faculty
    experience: Optional[Experience]


class NewJob(ProjectBaseModel):
    publisher_email: str
    published_time: datetime
    applies: int = 0
    title: str
    time_required: JobTime
    description: str
    company: Company
    faculty_relevance: Faculty
    experience: Optional[Experience]


class Recommend(ProjectBaseModel):
    title: str
    description: str
    rating: Rating


class Course(ProjectBaseModel):
    course_id: str
    name: str
    teachers: List[str]
    rating_avg: float
    description: str
    summary_documents: List[str]  # List of URLs
    tests: Optional[List[str]]
    tests_solution: Optional[List[str]]
    avg: Optional[List[str]]
    recommendations: List[Recommend]


class CourseUpdate(ProjectBaseModel):
    rate: Optional[Rating]
    tests: Optional[List[UploadFile]]
    tests_solution: Optional[List[UploadFile]]
    summary_documents: Optional[List[UploadFile]]
