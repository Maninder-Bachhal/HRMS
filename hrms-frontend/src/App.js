import React, { useState } from "react";
import EmployeePage from "./pages/EmployeePage";
import AttendancePage from "./pages/AttendancePage";

export default function App() {
  const [page, setPage] = useState("employees");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>HRMS Lite</h1>

      <button onClick={() => setPage("employees")}>Employees</button>
      <button onClick={() => setPage("attendance")}>Attendance</button>

      <hr />

      {page === "employees" ? <EmployeePage /> : <AttendancePage />}
    </div>
  );
}