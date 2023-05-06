from fastapi import APIRouter, status

from BE.lib.utils.enums import JobTime, Experience, Faculty, Year, Rating, EnumsResponse

router = APIRouter()


@router.get(
    "/enums",
    name="Get all Enums as JSON for Faculty: list of faculties",
    status_code=status.HTTP_200_OK,
    response_model=EnumsResponse,
    description="Getting all Enums. Purpose: FrontEnd will be able to convert the Backend values to it's desired values"
)
def get_enums():
    return {
        "JobTime": [item for item in JobTime],
        "Experience": [item for item in Experience],
        "Faculty": [item for item in Faculty],
        "Year": [item for item in Year],
        "Rating": [item for item in Rating]
    }
