from typing import List

from sqlalchemy.orm import Session

from app.core.utils import normalize_skills
from app.models.models import Project, Student
from app.schemas.schemas import MatchResponse


def _student_skills(student: Student) -> List[str]:
    if not student.skills:
        return []
    return [skill.strip().lower() for skill in student.skills.split(",") if skill.strip()]


def suggest_students_for_project(
    db: Session, project: Project, limit: int = 5
) -> List[MatchResponse]:
    required = set(normalize_skills(project.required_skills.split(",")))
    students = db.query(Student).all()
    ranked: List[MatchResponse] = []

    for student in students:
        current_skills = set(_student_skills(student))
        overlap = sorted(required.intersection(current_skills))
        score = (len(overlap) * 10) + int(student.score or 0)
        ranked.append(
            MatchResponse(
                student_id=student.id,
                project_id=project.id,
                match_score=float(score),
                matched_skills=overlap,
            )
        )

    ranked.sort(key=lambda item: item.match_score, reverse=True)
    return ranked[: max(3, min(limit, 5))]
