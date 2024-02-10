import React, { useState } from 'react';
import TableRowSkeleton from '../TableRowSkeleton';
import UserTaskModal from '../UserTaskModal';
import axios from 'axios';
// import '../../styles/Table.css';

const Table = ({ data = [], headings = [], isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [userData, setUserData] = useState({});

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const getUserData = id => {
    axios
      .get(`http://localhost:5010/user/${id}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        axios
          .get(`http://localhost:5010/user/archived/${id}`)
          .then(response => {
            setUserData(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      });
  };

  const defaultRow = (
    <tr>
      {headings.map((heading, index) => (
        <td key={index} className="px-6 py-4 whitespace-normal">
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
              <td colSpan={headings.length} className="px-6 py-4 whitespace-normal">
                <TableRowSkeleton />
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
                onClick={() => {
                  if (row.Role === 'Employee') {
                    setRowData(row);
                    console.log('row.id', row.id)
                    getUserData(row.id);
                    setIsModalOpen(true);
                  }
                }}
              >
                {headings.map((heading, index) => (
                  <td key={index} className="px-6 py-4 whitespace-normal">
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
      <div className="flex flex-row items-center justify-center bg-gray-900">
        <button
          className={`button text-white mt-4 mb-4 ml-2 mr-5 w-20 h-8 rounded-lg cursor-pointer select-none transition-all duration-100 border-b-[1px] ${currentPage === 1 ? 'border-gray-400 bg-gray-500 pointer-events-none' : 'border-blue-400 bg-blue-500 active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]'}`}
          onClick={() => currentPage !== 1 && setCurrentPage(page => Math.max(page - 1, 1))}
        >
          Previous
        </button>

        {/* Page number */}
        <span className="mr-4 text-white text-gray-700 text-lg">
          Page {currentPage}/{maxPage}
        </span>

        <button
          className={`button text-white w-20 h-8 rounded-lg cursor-pointer select-none transition-all duration-100 border-b-[1px] ${currentPage === maxPage ? 'border-gray-400 bg-gray-500 pointer-events-none' : 'border-blue-400 bg-blue-500 active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]'}`}
          onClick={() => currentPage !== maxPage && setCurrentPage(page => {
            return maxPage > 0 ? Math.min(page + 1, maxPage) : page;
          })}
        >
          Next
        </button>
      </div>
      <UserTaskModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} row={rowData} userData={userData} />
    </div>
  );
};

export default Table;
