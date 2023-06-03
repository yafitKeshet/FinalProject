import uuid
from datetime import datetime
from typing import List
from fastapi import APIRouter, status, Depends
from ..utils.db.user_db import UserDBSession, get_db_session
from ..utils.rest_models import Job, Company, NewJobIn
from ..utils.db.models.job import Job as JobTable
router = APIRouter()


@router.get(
    "/jobs",
    name="Get existing jobs",
    description="Frontend Notice: You get all jobs and need to filter the relevance according to the User faculty ",
    status_code=status.HTTP_200_OK,
    response_model=List[Job]
)
def get_jobs():
    pass


@router.post(
    "/jobs",
    name="Post a new job",
    status_code=status.HTTP_200_OK,
    response_model=Job
)
def post_job(
        job_data: NewJobIn,
        db: UserDBSession = Depends(get_db_session)
):
    job_to_add = {
        'id': str(uuid.uuid4()),
        'publisher_email': job_data.publisher_email,
        'published_time': datetime.now(),
        'applies': 0,
        'title': job_data.title,
        'time_required': job_data.time_required,
        'description': job_data.description,
        'company': job_data.company,
        'faculty_relevance': job_data.faculty_relevance,
        'experience': job_data.experience,
    }
    db.add(JobTable(**job_to_add))
    db.commit()
    return job_to_add



@router.post(
    "/jobs/apply",
    name="Apply to a job (Sending a mail according to application details)",
    description="User can apply the Job, in that case we send an email to the"
                " Job's publisher with the User contact (email)",
    status_code=status.HTTP_200_OK,
    response_model=None
)
def apply_job():
    pass


@router.get(
    "/jobs/{company_name}",
    name="Get company interesting links",
    status_code=status.HTTP_200_OK,
    response_model=Company
)
def get_company_info():
    pass
