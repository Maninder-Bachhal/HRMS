from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date
import models
import schemas
from database import get_db

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/", response_model=schemas.AttendanceResponse)
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db)):

    # check employee exists
    emp = db.query(models.Employee).filter(
        models.Employee.employee_id == str(att.employee_id)).first()
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


@router.get("/", response_model=list[schemas.AttendanceResponse])
def get_attendance(employee_id: str | None = Query(None), attendance_date: date | None = Query(None), db: Session = Depends(get_db)):
    query = db.query(models.Attendance)

    if employee_id:
        query = query.filter(models.Attendance.employee_id == employee_id)

    if attendance_date:
        query = query.filter(models.Attendance.date == attendance_date)

    return query.all()
