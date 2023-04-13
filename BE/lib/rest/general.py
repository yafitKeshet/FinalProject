from fastapi import APIRouter, status

general_router = APIRouter()


@general_router.get(
    "/enums",
    name="Get all Enums as JSON for Faculty: list of faculties",
    status_code=status.HTTP_200_OK,
    response_model=dict,
    description="Getting all Enums. Purpose: FrontEnd will be able to convert the Backend values to it's desired values"
)
def get_enums():
    pass
