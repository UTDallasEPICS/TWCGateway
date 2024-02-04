import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Table from '../components/Table';

const AdminDepartmentsPage = () => {
  const [employeess, setEmployeess] = useState([]);
  const [departments, setDepartments] = useState([]);
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
    axios.get(`http://localhost:5010/users/employees`).then(response => {
      console.log(response.data, 'response.data');
      setEmployeess(response.data);
    });
    setIsLoading(false);
  }, [employeess]);

  // const tableHeading = ['Description', 'Supervisor'];
  // const tableData = tableDataa;
  const employeeHeadings = ['Name', 'Department', 'Role', 'Status', 'Edit', 'Archive'];
  const employeeData = isLoading
    ? [{}]
    : employeess.map(user => ({
        id: user.id,
        Name: user.name,
        Department: user.departmentName.join(', '),
        Role: user.roleName,
        Status: '0/0',
        Edit: '',
        Archive: '',
      }));

  return (
    <div>
      <div className="flex">
        <Navbar />
      </div>

      <div className="flex flex-col flex-grow">
        {departments.map(department => (
          <>
            <div className="ml-20 mr-2 mt-2 p-6 rounded-lg bg-gray-900">
              <h1 className="mb-4 text-white text-2xl font-bold">{department.name}</h1>
            </div>
            <Table data={employeeData} heading={employeeHeadings} isLoading={isLoading} />
          </>
        ))}
      </div>
    </div>
  );
};

export default AdminDepartmentsPage;
