import React, { useState } from 'react';
import './addUser.css';

function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here

    };

    return (
        <div className="add-user-container">
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <label htmlFor="role">Role:</label>
                <select
                    id="role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                >
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
                    <option value="Supervisor">Supervisor</option>
                </select>

                <label htmlFor="department">Department:</label>
                <input
                    type="text"
                    id="department"
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddUser;
