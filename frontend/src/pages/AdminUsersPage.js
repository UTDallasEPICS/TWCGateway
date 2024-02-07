import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SendToArchiveBoxIcon from '../icons/SendToArchiveBoxIcon';
import Table from '../components/Table';
import EditUserModal from '../components/EditUserModal';
import AddUserButton from '../components/AddNewUser';
import AddUserIcon from '../icons/AddUserIcon';
import Divider from '../components/Divider';
import Cookies from 'js-cookie';

const SendToArchiveBoxButton = ({ userId, currUserId }) => {
  const [isArchiving, setIsArchiving] = useState(false);

  if (currUserId === userId) {
    return null;
  }

  return (
    <button
      className={`flex text-white justify-center items-center w-10 h-7 bg-gray-500 rounded-lg cursor-pointer select-none ${
        isArchiving
          ? 'opacity-50 cursor-not-allowed'
          : 'active:translate-y-2 active:[box-shadow:0_0px_0_0_#4B5563,0_0px_0_0_#4B556341] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#4B5563,0_15px_0_0_#4B556341] border-b-[1px] border-gray-400'
      }`}
      onClick={async () => {
        setIsArchiving(true);
        await axios.put(`http://localhost:5010/user/archive/${userId}`);
        window.location.reload();
        setIsArchiving(false);
      }}
    >
      <SendToArchiveBoxIcon />
    </button>
  );
};

const AdminUsersPage = () => {
  const [currUserId, setCurrUserId] = useState('');
  const [employees, setEmployees] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isArchivingEmployees, setIsArchivingEmployees] = useState(false);
  const [isArchivingSupervisors, setIsArchivingSupervisors] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.post(`http://localhost:5010/checkEmail/`, { email: Cookies.get('email') }).then(response => {
      setCurrUserId(response.data.id);
    });
    axios.get(`http://localhost:5010/users/employees`).then(response => {
      setEmployees(response.data);
      setIsLoading(false);
    });
    axios.get(`http://localhost:5010/users/supervisors`).then(response => {
      setSupervisors(response.data);
      setIsLoading(false);
    });
    axios.get(`http://localhost:5010/users/admins`).then(response => {
      setAdmins(response.data);
      setIsLoading(false);
    });
  }, []);

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const employeeHeadings = ['Name', 'Department', 'Role', 'Status', 'Edit', 'Archive'];
  const supervisorHeadings = ['Name', 'Department', 'Role', 'Status', 'Edit', 'Archive'];
  const adminHeadings = ['Name', 'Department', 'Role', 'Status', 'Edit', 'Archive'];

  const employeeData = isLoading
    ? [{}]
    : employees
        .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(user => ({
          id: user.id,
          Name: user.name,
          Department: user.departmentName.join(', '),
          Role: (user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()),
          Status: '0/0',
          Edit: <EditUserModal user={user} />,
          Archive: <SendToArchiveBoxButton userId={user.id} currUserId={currUserId} />,
        }));

  const supervisorData = isLoading
    ? [{}]
    : supervisors
        .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(user => ({
          id: user.id,
          Name: user.name,
          Department: user.departmentName.join(', '),
          Role: (user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()),
          Status: '0/0',
          Edit: <EditUserModal user={user} />,
          Archive: <SendToArchiveBoxButton userId={user.id} currUserId={currUserId} />,
        }));

  const adminData = isLoading
    ? [{}]
    : admins
        .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(user => ({
          id: user.id,
          Name: user.name,
          Department: user.departmentName.join(', '),
          Role: (user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()),
          Status: '0/0',
          Edit: <EditUserModal user={user} />,
          Archive: <SendToArchiveBoxButton userId={user.id} currUserId={currUserId} />,
        }));

  return (
    <div className="flex">
      <Navbar />

      <div className="flex flex-col flex-grow">
        {/*Search Bar*/}
        <div className="ml-20 mt-2 mr-2 p-2 rounded-lg bg-gray-900">
          <input
            className="w-full border-2 border-gray-300 focus:outline-none focus:border-warrenBlue rounded"
            type="text"
            placeholder=" Search Users"
            onFocus={e => e.target.select()}
            onChange={handleSearchTermChange}
          />
        </div>

        {/*Onboarding Employees*/}
        <div className="ml-20 mr-2 mt-2 p-6 rounded-lg bg-gray-900">
          {/*Section Heading*/}
          <h1 className="mb-4 text-white text-2xl font-bold">Onboarding Employees</h1>
          {/*Add and Archive buttons*/}
          <div className="flex justify-between items-center">
            <AddUserButton />
            <button
              className={`flex mb-8 w-52 h-10 text-white justify-between items-center bg-gray-500 rounded-lg cursor-pointer select-none ${
                isArchivingEmployees
                  ? 'opacity-50 cursor-not-allowed'
                  : 'active:translate-y-2 active:[box-shadow:0_0px_0_0_#4B5563,0_0px_0_0_#4B556341] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#4B5563,0_15px_0_0_#4B556341] border-b-[1px] border-gray-400'
              }`}
              onClick={async () => {
                console.log('clicked');
                setIsArchivingEmployees(true);
                await axios.put(`http://localhost:5010/users/archive/employees`);
                window.location.reload();
                setIsArchivingEmployees(false);
              }}
            >
              <div className="flex items-center space-x-2 px-2">
                <SendToArchiveBoxIcon />
                <span>Archive All Employees</span>
              </div>
            </button>
          </div>
          {/*Table*/}
          <Table data={employeeData} headings={employeeHeadings} isLoading={isLoading} />
        </div>

        {/*Supervisors*/}
        <div className="ml-20 mr-2 mt-2 p-6 rounded-lg bg-gray-900">
          {/*Section Heading*/}
          <h1 className="mb-4 text-white text-2xl font-bold">Supervisors</h1>
          {/*Add and Archive buttons*/}
          <div className="flex justify-between items-center">
            <AddUserButton />
            <button
              className={`flex mb-8 w-56 h-10 text-white justify-between items-center bg-gray-500 rounded-lg cursor-pointer select-none ${
                isArchivingSupervisors
                  ? 'opacity-50 cursor-not-allowed'
                  : 'active:translate-y-2 active:[box-shadow:0_0px_0_0_#4B5563,0_0px_0_0_#4B556341] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#4B5563,0_15px_0_0_#4B556341] border-b-[1px] border-gray-400'
              }`}
              onClick={async () => {
                setIsArchivingSupervisors(true);
                await axios.put(`http://localhost:5010/users/archive/supervisors`);
                window.location.reload();
                setIsArchivingSupervisors(false);
              }}
            >
              <div className="flex items-center space-x-2 px-2">
                <SendToArchiveBoxIcon />
                <span>Archive All Supervisors</span>
              </div>
            </button>
          </div>
          {/*Table*/}
          <Table data={supervisorData} headings={supervisorHeadings} isLoading={isLoading} />
        </div>

        {/*Admins*/}
        <div className="ml-20 mr-2 mt-2 mb-2 p-6 rounded-lg bg-gray-900">
          {/*Section Heading*/}
          <h1 className="mb-4 text-white text-2xl font-bold">Admins</h1>
          {/*Add and Archive buttons*/}
          <div className="flex justify-between items-center">
            <AddUserButton />
          </div>
          {/*Table*/}
          <Table data={adminData} headings={adminHeadings} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
