from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.utils import skills_from_db_value, skills_to_db_value
from app.database import get_db
from app.models.models import Project
from app.schemas.schemas import ProjectCreate, ProjectResponse

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("", response_model=ProjectResponse)
def create_project(payload: ProjectCreate, db: Session = Depends(get_db)):
    project = Project(
        title=payload.title,
        description=payload.description,
        budget=payload.budget,
        required_skills=skills_to_db_value(payload.required_skills),
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return ProjectResponse(
        id=project.id,
        title=project.title,
        description=project.description,
        budget=project.budget,
        required_skills=skills_from_db_value(project.required_skills),
    )


@router.get("", response_model=List[ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return [
        ProjectResponse(
            id=project.id,
            title=project.title,
            description=project.description,
            budget=project.budget,
            required_skills=skills_from_db_value(project.required_skills),
        )
        for project in projects
    ]
