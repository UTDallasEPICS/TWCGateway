import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Table from '../components/Table';
import TableRowSkeleton from '../components/TableRowSkeleton';

const AdminDepartmentsPage = () => {
  // const [employeess, setEmployeess] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [tasks, setTasks] = useState({});
  // const [tableDataa, setTableDataa] = useState([
  //   {
  //     Description: 'Task 1',
  //     Supervisor: 'Supervisor 1',
  //   }
  // ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch departments
    axios.get('http://localhost:5010/departments').then(response => {
      setDepartments(response.data);
    });

    // axios.get(`http://localhost:5010/users/employees`).then(response => {
    //   console.log(response.data, 'response.data');
    //   setEmployeess(response.data);
    // });
    setIsLoading(false);
  }, []);

  // const tableHeading = ['Description', 'Supervisor'];
  // const tableData = tableDataa;
  // const employeeHeadings = ['Name', 'Department', 'Role', 'Status', 'Edit', 'Archive'];
  // const employeeData = isLoading
  //   ? [{}]
  //   : employeess.map(user => ({
  //       id: user.id,
  //       Name: user.name,
  //       Department: user.departmentName.join(', '),
  //       Role: user.roleName,
  //       Status: '0/0',
  //       Edit: '',
  //       Archive: '',
  //     }));

  const tableHeading = ['Task', 'Status'];

  return (
    <>
      <div>
        <div className="flex">
          <Navbar />
        </div>
        {departments.map(department => (
          <div className="flex flex-col flex-grow">
            <div className="ml-20 mr-2 mt-2 mb-2 p-6 rounded-lg bg-gray-900">
              <div className="flex flex-row justify-between">
                <h1 className="mb-4 text-white text-2xl font-bold">{department.name}</h1>
                <button
                  className="button text-white ml-4 w-20 h-8 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400"
                  onClick={() => {
                    axios.get(`https://dummyjson.com/todos`).then(response => {
                      console.log(response.data);
                      const departmentTasks = response.data.todos.map(todo => ({
                        Task: todo.todo,
                        Status: todo.completed ? 'Completed' : 'Incomplete',
                      }));
                      setTasks(prevTasks => ({ ...prevTasks, [department.name]: departmentTasks }));
                    });
                  }}
                >
                  Load Tasks
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <Table data={tasks[department.name] || []} headings={tableHeading} isLoading={isLoading} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDepartmentsPage;
