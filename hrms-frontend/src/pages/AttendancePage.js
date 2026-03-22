import React, { useEffect, useState } from "react";
import { getEmployees, markAttendance, getAttendance } from "../services/api";

export default function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [mode, setMode] = useState("");

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  const handleMark = async () => {
    if (!selected || !date) {
      alert("Please select employee and date");
      return;
    }
    try {
      await markAttendance({
        employee_id: selected,
        date,
         status,
         });
   
        alert("Attendance marked ");
        }
        catch (error) {
             alert(error.message);  
        }
      };
  
  const fetchAttendance = async () => {
    if (!selected && !date) {
      alert("Select employee or date");
      return;
    }

    const data = await getAttendance(selected, date);
    setAttendance(data);
  };

  const tableStyle = {
  fontFamily: 'Arial, sans-serif',
  borderCollapse: 'collapse',
  width: '100%',
};

const cellStyle = {
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '8px',
};
  return (
    <div>
      <h2>Attendance</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => {
            setMode("mark");
            setAttendance([]);
          }}
        >
          Mark Attendance
        </button>

        <button
          onClick={() => {
            setMode("load");
            setSelected("");setDate("");
            setAttendance([]);
          }}
        >
          Load Attendance
        </button>
      </div>

      {/*  LOAD ATTENDANCE */}
      {mode === "load" && (
        <div>
          <h3>Load Attendance</h3>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value="">All Employees</option>
            {employees.map((emp,index) => (
              <option key={index} value={emp.employee_id}>
                {emp.full_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            style={{ marginLeft: "10px" }}
          />

          <button onClick={fetchAttendance} style={{ marginLeft: "10px" }}>
            Load
          </button>


          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>S.No</th>
                <th style={cellStyle}>Employee ID</th>
                <th style={cellStyle}>Date</th>
                <th style={cellStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((a,index) => (
                <tr key={a.id}>
                  <td style={cellStyle}>{index}</td>
                  <td style={cellStyle}>{a.employee_id}</td>
                  <td style={cellStyle}>{a.date}</td>
                  <td style={cellStyle}>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/*  MARK ATTENDANCE */}
      {mode === "mark" && (
        <div>
          <h3>Mark Attendance</h3>

          <select onChange={(e) => setSelected(e.target.value)}>
            <option>Select Employee</option>
            {employees.map((emp,index) => {
              console.log("emp::::"+emp+"emp.employee_id"+emp.employee_id+ "Type:::"+ typeof(emp.employee_id));
             return(
              <option key={index} value={emp.employee_id}>
                {emp.full_name}
              </option>)
            })}
          </select>

          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            style={{ marginLeft: "10px" }}
          />

          <select
            onChange={(e) => setStatus(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option>Present</option>
            <option>Absent</option>
          </select>

          <button onClick={handleMark} style={{ marginLeft: "10px" }}>
            Mark
          </button>
        </div>
      )}
    </div>
  );
}