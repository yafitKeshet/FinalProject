import os

import pdfkit
from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.openapi.models import Response
from typing_extensions import Annotated


from ..utils.db.user_db import UserDBSession, get_db_session
from ..utils.auth.decode_token import get_current_active_user
from ..utils.db.models.user import User
from ..utils.rest_models import UserProfileOut, UpdateUserProfile, UserCV

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO
from fastapi.responses import StreamingResponse

router = APIRouter()


@router.get(
    "/profile",
    name="Get user profile",
    status_code=status.HTTP_200_OK,
    response_model=UserProfileOut
)
def get_profile(
        user: Annotated[User, Depends(get_current_active_user)]
):
    return UserProfileOut(**user.__dict__)



@router.get(
    "/profile/{user_email}",
    name="Get user profile",
    status_code=status.HTTP_200_OK,
    response_model=UserProfileOut
)
def get_profile(
    user_email: str,
    db: UserDBSession = Depends(get_db_session)
):
    user_desired = db.get_user_query(user_email).first()
    return UserProfileOut(**user_desired.__dict__)


# 200 - Success
# 400 - invalid structure
# 404 - User was not found
@router.patch(
    "/profile",
    name="Update user profile",
    description="User can update any fields he wants (according to Scheme) -"
                "After the request the user details should refresh (changing State / invoking a get request)",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def update_profile(
        user_data: UpdateUserProfile,
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session)
):
    db.get_user_query(user.user_email).update({k: v for k, v in user_data.dict().items() if v is not None})
    db.commit()
    return True

@router.post(
    "/profile/resume/0",
    name="Generate User resume (Random template). Return URL",
    description="TBD: This one is currently not going to be implemented",
    status_code=status.HTTP_200_OK,
    response_model=str
)
def get_resume(
        user: UserCV,
        user_from_token: Annotated[User, Depends(get_current_active_user)],
):
    story = []
    styles = getSampleStyleSheet()

    # Taking all body data if exists. Else - default is what we have from token
    first_name = user.first_name if user.first_name else user_from_token.private_name
    last_name = user.last_name if user.last_name else user_from_token.last_name
    email = user.private_email if user.private_email else user_from_token.user_email

    # Personal info
    story.append(Paragraph(f"<b>{first_name} {last_name}</b>", styles["Title"]))
    story.append(Spacer(1, 12))
    story.append(Paragraph(f"<b>Email:</b> {email}", styles["BodyText"]))

    if user.phone:
        story.append(Paragraph(f"<b>Phone:</b> {user.phone}", styles["BodyText"]))

    story.append(Spacer(1, 12))

    # Summary
    story.append(Paragraph("<b>Summary</b>", styles["Heading2"]))
    story.append(Paragraph(user.summary, styles["BodyText"]))
    story.append(Spacer(1, 12))

    # Skills
    story.append(Paragraph("<b>Skills</b>", styles["Heading2"]))
    story.append(Paragraph(", ".join(user.skills), styles["BodyText"]))
    story.append(Spacer(1, 12))

    # Experience
    story.append(Paragraph("<b>Experience</b>", styles["Heading2"]))
    user.jobs = user.jobs if user.jobs else []

    # If we have existing job, first add it:
    # if not all([user_from_token.job_description, user_from_token.job_company_name, user_from_token.job_start_year]):
    #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User should update current job info first")
    if user_from_token.job_company_name:
        story.append(Paragraph(f"<b>{user_from_token.job_company_name} ({user_from_token.job_start_year} - Present)</b>", styles["Heading3"]))
        story.append(Paragraph(user_from_token.job_description, styles["BodyText"]))
        story.append(Spacer(1, 12))

    for job in user.jobs:
        story.append(Paragraph(f"<b>{job.job_title} at {job.company} ({job.start_date} - {job.end_date or 'Present'})</b>", styles["Heading3"]))
        story.append(Paragraph(job.description, styles["BodyText"]))
        story.append(Spacer(1, 12))

    # Education
    story.append(Paragraph("<b>Education</b>", styles["Heading2"]))

    for edu in user.education:
        story.append(Paragraph(f"<b>{edu.degree} from {edu.institution} ({edu.start_date} - {edu.end_date or 'Present'})</b>", styles["Heading3"]))
        story.append(Spacer(1, 12))

    # Create a BytesIO buffer and build the document in memory
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    doc.build(story)

    # Return the PDF file
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="application/pdf")




MULTI_TECH_STACK_FORMAT = '<ul class="talent"> {} </ul>'
SINGLE_TECH_STACK_FORMAT = '<p>{}</p>'
JOB_FORMAT = """
<div class="job">
    <h3> {} - {}    <p style="display: inline; font-size: 60%;">{} - {}</p> </h3>
    <p>{}</p>
</div>
"""

EDUCATION_FORMAT = """
<div class="yui-u">
    <p style="display: inline;"><b>{}, {} </b>: {} - {} </p>
</div>"""


@router.post(
    "/profile/resume/1",
    name="Generate User resume (Random template). Return URL",
    description="TBD: This one is currently not going to be implemented",
    status_code=status.HTTP_200_OK,
    response_model=str
)
def get_resume(
        user: UserCV,
        token_user: Annotated[User, Depends(get_current_active_user)],
):
    with open(f'{os.getcwd()}/BE/templates/pretty.html') as f:
        html_content = f.read()

    full_name = f"{user.first_name} {user.last_name}" if user.first_name else f"{token_user.private_name} {token_user.last_name}"
    html_content = html_content.replace("USER_FULL_NAME", full_name)
    html_content = html_content.replace("USER_TITLE", user.job_title)
    html_content = html_content.replace("USER_PHONE_NUMBER", user.phone)
    html_content = html_content.replace("USER_PRIVATE_MAIL", user.private_email if user.private_email else token_user.user_email)
    html_content = html_content.replace("USER_SUMMARY", user.summary)


    stacks_formatted = []
    stack_txt = ""
    i = 0
    for skill in user.skills:
        i += 1
        stacks_formatted.append(SINGLE_TECH_STACK_FORMAT.format(skill))
        if i % 2 == 0:
            stack_txt = f'{stack_txt}{MULTI_TECH_STACK_FORMAT.format("".join(stacks_formatted))}'
            stacks_formatted = []

    if stacks_formatted:
        stack_txt = f'{stack_txt}{MULTI_TECH_STACK_FORMAT.format("".join(stacks_formatted))}'

    html_content = html_content.replace("USER_SKILLS", stack_txt)

    jobs = []

    for job in user.jobs:
        jobs.append(JOB_FORMAT.format(job.company, job.job_title, job.start_date, job.end_date, job.description))

    jobs_txt = "".join(jobs)

    html_content = html_content.replace("USER_JOBS", jobs_txt)

    education_list = []
    for edu in user.education:
        education_list.append(EDUCATION_FORMAT.format(edu.degree, edu.institution, edu.start_date, edu.end_date))

    education_txt = "".join(education_list)



    html_content = html_content.replace("USER_EDUCATION", education_txt)


    # Configure PDF options
    pdf_options = {
        "page-size": "A4",
        "encoding": "UTF-8",
        "no-outline": None
    }

    # Generate PDF from HTML
    pdf_data = pdfkit.from_string(html_content, False, options=pdf_options)

    # Set response headers
    pdfkit.from_string(html_content, 'output.pdf')
    buffer = BytesIO(pdf_data)
    # doc = SimpleDocTemplate(buffer, pagesize=letter)
    # doc.build(html_content)

    # Return the PDF file
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="application/pdf")


