import { Table, Checkbox } from '@mantine/core';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import PropTypes from 'prop-types';

Admins.propTypes = {
  selectedAdms: PropTypes.array,
  setSelectedAdms: PropTypes.func,
  reloadData: PropTypes.bool.isRequired,
  setReloadData: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
  archived: PropTypes.bool,
};

export default function Admins({
  selectedAdms,
  setSelectedAdms,
  reloadData,
  setReloadData,
  token,
  searchTerm,
  archived = false,
}) {
  const [adms, setAdms] = useState([]);
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    const fetchAdms = async () => {
      try {
        if (archived === false) {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllAdmins`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAdms(response.data);
        } else if (archived === true) {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllArchivedAdmins`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAdms(response.data);
        }
      } catch (error) {
        console.error('fetch users error', error);
      }
    };
    fetchAdms();
    setReloadData(false);
  }, [reloadData, setReloadData, token]);

  // const filteredAdms =
  //   adms.message !== 'No Employee Found or all Employees Archived' &&
  //   adms.filter(adm =>
  //     adm.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  const rows =
    // filteredAdms.length > 0 ? (
    adms.length > 0 ? (
      // filteredAdms
      adms
        .filter(adm =>
          adm.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(adm => (
          <Table.Tr
            key={adm.id}
            bg={
              selectedAdms.includes(adm.id)
                ? 'var(--mantine-color-gray-5)'
                : undefined
            }
          >
            <Table.Td className="w-1/12">
              {adm.email !== decodedToken.email && (
                <Checkbox
                  aria-label="Select row"
                  onChange={event =>
                    setSelectedAdms(
                      event.currentTarget.checked
                        ? [...selectedAdms, adm.id]
                        : selectedAdms.filter(id => id !== adm.id)
                    )
                  }
                  checked={selectedAdms.includes(adm.id)}
                />
              )}
              {/* {(
                <Checkbox
                  aria-label="Select row"
                  checked={selectedRows.includes(adm.id)}
                  onChange={(event) =>
                    setSelectedRows(
                      event.currentTarget.checked
                        ? [...selectedRows, adm.id]
                        : selectedRows.filter((id) => id !== adm.id)
                    )
                  }
                  className="hover:cursor-pointer"
                />
              )} */}
            </Table.Td>
            <Table.Td>{adm.name}</Table.Td>
          </Table.Tr>
        ))
    ) : (
      <Table.Tr>
        <Table.Td colSpan={2} className="text-center">
          No Admins Found
        </Table.Td>
      </Table.Tr>
    );

  return (
    <div className="flex flex-col bg-white bg-opacity-100 border-white border-2 rounded-lg p-2 m-5 overflow-x-auto">
      <div className="font-bold font-mono text-2xl">Admins</div>
      <div className="md:flex md:justify-center">
        <Table withTableBorder withColumnBorders className="mt-4 bg-gray-100">
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Name</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
