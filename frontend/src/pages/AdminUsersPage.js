import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';
import Table from '../components/Table';
import EditUserModal from '../components/EditUserModal';

const EditButton = ({ onClick }) => {
  return (
    <div
      className="flex button text-white justify-center items-center w-10 h-7 bg-blue-500 rounded-lg cursor-pointer select-none active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400"
      onClick={onClick}
    >
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
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleEdit = user => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleSubmit = user => {
    console.log(user);
    setIsModalOpen(false);
  };

  const headings = ['Name', 'Department', 'Role', 'Status', 'Edit', 'Delete'];

  const data = isLoading
    ? [{}]
    : users.map(user => ({
        Name: user.name,
        Department: user.departmentName.join(', '),
        Role: user.roleName,
        Status: '0/0',
        Edit: (
          <EditButton
            onClick={() => {
              console.log('edit button is clicked');
              handleEdit(user);
            }}
          />
        ),
        Delete: <DeleteButton />,
      }));

  return (
    <div className="flex">
      <Navbar />

      <div className="flex-grow mt-2 mr-2 ml-20 bg-white">
        <Table data={data} headings={headings} isLoading={isLoading} />
        {currentUser && (
          <EditUserModal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            user={currentUser}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
