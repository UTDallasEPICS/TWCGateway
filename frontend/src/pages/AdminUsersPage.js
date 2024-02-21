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
import Button from '../components/Button';
import UsersIcon from '../icons/UsersIcon';
import Section from '../components/Section';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../styles/AdminUsersPage.css';

const SendToArchiveBoxButton = ({ userId, currUserId }) => {
  const [isArchiving, setIsArchiving] = useState(false);

  if (currUserId === userId) {
    return null;
  }

  return (
    <Button
      extraStyling="py-1 px-1"
      tooltip="Send to Archive"
      color="gray"
      onClick={async event => {
        event.stopPropagation();
        setIsArchiving(true);
        await axios.put(`http://localhost:5010/user/archive/${userId}`);
        window.location.reload();
        setIsArchiving(false);
      }}
    >
      <SendToArchiveBoxIcon />
    </Button>
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

  const employeeHeadings = ['Name', 'Department', 'Edit', 'Archive'];
  const supervisorHeadings = ['Name', 'Edit', 'Archive'];
  const adminHeadings = ['Name', 'Edit', 'Archive'];

  const employeeData = isLoading
    ? [{}]
    : employees
        .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(user => ({
          id: user.id,
          Name: user.name,
          Department: user.departmentName.join(', '),
          Role: user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase(),
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
          Role: user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase(),
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
          Role: user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase(),
          Status: '0/0',
          Edit: <EditUserModal user={user} />,
          Archive: <SendToArchiveBoxButton userId={user.id} currUserId={currUserId} />,
        }));

  return (
    document.title = 'TWCGateway | Users',
    <div className="flex">
      <Navbar />

      <div className="flex flex-col flex-grow">
        {/*Search Bar*/}
        <Section>
          <input
            className="w-full border-2 border-gray-300 focus:outline-none focus:border-warrenBlue rounded"
            type="text"
            placeholder=" Search Users"
            onFocus={e => e.target.select()}
            onChange={handleSearchTermChange}
          />
        </Section>

        {/*Onboarding Employees*/}
        {/* <div className="ml-20 mr-2 mt-2 p-6 rounded-lg bg-gray-900"> */}
        <Section>
          {/*Section Heading*/}
          <h1 className="mb-4 text-white text-2xl font-bold">Onboarding Employees</h1>
          {/*Add and Archive buttons*/}
          <div className="flex justify-between items-center">
            <AddUserButton userRole={'Employee'} />
            <Button
              extraStyling={'py-3 px-3 mb-1'}
              tooltip={'Archive All Onboarding Employees'}
              color={'gray'}
              onClick={() => {
                confirmAlert({
                  customUI: ({ onClose }) => {
                    return (
                      <div className='custom-ui'>
                        <h1 className="text-center">Confirm to archive all Onboarding Employees</h1>
                        <p>Are you sure you want to do this?</p>
                        <button onClick={onClose}>No</button>
                        <button
                          onClick={async () => {
                            console.log('clicked');
                            setIsArchivingEmployees(true);
                            await axios.put(`http://localhost:5010/users/archive/employees`);
                            window.location.reload();
                            setIsArchivingEmployees(false);
                            onClose();
                          }}
                        >
                          Yes
                        </button>
                      </div>
                    );
                  }
                });
              }}
            >
              <div className="flex items-center space-x-2 px-2">
                <SendToArchiveBoxIcon />
                <UsersIcon />
              </div>
            </Button>
          </div>
          {/*Table*/}
          <Table data={employeeData} headings={employeeHeadings} isLoading={isLoading} />
          {/* </div> */}
        </Section>

        {/*Supervisors*/}
        <Section>
          {/*Section Heading*/}
          <h1 className="mb-4 text-white text-2xl font-bold">Supervisors</h1>
          {/*Add and Archive buttons*/}
          <div className="flex justify-between items-center">
            <AddUserButton userRole={'Supervisor'} />
            <Button
              extraStyling={'py-3 px-3 mb-1'}
              tooltip={'Archive All Supervisors'}
              color={'gray'}
              onClick={() => {
                confirmAlert({
                  customUI: ({ onClose }) => {
                    return (
                      <div className='custom-ui'>
                        <h1 className="text-center">Confirm to archive all Supervisors</h1>
                        <p>Are you sure you want to do this?</p>
                        <button onClick={onClose}>No</button>
                        <button
                          onClick={async () => {
                            console.log('clicked');
                            setIsArchivingEmployees(true);
                            await axios.put(`http://localhost:5010/users/archive/employees`);
                            window.location.reload();
                            setIsArchivingEmployees(false);
                            onClose();
                          }}
                          
                        >
                          Yes
                        </button>
                      </div>
                    );
                  }
                });
              }}
            >
              <div className="flex items-center space-x-2 px-2">
                <SendToArchiveBoxIcon />
                <UsersIcon />
              </div>
            </Button>
          </div>
          {/*Table*/}
          <Table data={supervisorData} headings={supervisorHeadings} isLoading={isLoading} />
        </Section>

        {/*Admins*/}
        <Section>
          {/*Section Heading*/}
          <h1 className="mb-4 text-white text-2xl font-bold">Admins</h1>
          {/*Add and Archive buttons*/}
          <div className="flex justify-between items-center">
            <AddUserButton userRole={'Admin'} />
          </div>
          {/*Table*/}
          <Table data={adminData} headings={adminHeadings} isLoading={isLoading} />
        </Section>
      </div>
    </div>
  );
};

export default AdminUsersPage;
