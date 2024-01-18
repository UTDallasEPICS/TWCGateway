import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-balham.css"; 

const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: 'Name' },
    { field: 'Department' },
    { field: 'Role' },
    { field: 'Status' },
    { field: 'Edit'},
    { field: 'Delete'}
  ]);

  return (
    // Container with theme & dimensions
    <div className="ag-theme-balham" style={{ height: 735 }}>
      {/* The AG Grid component */}
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
};

const AdminUsersPage = () => {
  useEffect(() => {
    axios.get(`http://localhost:5010/users/`).then(response => {
      // handle the response
    });
  }, []);

  return (
    <div className="flex">
      <Navbar />

      <div className="flex-grow mt-2 mr-2 ml-20">
        <GridExample />
      </div>
    </div>
  );
};

export default AdminUsersPage;
