from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import models  # noqa: F401
from app.routes.match import router as match_router
from app.routes.projects import router as projects_router
from app.routes.students import router as students_router
from app.routes.workspace import router as workspace_router

app = FastAPI(title="Setu Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(students_router)
app.include_router(projects_router)
app.include_router(match_router)
app.include_router(workspace_router)
