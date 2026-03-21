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
    fetchEmployees();
  }, []);

  const handleSubmit = async () => {
     try {
    await createEmployee(form);
  } catch (error) {
    alert(error.message);   
  }
  finally{
    setForm({
      employee_id: "",
      full_name: "",
      email: "",
      department: "",
    });

    fetchEmployees();
  }
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
      <h2>Create New Employee</h2>

      <input placeholder="Employee ID" value={form.employee_id} onChange={(e) => setForm({ ...form, employee_id: e.target.value })} />
      <input placeholder="Name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />

      <button onClick={handleSubmit}>Add Employee</button>

      <h2>Employees</h2>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>S.No</th>
            <th style={cellStyle}>Emp. ID</th>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Department</th>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>Delete Employee</th>
          </tr>
        </thead>
        <tbody>
        {employees.map((emp,index) => (
            <tr key={index}>
              <td style={cellStyle}>{index}</td>
              <td style={cellStyle}>{emp.employee_id}</td>
              <td style={cellStyle}>{emp.full_name}</td>
              <td style={cellStyle}>{emp.department}</td>
              <td style={cellStyle}>{emp.email}</td>
              <td style={cellStyle}><button onClick={() => { deleteEmployee(emp.id); fetchEmployees(); }}>
              Delete
              </button></td>
            </tr>
          
        ))}
        </tbody>
      </table>
    </div>
  );
}