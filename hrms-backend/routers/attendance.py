from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/", response_model=schemas.AttendanceResponse)
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db)):

    # check employee exists
    emp = db.query(models.Employee).filter(
        models.Employee.id == att.employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    # check duplicate attendance
    existing = db.query(models.Attendance).filter(
        models.Attendance.employee_id == att.employee_id,
        models.Attendance.date == att.date
    ).first()

    if existing:
        raise HTTPException(
            status_code=400, detail="Attendance already marked")

    new_att = models.Attendance(**att.dict())
    db.add(new_att)
    db.commit()
    db.refresh(new_att)

    return new_att


@router.get("/{employee_id}", response_model=list[schemas.AttendanceResponse])
def get_attendance(employee_id: int, db: Session = Depends(get_db)):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()
