import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("/getAllEmployees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <input
        type="text"
        placeholder="Search employees"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <ul>
        {filteredEmployees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.jobTitle}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;