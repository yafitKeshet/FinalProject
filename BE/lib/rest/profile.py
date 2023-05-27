from fastapi import APIRouter, status, Depends, HTTPException
from typing_extensions import Annotated

from ..utils.auth.decode_token import get_current_active_user
from ..utils.db.models.user import User
from ..utils.db.user_db import UserDBSession, get_db_session
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
    "/profile/resume",
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
    email = user.email if user.email else user_from_token.user_email

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
    if not all([user_from_token.job_description, user_from_token.job_company_name, user_from_token.job_start_year]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User should update current job info first")
    if user_from_token.job_company_name:
        story.append(
            Paragraph(f"<b>{user_from_token.job_company_name} ({user_from_token.job_start_year} - Present)</b>",
                      styles["Heading3"]))
        story.append(Paragraph(user_from_token.job_description, styles["BodyText"]))
        story.append(Spacer(1, 12))

    for job in user.jobs:
        story.append(
            Paragraph(f"<b>{job.job_title} at {job.company} ({job.start_date} - {job.end_date or 'Present'})</b>",
                      styles["Heading3"]))
        story.append(Paragraph(job.description, styles["BodyText"]))
        story.append(Spacer(1, 12))

    # Education
    story.append(Paragraph("<b>Education</b>", styles["Heading2"]))

    for edu in user.education:
        story.append(
            Paragraph(f"<b>{edu.degree} from {edu.institution} ({edu.start_date} - {edu.end_date or 'Present'})</b>",
                      styles["Heading3"]))
        story.append(Spacer(1, 12))

    # Create a BytesIO buffer and build the document in memory
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    doc.build(story)

    # Return the PDF file
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="application/pdf")
