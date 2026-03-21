from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


import models
from database import engine
from routers import employee, attendance

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee.router)
app.include_router(attendance.router)
