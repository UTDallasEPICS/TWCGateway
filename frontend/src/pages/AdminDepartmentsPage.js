import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Table from '../components/Table';
import Section from '../components/Section';
import TableRowSkeleton from '../components/TableRowSkeleton';
import { useReactTable } from '@tanstack/react-table'

const AdminDepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5010/departments').then(response => {
      setDepartments(response.data);
    });
    setIsLoading(false);
  }, []);

  const data = React.useMemo(() => departments, [departments]);
  const columns = React.useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name', // replace 'name' with the actual property name in your data
    },
    {
      Header: 'Edit Name',
      accessor: 'editName', // replace 'editName' with the actual property name in your data
    },
    {
      Header: 'Archive',
      accessor: 'archive', // replace 'archive' with the actual property name in your data
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useReactTable({ columns, data });

  return (
    (document.title = 'TWCGateway | Departments'),
    (
      <div>
        <div className="flex">
          <Navbar />
        </div>
        <Section title={'Departments'}>
          <div style={{ overflowX: 'auto' }}>
            {/* <Table data={departments} headings={tableHeading} isLoading={isLoading} /> */}
          </div>
        </Section>
      </div>
    )
  );
};

export default AdminDepartmentsPage;
