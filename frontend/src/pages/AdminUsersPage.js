// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import SendToArchiveBoxIcon from '../icons/SendToArchiveBoxIcon';
// // import Table from '../components/Table';
// import EditUserModal from '../components/EditUserModal';
// import AddUserButton from '../components/AddNewUser';
// import AddUserIcon from '../icons/AddUserIcon';
// import Divider from '../components/Divider';
// import Cookies from 'js-cookie';
// import Button from '../components/Button';
// import UsersIcon from '../icons/UsersIcon';
// import Section from '../components/Section';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import '../styles/AdminUsersPage.css';
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableFooter,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableCaption,
// } from '../components/Table';

// const SendToArchiveBoxButton = ({ userId, currUserId }) => {
//   const [isArchiving, setIsArchiving] = useState(false);

//   if (currUserId === userId) {
//     return null;
//   }

//   return (
//     <Button
//       extraStyling="py-1 px-1"
//       tooltip="Send to Archive"
//       color="gray"
//       onClick={async event => {
//         event.stopPropagation();
//         setIsArchiving(true);
//         await axios.put(`http://localhost:5010/user/archive/${userId}`);
//         window.location.reload();
//         setIsArchiving(false);
//       }}
//     >
//       <SendToArchiveBoxIcon />
//     </Button>
//   );
// };

// const AdminUsersPage = () => {
//   const [currUserId, setCurrUserId] = useState('');
//   const [employees, setEmployees] = useState([]);
//   const [supervisors, setSupervisors] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isArchivingEmployees, setIsArchivingEmployees] = useState(false);
//   const [isArchivingSupervisors, setIsArchivingSupervisors] = useState(false);
//   const [isButtonOpen, setIsButtonOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     axios.post(`http://localhost:5010/checkEmail/`, { email: Cookies.get('email') }).then(response => {
//       setCurrUserId(response.data.id);
//     });
//     axios.get(`http://localhost:5010/users/employees`).then(response => {
//       setEmployees(response.data);
//       setIsLoading(false);
//     });
//     axios.get(`http://localhost:5010/users/supervisors`).then(response => {
//       setSupervisors(response.data);
//       setIsLoading(false);
//     });
//     axios.get(`http://localhost:5010/users/admins`).then(response => {
//       setAdmins(response.data);
//       setIsLoading(false);
//     });
//   }, []);

//   const handleSearchTermChange = event => {
//     setSearchTerm(event.target.value);
//   };

//   const employeeHeadings = ['Name', 'Department', 'Edit', 'Archive'];
//   const supervisorHeadings = ['Name', 'Edit', 'Archive'];
//   const adminHeadings = ['Name', 'Edit', 'Archive'];

//   const employeeData = isLoading
//     ? [{}]
//     : employees
//         .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
//         .map(user => ({
//           id: user.id,
//           Name: user.name,
//           Department: user.departmentName.join(', '),
//           Role: user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase(),
//           Status: '0/0',
//           Edit: <EditUserModal user={user} />,
//           Archive: <SendToArchiveBoxButton userId={user.id} currUserId={currUserId} />,
//         }));

//   const supervisorData = isLoading
//     ? [{}]
//     : supervisors
//         .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
//         .map(user => ({
//           id: user.id,
//           Name: user.name,
//           Department: user.departmentName.join(', '),
//           Role: user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase(),
//           Status: '0/0',
//           Edit: <EditUserModal user={user} />,
//           Archive: <SendToArchiveBoxButton userId={user.id} currUserId={currUserId} />,
//         }));

//   const adminData = isLoading
//     ? [{}]
//     : admins
//         .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
//         .map(user => ({
//           id: user.id,
//           Name: user.name,
//           Department: user.departmentName.join(', '),
//           Role: user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase(),
//           Status: '0/0',
//           Edit: <EditUserModal user={user} />,
//           Archive: <SendToArchiveBoxButton userId={user.id} currUserId={currUserId} />,
//         }));

//   return (
//     document.title = 'TWCGateway | Users',
//     <div className="flex">
//       <Navbar />

//       <div className="flex flex-col flex-grow">
//         {/*Search Bar*/}
//         <Section extraStyling="">
//           <input
//             className="w-full border-2 border-gray-300 focus:outline-none focus:border-warrenBlue rounded"
//             type="text"
//             placeholder=" Search Users"
//             onFocus={e => e.target.select()}
//             onChange={handleSearchTermChange}
//           />
//         </Section>

