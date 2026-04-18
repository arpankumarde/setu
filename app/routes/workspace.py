from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Message
from app.schemas.schemas import MessageCreate, MessageResponse

router = APIRouter(prefix="/workspace", tags=["workspace"])


@router.get("/{project_id}", response_model=List[MessageResponse])
def get_messages(project_id: int, db: Session = Depends(get_db)):
    messages = (
        db.query(Message).filter(Message.project_id == project_id).order_by(Message.id.asc()).all()
    )
    return messages


@router.post("/{project_id}", response_model=MessageResponse)
def send_message(project_id: int, payload: MessageCreate, db: Session = Depends(get_db)):
    message = Message(project_id=project_id, sender=payload.sender, content=payload.content)
    db.add(message)
    db.commit()
    db.refresh(message)
    return message
