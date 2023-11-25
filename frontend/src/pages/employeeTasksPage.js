import { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeTasksPage.css';

const EmployeeTasksPage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Replace with your API endpoint
        axios.get('http://localhost:5010/getAllTasks')
            .then(response => {
                setTasks(response.data);
                console.log("data start: " + response.data + " data end");
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleCheckboxChange = (index) => {
        setTasks(tasks.map((task, i) => {
          if (i === index) {
            return {...task, approvedTask: !task.approvedTask};
          }
          return task;
        }));
      };

    return (
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                    <tr key={index}>
                        <td>{task.taskId}</td>
                        <td><input 
                                type="checkbox" 
                                checked={task.approvedTask}
                                onChange={()=> handleCheckboxChange(index)} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default EmployeeTasksPage;