//         {/*Onboarding Employees*/}
//         {/* <div className="ml-20 mr-2 mt-2 p-6 rounded-lg bg-gray-900"> */}
//         <Section title="Onboarding Employees">
//           {/*Section Heading*/}
//           {/*Add and Archive buttons*/}
//           <div className="flex justify-between items-center">
//             <AddUserButton userRole={'Employee'} />
//             <Button
//               extraStyling={'py-3 px-3 mb-1'}
//               tooltip={'Archive All Onboarding Employees'}
//               color={'gray'}
//               onClick={() => {
//                 confirmAlert({
//                   customUI: ({ onClose }) => {
//                     return (
//                       <div className='custom-ui'>
//                         <h1 className="text-center">Confirm to archive all Onboarding Employees</h1>
//                         <p>Are you sure you want to do this?</p>
//                         <button onClick={onClose}>No</button>
//                         <button
//                           onClick={async () => {
//                             console.log('clicked');
//                             setIsArchivingEmployees(true);
//                             await axios.put(`http://localhost:5010/users/archive/employees`);
//                             window.location.reload();
//                             setIsArchivingEmployees(false);
//                             onClose();
//                           }}
//                         >
//                           Yes
//                         </button>
//                       </div>
//                     );
//                   }
//                 });
//               }}
//             >
//               <div className="flex items-center space-x-2 px-2">
//                 <SendToArchiveBoxIcon />
//                 <UsersIcon />
//               </div>
//             </Button>
//           </div>
//           {/*Table*/}
//           <Table className="bg-white bg-opacity-50 rounded-lg">
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Department</TableHead>
//                 <TableHead>Edit</TableHead>
//                 <TableHead>Archive</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {employeeData.map((employee, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{employee.Name}</TableCell>
//                   <TableCell>{employee.Department}</TableCell>
//                   <TableCell>{employee.Edit}</TableCell>
//                   <TableCell>{employee.Archive}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Section>

//         {/*Supervisors*/}
//         <Section title="Supervisors">
//           {/*Section Heading*/}
//           {/* <h1 className="mb-4 text-white text-2xl font-bold">Supervisors</h1> */}
//           {/*Add and Archive buttons*/}
//           <div className="flex justify-between items-center">
//             <AddUserButton userRole={'Supervisor'} />
//             <Button
//               extraStyling={'py-3 px-3 mb-1'}
//               tooltip={'Archive All Supervisors'}
//               color={'gray'}
//               onClick={() => {
//                 confirmAlert({
//                   customUI: ({ onClose }) => {
//                     return (
//                       <div className='custom-ui'>
//                         <h1 className="text-center">Confirm to archive all Supervisors</h1>
//                         <p>Are you sure you want to do this?</p>
//                         <button onClick={onClose}>No</button>
//                         <button
//                           onClick={async () => {
//                             console.log('clicked');
//                             setIsArchivingEmployees(true);
//                             await axios.put(`http://localhost:5010/users/archive/employees`);
//                             window.location.reload();
//                             setIsArchivingEmployees(false);
//                             onClose();
//                           }}

//                         >
//                           Yes
//                         </button>
//                       </div>
//                     );
//                   }
//                 });
//               }}
//             >
//               <div className="flex items-center space-x-2 px-2">
//                 <SendToArchiveBoxIcon />
//                 <UsersIcon />
//               </div>
//             </Button>
//           </div>
//           {/*Table*/}
//           {/* <Table data={supervisorData} headings={supervisorHeadings} isLoading={isLoading} /> */}
//           <Table
//             className="bg-white bg-opacity-50 rounded-lg"
//           >
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Edit</TableHead>
//                 <TableHead>Archive</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {supervisorData.map((supervisor, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{supervisor.Name}</TableCell>
//                   <TableCell>{supervisor.Edit}</TableCell>
//                   <TableCell>{supervisor.Archive}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Section>

//         {/*Admins*/}
//         <Section title="Admins">
//           {/*Section Heading*/}
//           {/*Add and Archive buttons*/}
//           <div className="flex justify-between items-center">
//             <AddUserButton userRole={'Admin'} />
//           </div>
//           {/*Table*/}
//           {/* <Table data={adminData} headings={adminHeadings} isLoading={isLoading} /> */}
//           <Table
//             className="bg-white bg-opacity-50 rounded-lg"
//           >
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Edit</TableHead>
//                 <TableHead>Archive</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {adminData.map((admin, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{admin.Name}</TableCell>
//                   <TableCell>{admin.Edit}</TableCell>
//                   <TableCell>{admin.Archive}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Section>
//       </div>
//     </div>
//   );
// };

