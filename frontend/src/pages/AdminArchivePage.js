import React, { useEffect, useState } from 'react';
import RestoreIcon from '../icons/RestoreIcon';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import axios from 'axios';

const RestoreUserButton = ({ id }) => {
  return (
    <button
      className="flex text-white justify-center items-center w-24 h-7 bg-green-500 rounded-lg cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#38a169,0_0px_0_0_#38a16941] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#38a169,0_15px_0_0_#38a16941] border-b-[1px] border-green-400"
      onClick={async (event) => {
        event.stopPropagation();
        await axios.put(`http://localhost:5010/user/unarchive/${id}`);
        window.location.reload();
      }
      }
    >
      <RestoreIcon />
      <span className="ml-1">Restore</span>
    </button>
  );
};

const RestoreDepartmentButton = ({ id }) => {
  return (
    <button
      className="flex text-white justify-center items-center w-24 h-7 bg-green-500 rounded-lg cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#38a169,0_0px_0_0_#38a16941] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#38a169,0_15px_0_0_#38a16941] border-b-[1px] border-green-400"
      onClick={async (event) => {
        event.stopPropagation();
        await axios.put(`http://localhost:5010/department/unarchive/${id}`);
        window.location.reload();
      }
      }
    >
      <RestoreIcon />
      <span className="ml-1">Restore</span>
    </button>
  );
};

function AdminArchivePage() {
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch departments
    axios.get('http://localhost:5010/departments/archived').then(response => {
      console.log(response.data);
      setDepartments(response.data);
    });

    // Fetch users
    axios.get('http://localhost:5010/users/archived').then(response => {
      console.log('users', response.data);
      setUsers(response.data);
    });    

    setIsLoading(false);
  }, []);  

  const userData = isLoading ? [{}] : users.map(user => ({
    id: user.id,
    Name: user.name,
    Department: user.departmentName.join(', '),
    Role: user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase(),
    Status: '0/0',
    Restore: <RestoreUserButton id={user.id} />,
  }));

  const departmentData = isLoading ? [{}] : departments.map(department => ({
    id: department.id,
    Department: department.name,
    Restore: <RestoreDepartmentButton id={department.id} />,
  }));

  return (
    <div>
      <div className="flex">
        <Navbar />
      </div>

      <div className="flex-grow mt-2 mr-2 ml-20">
        {/*Users*/}
        <div className="ml-15 mr-2 mt-2 p-6 rounded-lg bg-gray-900">
          {/*Section Heading*/}
          <h1 className="mb-4 text-white text-2xl font-bold">Users</h1>
          <div>
            {<Table data={userData} headings={['Name', 'Department', 'Role', 'Status', 'Restore']} isLoading={false} />}
          </div>
        </div>

        {/*Departments*/}
        <div className="ml-15 mr-2 mt-2 p-6 rounded-lg bg-gray-900">
          {/*Section Heading*/}
          <h1 className="mb-4 text-white text-2xl font-bold">Departments</h1>
          <div>
            <Table data={departmentData} headings={['Department', 'Restore']} isLoading={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminArchivePage;
