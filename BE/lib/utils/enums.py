from typing import List

from enum import Enum
from pydantic import BaseModel


class JobTime(Enum):
    FullTime = "FullTime"
    PartTime = "PartTime"
    Studnet = "Student"


class Experience(Enum):
    Junior = "Junior"
    Senior = "Senior"
    NonRelevant = "NotRelevant"


class Faculty(Enum):
    ComputerScience = 'ComputerScience'
    Economy = 'Economy'
    Psychology = 'Psychology'
    Social = 'Social'


class Year(Enum):
    First = "First"
    Second = "Second"
    Third = "Third"
    Fourth = "Fourth"
    Fifth = "Fifth"
    Graduated = "Graduated"


class Rating(Enum):
    NotRecommended = "NotRecommended"
    Poor = "Poor"
    Ok = "Ok"
    Good = "Good"
    Great = "Great"


class EnumsResponse(BaseModel):
    JobTime: List[JobTime]
    Experience: List[Experience]
    Faculty: List[Faculty]
    Year: List[Year]
    Rating: List[Rating]
