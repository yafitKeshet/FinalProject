from typing import List

from enum import Enum
from pydantic import BaseModel


class JobTime(Enum):
    FULL_TIME: 1
    PART_TIME: 2
    STUDENT: 3


class Experience(Enum):
    JUNIOR: 1
    SENIOR: 2
    NON_RELEVANT: 3


class Faculty(Enum):
    COMPUTER_SCIENCE = 'ComputerScience'
    ECONOMY = 'Economy'
    Psychology = 'Ps'
    Social = ''


class Year(Enum):
    FIRST = "First"
    SECOND = "Second"
    THIRD = "Third"
    FOURTH = "Fourth"
    GRADUATED = "Fifth"


class Rating(Enum):
    NOT_RECOMMENDED = 1
    POOR = 2
    OK = 3
    GOOD = 4
    GREAT = 5


class EnumsResponse(BaseModel):
    Faculty: List[Faculty]
    Year: List[Year]
    JobTime: List[JobTime]
