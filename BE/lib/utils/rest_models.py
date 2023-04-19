from datetime import datetime
from typing import Optional, Set, Tuple, List
from pydantic import BaseModel
from fastapi import UploadFile

from BE.lib.utils.enums import JobTime, Faculty, Experience, Year, Rating



class UserProfile(BaseModel):
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


class UpdateUserProfile(BaseModel):
    faculty: Optional[str]
    year: Optional[Year]
    job_company_name: Optional[str]
    job_start_year: Optional[int]
    job_description: Optional[str]
    user_image: Optional[str]  # URL to image
    cv_resume: Optional[str]  # URL to the cv resume


class Login(BaseModel):
    jwt_token: str
    user_info: UserProfile


class Post(BaseModel):
    author: UserProfile
    post_id: str
    content: str
    title: str
    faculty: Faculty
    likes: Set[str]


class NewPost(BaseModel):
    post_id: str
    content: str
    title: str
    faculty: Faculty


class Company(BaseModel):
    name: str
    logo: str  # URL to the logo
    number_of_employees: Tuple[int, int]


class Job(BaseModel):
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


class NewJob(BaseModel):
    publisher_email: str
    published_time: datetime
    applies: int = 0
    title: str
    time_required: JobTime
    description: str
    company: Company
    faculty_relevance: Faculty
    experience: Optional[Experience]


class Recommend(BaseModel):
    title: str
    description: str
    rating: Rating


class Course(BaseModel):
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


class CourseUpdate(BaseModel):
    rate: Optional[Rating]
    tests: Optional[List[UploadFile]]
    tests_solution: Optional[List[UploadFile]]
    summary_documents: Optional[List[UploadFile]]
