import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Checkbox } from '@mantine/core';
import SearchBar from '../../components/SearchBar';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllDepartments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDepartments(response.data);
        console.log('departments', response.data);
      } catch (error) {
        console.error(
          'Error in fetching departments in Departments page',
          error
        );
      }
    };
    getDepartments();
    console.log('selectedRows', selectedRows);
  }, [selectedRows]);

  const handleRowSelect = departmentId => {
    setSelectedRows(prevState => {
      if (prevState.includes(departmentId)) {
        return prevState.filter(id => id !== departmentId);
      } else {
        return [...prevState, departmentId];
      }
    });
  };

  const handleAllRowSelect = () => {
    if (selectedRows.length === departments.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(departments.map(department => department.id));
    }
  };

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="flex justify-center bg-white bg-opacity-50 border-2 border-gray-100 p-2 m-5 rounded-lg">
        <div className="w-1/2">
          <Table withTableBorder withColumnBorders className="bg-slate-100">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Checkbox
                    checked={selectedRows.length === departments.length}
                    onChange={handleAllRowSelect}
                  />
                </Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Users</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredDepartments.map(department => (
                <Table.Tr key={department.id}>
                  <Table.Td className="w-1/12">
                    <Checkbox
                      checked={selectedRows.includes(department.id)}
                      onChange={() => handleRowSelect(department.id)}
                    />
                  </Table.Td>
                  <Table.Td>{department.name}</Table.Td>
                  <Table.Td>{department.DepartmentUserMapping.length}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
