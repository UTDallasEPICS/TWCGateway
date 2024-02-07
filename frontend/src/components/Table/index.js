import React, { useState } from 'react';
import TableRowSkeleton from '../TableRowSkeleton';
import UserTaskModal from '../UserTaskModal';
import axios from 'axios';

const Table = ({ data = [], headings = [], isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [userData, setUserData] = useState({});

  const getUserData = id => {
    axios
      .get(`http://localhost:5010/user/${id}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const defaultRow = (
    <tr>
      {headings.map((heading, index) => (
        <td key={index} className="px-6 py-4 whitespace-nowrap">
          N/A
        </td>
      ))}
    </tr>
  );

  return (
    <div className="rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headings.map((heading, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={headings.length} className="px-6 py-4 whitespace-nowrap">
                <TableRowSkeleton />
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
                onClick={() => {
                  if (row.Role === 'Employee') {
                    setRowData(row);
                    getUserData(row.id);
                    setIsModalOpen(true);
                  }
                }}
              >
                {headings.map((heading, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap">
                    {row[heading]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            defaultRow
          )}
        </tbody>
      </table>
      <UserTaskModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} row={rowData} userData={userData} />
    </div>
  );
};

export default Table;
