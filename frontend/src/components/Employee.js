import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Employee.css';
import AdminDashboard from '../pages/adminDashboard';

function Employee() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch employee data and setEmployee
        // Fetch tasks data and setTasks
    }, [id]);

    const handleTaskCompletion = (taskId, completed) => {
        // Update task completion status and date
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="employee">
            <img src={employee.photo} alt={employee.name} />
            <h1>{employee.name}</h1>
            <p>Email: {employee.email}</p>
            <p>Department: {employee.department}</p>
            <p>Tasks: {tasks.filter(task => task.completed).length} / {tasks.length}</p>

            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Date Assigned</th>
                        <th>Date Completed</th>
                        <th>Completed</th>
                        <th>Supervisor</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.description}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.dateAssigned}</td>
                            <td>{task.dateCompleted}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={(event) => handleTaskCompletion(task.id, event.target.checked)}
                                />
                            </td>
                            <td>{task.supervisor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employee;


// import React, { useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import './Employee.css';

// function Employee() {
//     const { id } = useParams();
//     const location = useLocation();
//     const employee = location.state.employee;
//     const [tasks, setTasks] = useState(employee.tasks || []);

//     const handleTaskCompletion = (taskId, completed) => {
//         // Update task completion status and date
//     };

//     if (!employee) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="employee">
//             <img src={employee.photo} alt={employee.name} />
//             <h1>{employee.name}</h1>
//             <p>Email: {employee.email}</p>
//             <p>Department: {employee.department}</p>
//             <p>Tasks: {tasks.filter(task => task.completed).length} / {tasks.length}</p>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>Description</th>
//                         <th>Due Date</th>
//                         <th>Date Assigned</th>
//                         <th>Date Completed</th>
//                         <th>Completed</th>
//                         <th>Supervisor</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {tasks.map((task) => (
//                         <tr key={task.id}>
//                             <td>{task.description}</td>
//                             <td>{task.dueDate}</td>
//                             <td>{task.dateAssigned}</td>
//                             <td>{task.dateCompleted}</td>
//                             <td>
//                                 <input
//                                     type="checkbox"
//                                     checked={task.completed}
//                                     onChange={(event) => handleTaskCompletion(task.id, event.target.checked)}
//                                 />
//                             </td>
//                             <td>{task.supervisor}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Employee;