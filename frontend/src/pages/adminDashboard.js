import React, { useState } from "react";
import { Link } from "react-router-dom";
import './adminDashboard.css';

const AdminDashboard = () => {
    const empl = [
        { id: 1, name: "John Doe", department: "IT", taskCompletion: "Completed" },
        { id: 2, name: "Jane Smith", department: "HR", taskCompletion: "Incomplete" },
        { id: 3, name: "Bob Johnson", department: "Finance", taskCompletion: "Completed" },
    ];
    const [employees, setEmployees] = useState(empl);

    const [searchTerm, setSearchTerm] = useState("");

    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
    };

    const handleDeleteAllEmployees = () => {
        setEmployees([]);
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div>
                <Link to="/admin/addUser">
                    <button>Add User</button>
                </Link>
                <button onClick={handleDeleteAllEmployees}>Delete All Users</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search Employees"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/*<button>Filter</button>*/}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Task Completion Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td>
                                <Link to={{
                                    pathname: `/admin/employees/${employee.id}`,
                                    state: { employee }
                                }}>
                                    {employee.name}
                                </Link>
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.taskCompletion}</td>
                            <td>
                                <button onClick={() => handleDeleteEmployee(employee.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
