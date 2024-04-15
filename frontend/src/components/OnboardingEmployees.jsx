/* eslint-disable no-unused-vars */
import { Table, Checkbox } from '@mantine/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

OnboardingEmployees.propTypes = {
  selectedEmps: PropTypes.array.isRequired,
  setSelectedEmps: PropTypes.func.isRequired,
  reloadData: PropTypes.bool.isRequired,
  setReloadData: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
  archived: PropTypes.bool,
};

export default function OnboardingEmployees({
  selectedEmps,
  setSelectedEmps,
  reloadData,
  setReloadData,
  token,
  searchTerm,
  archived = false,
}) {
  const [emps, setEmps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmps = async () => {
      try {
        if (archived === false) {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllEmployees`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setEmps(response.data);
        } else if (archived === true) {
          const response = await axios.get(
            `${
              import.meta.env.VITE_APP_EXPRESS_BASE_URL
            }/getAllArchivedEmployees`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setEmps(response.data);
        }
      } catch (error) {
        console.error(
          'Errored in fetching onboarding employees in Users page',
          error
        );
      }
    };
    fetchEmps();
    setReloadData(false);
  }, [reloadData, setReloadData, token]);

  const handleSelectAll = (event) => {
    if (event.currentTarget.checked) {
      setSelectedEmps(emps.map((emp) => emp.id));
    } else {
      setSelectedEmps([]);
    }
  };

  const handleCellClick = (event, rowData) => {
    navigate(`/admin/onboarding-employee/${rowData.id}`)
  };

  console.log("emps", emps)
  const rows =
    emps.length > 0 ? (
      emps
        // .filter(
        //   emp =>
        //     emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        //     emp.DepartmentUserMapping.some(departmentUserMapping =>
        //       departmentUserMapping.department.name
        //         .toLowerCase()
        //         .includes(searchTerm.toLowerCase())
        //     )
        // )
        .map(emp => (
          <Table.Tr
            key={emp.id}
            bg={
              selectedEmps.includes(emp.id)
                ? 'var(--mantine-color-gray-5)'
                : undefined
            }
          >
            {console.log('emp', emp)}
            <Table.Td className="w-1/12">
              <Checkbox
                onChange={event =>
                  setSelectedEmps(
                    event.currentTarget.checked
                      ? [...selectedEmps, emp.id]
                      : selectedEmps.filter(id => id !== emp.id)
                  )
                }
                checked={selectedEmps.includes(emp.id)}
              />
            </Table.Td>
            <Table.Td
              className="hover:cursor-pointer hover:bg-purple-500 w-5/12"
              onClick={event => handleCellClick(event, emp)}
            >
              {emp.name}
            </Table.Td>
            <Table.Td className="w-6/12">
              {emp.DepartmentUserMapping.department.name}
            </Table.Td>
          </Table.Tr>
        ))
    ) : (
      <Table.Tr>
        <Table.Td colSpan={3} className="text-center">
          No employees found
        </Table.Td>
      </Table.Tr>
    );

  return (
    <div className="flex flex-col bg-white bg-opacity-50 border-white border-2 rounded-lg p-2 m-5">
      <div className="text-white font-bold font-mono text-2xl">
        Onboarding Employees
      </div>
      <div className="md:flex md:justify-center">
        <Table
          // horizontalSpacing=""
          withTableBorder
          withColumnBorders
          className="mt-4 bg-slate-100"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Checkbox
                  aria-label="Select all rows"
                  checked={selectedEmps.length === emps.length}
                  onChange={handleSelectAll}
                />
              </Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Department</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
