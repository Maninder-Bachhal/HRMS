import React, { useState } from "react";


export default function App() {
  const [page, setPage] = useState("employees");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>HRMS Lite</h1>

      <button onClick={() => setPage("employees")}>Employees</button>
      <button onClick={() => setPage("attendance")}>Attendance</button>

      <hr />


    </div>
  );
}