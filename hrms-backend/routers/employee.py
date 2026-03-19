from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/", response_model=schemas.EmployeeResponse)
def create_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):

    # check duplicate employee_id or email
    existing = db.query(models.Employee).filter(
        (models.Employee.employee_id == emp.employee_id) |
        (models.Employee.email == emp.email)
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Employee already exists")

    new_emp = models.Employee(**emp.dict())
    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)
    return new_emp


@router.get("/", response_model=list[schemas.EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()


@router.delete("/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    emp = db.query(models.Employee).filter(
        models.Employee.id == emp_id).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(emp)
    db.commit()

    return {"message": "Employee deleted successfully"}
