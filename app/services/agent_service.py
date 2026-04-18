from typing import Dict, List


def analyze_project_brief(text: str) -> Dict[str, object]:
    """Mock brief analysis output for future LLM integration."""
    return {
        "summary": text[:140] if text else "",
        "detected_requirements": ["timeline", "deliverables", "communication"],
        "risk_flags": ["scope ambiguity"] if text and len(text) < 40 else [],
        "confidence": 0.78,
    }


def suggest_students(project_id: int) -> Dict[str, object]:
    """Mock student recommendation payload keyed by project id."""
    return {
        "project_id": project_id,
        "suggested_student_ids": [1, 2, 3],
        "reasoning": "Top candidates selected from skill overlap and profile score.",
    }


def evaluate_student(student_id: int) -> Dict[str, object]:
    """Mock student evaluation payload for agent orchestration."""
    return {
        "student_id": student_id,
        "evaluation": {
            "technical_fit": "high",
            "delivery_readiness": "medium",
            "communication": "high",
        },
        "overall_recommendation": "shortlist",
    }


def generate_outreach(project: Dict[str, object]) -> Dict[str, str]:
    """Mock outreach draft for business-student coordination."""
    title = str(project.get("title", "your project"))
    return {
        "subject": f"Opportunity: {title}",
        "message": (
            f"Hi there, we think your profile matches {title}. "
            "Please share your availability for a quick intro call."
        ),
    }
