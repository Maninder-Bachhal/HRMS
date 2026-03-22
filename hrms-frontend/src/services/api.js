const BASE_URL = "http://127.0.0.1:8000"; 

export const getEmployees = async () => {
  const res = await fetch(`${BASE_URL}/employees`);
  return res.json();
};

export const createEmployee = async (data) => {
  const res = await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
 
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

export const deleteEmployee = async (id) => {
  await fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
  });
};

export const markAttendance = async (data) => {
  const res = await fetch(`${BASE_URL}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getAttendance = async (employeeId, date) => {
  let url = `${BASE_URL}/attendance?`;

  if (employeeId) url += `employee_id=${employeeId}&`;
  if (date) url += `attendance_date=${date}`;

  const res = await fetch(url);
  return res.json();
};