from typing import List, Literal, Optional

from pydantic import BaseModel, ConfigDict


class StudentCreate(BaseModel):
    name: str
    skills: List[str]
    score: int
    github_url: Optional[str] = None


class StudentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    skills: List[str]
    score: int
    github_url: Optional[str] = None


class ProjectCreate(BaseModel):
    title: str
    description: str
    budget: str
    required_skills: List[str]


class ProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    budget: str
    required_skills: List[str]


class MatchResponse(BaseModel):
    student_id: int
    project_id: int
    match_score: float
    matched_skills: List[str]


class MessageCreate(BaseModel):
    sender: Literal["student", "business"]
    content: str


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int
    sender: Literal["student", "business"]
    content: str