// export default AdminUsersPage;

import * as React from 'react';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import AddUserButton from '../components/AddNewUser';
import ArchiveBoxIcon from '../icons/ArchiveBoxIcon';
import axios from 'axios';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useRowSelect } from '@table-library/react-table-library/select';
import DeleteUser from '../components/DeleteUser';
import EditEmployee from '../components/EditEmployee';
import { Table } from '../components/Table';

const AdminUsersPage = () => {
  const [employees, setEmployees] = React.useState([]);
  const [supervisors, setSupervisors] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [employeesSelected, setEmployeesSelected] = React.useState([]);
  const [supervisorsSelected, setSupervisorsSelected] = React.useState([]);
  const [adminsSelected, setAdminsSelected] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);

  const theme = useTheme(getTheme());

  const employeeData = { nodes: employees };
  const supervisorData = { nodes: supervisors };
  const adminData = { nodes: admins };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredSupervisors = supervisors.filter(supervisor =>
    supervisor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const employeesSelect = useRowSelect(employeeData, {
    onChange: onEmployeesSelectChange,
  });
  const supervisorsSelect = useRowSelect(supervisorData, {
    onChange: onSupervisorsSelectChange,
  });
  const adminsSelect = useRowSelect(adminData, {
    onChange: onAdminsSelectChange,
  });

  function onEmployeesSelectChange(action, state) {
    setEmployeesSelected(state);
  }
  function onSupervisorsSelectChange(action, state) {
    setSupervisorsSelected(state);
  }
  function onAdminsSelectChange(action, state) {
    setAdminsSelected(state);
  }
  const employeeColumns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Department',
      id: 'departmentName',
      accessor: item => item.departmentName.join(', '),
    },
  ];
  const supervisorColumns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
  ];

  const adminColumns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
  ];

  const allSelectedUsers = [
    ...employeesSelected,
    ...supervisorsSelected,
    ...adminsSelected,
  ];

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleRowSelectEmployee = (rowId, isSelected) => {
    setSelectedRows(prevSelectedRows => {
      if (isSelected) {
        return [...prevSelectedRows, rowId];
      }
      return prevSelectedRows.filter(id => id !== rowId);
    })
    console.log("selectedRows", selectedRows)
  }


  React.useEffect(() => {
    console.log("allSelectedUsers", allSelectedUsers)
    axios
      .get('http://localhost:5010/users/employees')
      .then(res => {
        setEmployees(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get('http://localhost:5010/users/supervisors')
      .then(res => {
        setSupervisors(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get('http://localhost:5010/users/admins')
      .then(res => {
        setAdmins(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <Section extraStyling="sticky top-2 z-10 ">
          <div className="flex items-center">
            <div>
              <AddUserButton />
            </div>
            <div className="flex-grow flex justify-center">
              <input
                className="w-5/6 text-center border-2 border-gray-300 focus:outline-none focus:border-warrenBlue rounded"
                type="text"
                placeholder="Search Users"
                onChange={handleSearch}
              />
            </div>
            <div>
              <DeleteUser users={allSelectedUsers} />
            </div>
          </div>
        </Section>
        <Section title="Onboarding Employees" editButton={<EditEmployee />}>
          {/* <CompactTable columns={employeeColumns} data={employeeData} theme={theme} select={employeesSelect} /> */}
          <Table
            columns={employeeColumns}
            data={filteredEmployees}
            onRowSelect={handleRowSelectEmployee}
          />
        </Section>
        <Section title="Supervisors">
          {/* <CompactTable columns={supervisorColumns} data={supervisorData} theme={theme} select={supervisorsSelect} /> */}
          <Table
            columns={supervisorColumns}
            data={filteredSupervisors}
            setSelectedUserIds={setSupervisorsSelected}
          />
        </Section>
        <Section title="Admins">
          {/* <CompactTable columns={adminColumns} data={adminData} theme={theme} select={adminsSelect} /> */}
          <Table
            columns={adminColumns}
            data={filteredAdmins}
            setSelectedUserIds={setAdminsSelected}
          />
        </Section>
      </div>
    </div>
  );
};

export default AdminUsersPage;
