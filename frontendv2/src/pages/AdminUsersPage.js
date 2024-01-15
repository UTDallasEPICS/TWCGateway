import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AdminUsersPage = () => {
  const [tableData, setTableData] = useState([]);

  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => [], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  useEffect(() => {
    axios.get(`http://localhost:5010/users/`)
      .then(response => {
        // handle the response
      });
  }, []);

  return (
    <div>
      <div className="flex">
        <Navbar />
      </div>

      <div className="flex-grow mt-2 mr-2 ml-20">
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;