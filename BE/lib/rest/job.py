from typing import List

from fastapi import APIRouter, status

from BE.lib.utils.rest_models import Job, Company

job_router = APIRouter()


@job_router.get(
    "/jobs",
    name="Get existing jobs",
    description="Frontend Notice: You get all jobs and need to filter the relevance according to the User faculty ",
    status_code=status.HTTP_200_OK,
    response_model=List[Job]
)
def get_jobs():
    pass


@job_router.post(
    "/jobs",
    name="Post a new job",
    status_code=status.HTTP_200_OK,
    response_model=Job
)
def post_job(NewJob):
    pass


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

