import { Table, Checkbox } from '@mantine/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

Supervisors.propTypes = {
  selectedSups: PropTypes.array.isRequired,
  setSelectedSups: PropTypes.func.isRequired,
  reloadData: PropTypes.bool.isRequired,
  setReloadData: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
  archived: PropTypes.bool,
};

export default function Supervisors({
  selectedSups,
  setSelectedSups,
  reloadData,
  setReloadData,
  token,
  searchTerm,
  archived = false,
}) {
  const [sups, setSups] = useState([]);

  useEffect(() => {
    const fetchSups = async () => {
      try {
        if (archived === false) {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllSupervisors`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSups(response.data);
        } else if (archived === true) {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllArchivedSupervisors`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSups(response.data);
        }
      } catch (error) {
        console.error('fetch users error', error);
      }
    };
    fetchSups();
    setReloadData(false);
  }, [reloadData, setReloadData, token]);

  const handleSelectAll = (event) => {
    if (event.currentTarget.checked) {
      setSelectedSups(sups.map((sup) => sup.id));
    } else {
      setSelectedSups([]);
    }
  };

  const rows =
    sups.length > 0 ? (
      sups
        .filter((sup) =>
          sup.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((sup) => (
          <Table.Tr
            key={sup.id}
            bg={
              selectedSups.includes(sup.id)
                ? 'var(--mantine-color-gray-5)'
                : undefined
            }
          >
            <Table.Td className="w-1/12">
              <Checkbox
                aria-label="Select row"
                onChange={(event) =>
                  setSelectedSups(
                    event.currentTarget.checked
                      ? [...selectedSups, sup.id]
                      : selectedSups.filter((id) => id !== sup.id)
                  )
                }
                checked={selectedSups.includes(sup.id)}
              />
            </Table.Td>
            <Table.Td className="hover:cursor-pointer hover:bg-purple-500">
              {sup.name}
            </Table.Td>
          </Table.Tr>
        ))
    ) : (
      <Table.Tr>
        <Table.Td
          colSpan={2}
          className="text-center"
        >
          No supervisors found
        </Table.Td>
      </Table.Tr>
    );

  return (
    <div className="flex flex-col bg-white bg-opacity-50 border-white border-2 rounded-lg p-2 m-5">
      <div className="text-white font-bold font-mono text-2xl">Supervisors</div>
      <div className="md:flex md:justify-center">
        <Table
          withTableBorder
          withColumnBorders
          className="mt-4 bg-slate-100"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Checkbox
                  aria-label="Select all rows"
                  checked={selectedSups.length === sups.length}
                  onChange={handleSelectAll}
                />
              </Table.Th>
              <Table.Th>Name</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
