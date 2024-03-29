import json
import uuid
from datetime import datetime
from http.client import HTTPException
from typing import List
from fastapi import APIRouter, status, Depends, UploadFile, File
from typing_extensions import Annotated

from ..utils.auth.decode_token import get_current_active_user
from ..utils.db.models.user import User
from ..utils.db.user_db import UserDBSession, get_db_session
from ..utils.rest_models import Job, NewJobIn, Company
from ..utils.db.models.job import Job as JobTable
from ..utils.mail_handler.job_mail_sender import JobEmailSender

router = APIRouter()


@router.get(
    "/jobs/{job_id}",
    name="Get existing jobs",
    description="Frontend Notice: You get all jobs and need to filter the relevance according to the User faculty ",
    status_code=status.HTTP_200_OK,
    response_model=Job
)
def get_jobs(
        user: Annotated[User, Depends(get_current_active_user)],
        job_id: str,
        db: UserDBSession = Depends(get_db_session)
):
    job_by_id = db.query(JobTable).filter(JobTable.id == job_id).first()
    if not job_by_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"The job with {job_id} is not found.")
    company = Company(**json.loads(job_by_id.company))
    job_by_id.company = company
    return Job(**job_by_id.__dict__)


@router.get(
    "/jobs",
    name="Get existing jobs",
    description="Frontend Notice: You get all jobs and need to filter the relevance according to the User faculty ",
    status_code=status.HTTP_200_OK,
    response_model=List[Job]
)
def get_jobs(
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session)
):
    job_to_return = []
    db_jobs = db.query(JobTable).all()
    for job in db_jobs:
        company = Company(**json.loads(job.company))
        job.company = company
        job_to_return.append(job.__dict__)
    return job_to_return


@router.post(
    "/jobs",
    name="Post a new job",
    status_code=status.HTTP_200_OK,
    response_model=Job
)
def post_job(
        user: Annotated[User, Depends(get_current_active_user)],
        job_data: NewJobIn,
        db: UserDBSession = Depends(get_db_session)
):
    company_data = job_data.company.dict()
    job_to_add = {
        'id': str(uuid.uuid4()),
        'publisher_email': job_data.publisher_email,
        'published_time': datetime.now(),
        'applies': 0,
        'title': job_data.title,
        'time_required': job_data.time_required,
        'description': job_data.description,
        'company': json.dumps(company_data),
        'faculty_relevance': job_data.faculty_relevance,
        'experience': job_data.experience,
    }
    db.add(JobTable(**job_to_add))
    db.commit()
    job_to_add['company'] = job_data.company
    return job_to_add


@router.post(
    "/jobs/apply",
    name="Apply to a job (Sending a mail according to application details)",
    description="User can apply the Job, in that case we send an email to the"
                " Job's publisher with the User contact (email)",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
async def apply_job(
        auth: Annotated[User, Depends(get_current_active_user)],
        publisher_email: str,
        cv_file: UploadFile = File(default=None)
):
    await JobEmailSender().apply_job_by_mail(publisher_email, auth.private_name, cv_file)
    return True


@router.post(
    "/jobs/{job_id}/addToSavedJobs",
    name="Post a new job",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def add_to_saved_jobs(
        job_id: str,
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session)
):
    user_db = db.query(User).filter(User.user_email == user.user_email).first()
    saved_jobs = user_db.add_job(job_id)
    user_db.saved_jobs = saved_jobs
    db.add(user_db)
    db.commit()
    return True


@router.post(
    "/jobs/{job_id}/deleteFromSavedJobs",
    name="Post a new job",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def add_to_saved_jobs(
        job_id: str,
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session)
):
    user_db = db.query(User).filter(User.user_email == user.user_email).first()
    saved_jobs = user_db.remove_job(job_id)
    user_db.saved_jobs = saved_jobs
    db.add(user_db)
    db.commit()
    return True