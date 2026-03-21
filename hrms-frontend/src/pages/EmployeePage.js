import React, { useEffect, useState } from "react";
import { getEmployees, createEmployee, deleteEmployee } from "../services/api";

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const fetchEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    // fetchEmployees();
  }, []);

  const handleSubmit = async () => {
    await createEmployee(form);
    setForm({ employee_id: "", full_name: "", email: "", department: "" });
    fetchEmployees();
  };

  return (
    <div>
      <h2>Employees</h2>

      <input placeholder="Employee ID" onChange={(e) => setForm({ ...form, employee_id: e.target.value })} />
      <input placeholder="Name" onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Department" onChange={(e) => setForm({ ...form, department: e.target.value })} />

      <button onClick={handleSubmit}>Add Employee</button>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.full_name} ({emp.department})
            <button onClick={() => { deleteEmployee(emp.id); fetchEmployees(); }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}