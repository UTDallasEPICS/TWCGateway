import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import Table from '../components/Table';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

const AdminUsersPage = () => {
  useEffect(() => {
    axios.get(`http://localhost:5010/users/`).then(response => {
      console.log(response.data);
    });
  }, []);

  const headings = ['Name', 'Department', 'Role', 'Status', 'Edit', 'Delete'];
  const data = [
    {
      Company: 'Alfreds Futterkiste',
      Contact: 'Maria Anders',
      Country: 'Germany',
    },
    {
      Company: 'Centro comercial Moctezuma',
      Contact: 'Francisco Chang',
      Country: 'Mexico',
    },
  ];

  return (
    <div className="flex">
      <Navbar />

      <div className="flex-grow mt-2 mr-2 ml-20 bg-white">
        <Table data={data} headings={headings} />
      </div>
    </div>
  );
};

export default AdminUsersPage;
