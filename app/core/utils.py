from typing import Iterable, List


def normalize_skills(skills: Iterable[str]) -> List[str]:
    return [skill.strip().lower() for skill in skills if skill and skill.strip()]


def skills_to_db_value(skills: Iterable[str]) -> str:
    normalized = normalize_skills(skills)
    return ",".join(normalized)


def skills_from_db_value(skills_value: str) -> List[str]:
    if not skills_value:
        return []
    return [skill for skill in skills_value.split(",") if skill]
