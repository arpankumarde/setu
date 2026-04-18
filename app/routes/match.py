from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Project
from app.schemas.schemas import MatchResponse
from app.services.matching_service import suggest_students_for_project

router = APIRouter(prefix="/match", tags=["match"])


@router.get("/{project_id}", response_model=List[MatchResponse])
def get_project_matches(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return suggest_students_for_project(db=db, project=project)
