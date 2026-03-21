import React, { useEffect, useState } from "react";
import { getEmployees, markAttendance, getAttendance } from "../services/api";

export default function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  const handleMark = async () => {
    await markAttendance({
      employee_id: Number(selected),
      date,
      status,
    });

    fetchAttendance();
  };

  const fetchAttendance = async () => {
    if (!selected) return;
    const data = await getAttendance(selected);
    setAttendance(data);
  };

  return (
    <div>
      <h2>Attendance</h2>

      <select onChange={(e) => setSelected(e.target.value)}>
        <option>Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.full_name}
          </option>
        ))}
      </select>

      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <select onChange={(e) => setStatus(e.target.value)}>
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button onClick={handleMark}>Mark Attendance</button>

      <button onClick={fetchAttendance}>Load Attendance</button>

      <ul>
        {attendance.map((a) => (
          <li key={a.id}>
            {a.date} - {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}