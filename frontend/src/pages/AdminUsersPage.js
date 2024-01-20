import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import axios from 'axios';
import Navbar from '../components/Navbar';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';

const EditButton = () => {
  return (
    <div className="flex button text-white justify-center items-center w-10 h-7 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400">
      <EditIcon />
    </div>
  );
};

const DeleteButton = () => {
  return (
    <div className="flex button text-white justify-center items-center w-10 h-7 bg-red-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#b91c1c,0_0px_0_0_#b91c1c41] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#b91c1c,0_15px_0_0_#b91c1c41] border-b-[1px] border-red-400">
      <DeleteIcon />
    </div>
  );
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5010/users/`).then(response => {
      // Simulate loading by pausing execution for 2 seconds
      // setTimeout(() => {
      //   setUsers(response.data);
      //   setIsLoading(false);
      // }, 4000);
      setUsers(response.data);
      setIsLoading(false);
    });
  }, []);

  const headings = ['Name', 'Department', 'Role', 'Status', 'Edit', 'Delete'];

  const data = isLoading
    ? [{}]
    : users.map(user => ({
        Name: user.name,
        Department: user.departmentName.join(', '),
        Role: user.roleName,
        Status: '0/0',
        Edit: <EditButton />,
        Delete: <DeleteButton />,
      }));

  return (
    <div className="flex">
      <Navbar />

      <div className="flex-grow mt-2 mr-2 ml-20 bg-white">
        <Table data={data} headings={headings} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AdminUsersPage;
