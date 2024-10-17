import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Text, Button } from '@mantine/core';
import Navbar from '../../components/Navbar';
import Popup from '../../components/Popup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisterDevice from '../../components/RegisterDevice';

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;


  // fetch data from the backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllDevices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        if (response.status === 200) {
          const devices = response.data; 
          setInventory(devices);
          console.log(inventory[0]);
        } else {
          console.log('No devices found.');
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
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
          { item.checkout.length === 1 ? (<Table.Td>{item.checkout[0].user.name}</Table.Td>) : (<Table.Td></Table.Td>)}
          <Table.Td>{item.department.name}</Table.Td>
          { item.checkout.length === 1 ? (<Table.Td>Checked out</Table.Td>) : (<Table.Td>Checked in</Table.Td>)}
          { item.checkout.length === 1 ? (<Table.Td>{item.location.locationName}</Table.Td>) : (<Table.Td></Table.Td>)}
          <Table.Td>{item.name}</Table.Td>
          <Table.Td>{item.serialNumber}</Table.Td>
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
      <div className="flex justify-between items-center">
        <div className="font-bold font-mono text-2xl">Inventory</div> 
        <Button variant="filled" color="green" onClick={() => setTrigger(true)}>
            Register new device
        </Button>
        <Popup trigger={trigger} setTrigger={setTrigger}>
          <RegisterDevice />
        </Popup>
        </div>
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
      </div>
    </div>
  );
}

export default InventoryPage;
 