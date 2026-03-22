# HRMS (Human Resource Management System)

A full-stack HRMS application built using:

- **Backend:** FastAPI + PostgreSQL
- **Frontend:** React (Parcel)

---

# 📁 Project Structure

```
HRMS/
│
├── hrms-backend/
│   ├── routers/
│   │    └── attendance.py
│   │    └── employee.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── main.py
│   ├── core/
│   │    └── exception_handlers.py
│   ├── .env
│   └── requirements.txt
│
├── hrms-frontend/
│   ├── src/
│   │   ├── pages/
│   │   │    ├── EmployeePage.js
│   │   │    └── AttendancePage.js
│   │   ├── services/
│   │   │    └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── index.html
│
├── .gitignore
└── README.md
```

---

# Backend Setup (FastAPI)

## 1. Navigate to backend

```
cd hrms-backend
```

---

## 2. Create virtual environment

```
python -m venv venv
```

Activate:

```
venv\Scripts\activate   (Windows)
```

---

## 3. Install dependencies

```
pip install -r requirements.txt
```

---

## 4. Create `.env` file

📁 Location: `hrms-backend/.env`

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/hrms_db
```

Replace:

- `yourpassword` → your PostgreSQL password

---

## 5. Run backend server

```
uvicorn main:app --reload
```

Open Swagger UI:

```
http://127.0.0.1:8000/docs
```

---

# Database Setup (PostgreSQL)

## Create database

```
CREATE DATABASE hrms_db;
```

Tables will be auto-created when backend runs.

---

# Frontend Setup (React + Parcel)

## 1. Navigate to frontend

```
cd hrms-frontend
```

---

## 2. Install dependencies

```
npm install
```

---

## 3. Start frontend

```
npm start
```

App runs on:

```
http://localhost:1234
```

---

# Frontend API Configuration

📁 File: `hrms-frontend/src/services/api.js`

Add backend base URL:

```js
const BASE_URL = 'http://127.0.0.1:8000';
```

---

# API Endpoints

## Employee APIs

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| POST   | `/employees/`     | Create employee   |
| GET    | `/employees/`     | Get all employees |
| DELETE | `/employees/{id}` | Delete employee   |

---

## Attendance APIs

| Method | Endpoint       | Description                        |
| ------ | -------------- | ---------------------------------- |
| POST   | `/attendance/` | Mark attendance                    |
| GET    | `/attendance`  | Get attendance (filters supported) |

### Query Params:

```
/attendance?employee_id=EMP001
/attendance?attendance_date=2026-03-20
/attendance?employee_id=EMP001&attendance_date=2026-03-20
```

---

# Application Flow

## Employee Flow

1. Create employee from UI
2. Backend validates:
   - Unique employee_id
   - Unique email

3. Stored in PostgreSQL

---

## Attendance Flow

1. Select employee
2. Select date & status
3. Backend checks:
   - Employee exists
   - Attendance not already marked

4. Stores attendance

---

# How to Run Complete Project

### Step 1

Start PostgreSQL

---

### Step 2

Run backend

```
cd hrms-backend
uvicorn main:app --reload
```

---

### Step 3

Run frontend

```
cd hrms-frontend
npm start
```

---

### Step 4

Open browser

```
http://localhost:1234
```

---

# Features

- Employee Management
- Attendance Tracking
- Duplicate prevention
- Flexible filtering
- Clean API design

---

# Tech Stack

- FastAPI
- SQLAlchemy
- PostgreSQL
- React
- Parcel

---

# Future Improvements

- Authentication (JWT)
- Dashboard analytics
- Monthly reports
- UI improvements

---

# Author

Maninder Bachhal
