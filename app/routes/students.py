from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.utils import skills_from_db_value, skills_to_db_value
from app.database import get_db
from app.models.models import Student
from app.schemas.schemas import StudentCreate, StudentResponse

router = APIRouter(prefix="/students", tags=["students"])


@router.post("", response_model=StudentResponse)
def create_student(payload: StudentCreate, db: Session = Depends(get_db)):
    student = Student(
        name=payload.name,
        skills=skills_to_db_value(payload.skills),
        score=payload.score,
        github_url=payload.github_url,
    )
    db.add(student)
    db.commit()
    db.refresh(student)
    return StudentResponse(
        id=student.id,
        name=student.name,
        skills=skills_from_db_value(student.skills),
        score=student.score,
        github_url=student.github_url,
    )


@router.get("", response_model=List[StudentResponse])
def list_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    return [
        StudentResponse(
            id=student.id,
            name=student.name,
            skills=skills_from_db_value(student.skills),
            score=student.score,
            github_url=student.github_url,
        )
        for student in students
    ]
