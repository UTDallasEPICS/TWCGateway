import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Text, Button } from '@mantine/core';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState([]);
  const navigate = useNavigate();

  // Dummy data for employees and devices
  useEffect(() => {
    const dummyData = [
      {
        id: '1',
        employeeName: 'John Doe',
        department: 'Department 1',
        status: 'Checked Out',
        location: 'Irving Office',
        deviceMake: 'Dell',
        deviceModel: 'Model 1',
        serialNumber: 'ABC12345',
        checkoutDate: '2024-09-10',
      },
      {
        id: '2',
        employeeName: 'Jane Doe',
        department: 'Department 2',
        status: 'Checked In',
        location: 'Richardson',
        deviceMake: 'Apple',
        deviceModel: 'MacBook',
        serialNumber: '123tfa',
        checkoutDate: '2024-09-15',
      },
    ];
    setInventory(dummyData);
  }, []);

  const toggleRow = (id) => {
    setSelectedInventory((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const rows = inventory.length > 0 ? (
    inventory.map((item) => {
      const selected = selectedInventory.includes(item.id);

      return (
        <Table.Tr
          key={item.id}
          style={{
            backgroundColor: selected ? 'var(--mantine-color-gray-5)' : 'transparent',
          }}
        >
          <Table.Td>
            <Checkbox
              aria-label="Select row"
              onChange={() => toggleRow(item.id)}
              checked={selected}
            />
          </Table.Td>
          <Table.Td>{item.employeeName}</Table.Td>
          <Table.Td>{item.department}</Table.Td>
          <Table.Td>{item.status}</Table.Td>
          <Table.Td>{item.location}</Table.Td>
          <Table.Td>{`${item.deviceMake} ${item.deviceModel}`}</Table.Td>
          <Table.Td>{item.serialNumber}</Table.Td>
          <Table.Td>{item.checkoutDate}</Table.Td>
        </Table.Tr>
      );
    })
  ) : (
    <Table.Tr>
      <Table.Td colSpan={8} className="text-center">
        No Data Found
      </Table.Td>
    </Table.Tr>
  );

  return (
    <div>
      <Navbar />
      <div className="flex flex-col bg-white bg-opacity-100 border-white border-2 rounded-lg p-2 m-5 overflow-x-auto">
        <div className="font-bold font-mono text-2xl">Inventory</div>
        <div className="md:flex md:justify-center">
          <Table withTableBorder withColumnBorders className="mt-4 bg-gray-100">
            <Table.Thead>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>Employee Name</Table.Th>
                <Table.Th>Department</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Device Make/Model</Table.Th>
                <Table.Th>Serial Number</Table.Th>
                <Table.Th>Checkout Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
        <div className="flex justify-left mt-4">
          <Button variant="filled" color="green" onClick={() => {navigate('/admin/register-device')}}>
            Register new device
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
