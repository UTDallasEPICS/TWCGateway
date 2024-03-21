import * as React from 'react';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import AddUserButton from '../components/AddNewUser';
import axios from 'axios';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useRowSelect } from '@table-library/react-table-library/select';
import DeleteUser from '../components/DeleteUser';
import EditEmployee from '../components/EditEmployee';
import { Table } from '../components/Table';
// import { Table } from '@mantine/core';

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
