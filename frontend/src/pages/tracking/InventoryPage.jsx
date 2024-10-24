//cook here
import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Text, Button } from '@mantine/core';
import Navbar from '../../components/Navbar';
import Popup from '../../components/Popup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisterDevice from '../../components/RegisterDevice';
import Cookies from 'js-cookie'; 


function InventoryPage() {
  const [search, setSearch] = useState('')
  //debugging 
  console.log(search)
  const [inventory, setInventory] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;

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
    inventory.filter((item) => {
      return  search.toLowerCase() === ''? true: item.checkout[0].user.name.toLowerCase().includes(search.toLowerCase())
      || item.department.name.toLowerCase().includes(search.toLowerCase())
      || item.location.locationName.toLowerCase().includes(search.toLowerCase())
      || item.serialNumber.toLowerCase().includes(search.toLowerCase())
      || `${item.deviceMake} ${item.deviceModel}`.toLowerCase().includes(search.toLowerCase())
    }).
map((item) => {
      const selected = selectedInventory.includes(item.id);
      const changeStatus = (id) => {
        setInventory((prevInventory) =>
          prevInventory.map((item) =>
            item.id === id
              ? { ...item, status: item.status === 'Checked In' ? 'Checked Out' : 'Checked In' }
              : item
          )
        );
      };
        //might need to get rid of checkbox feature 
      return (
        <tr
          key={item.id}
          style={{
            backgroundColor: selected ? '#E0E8F9' : '#F9FAFB',
          }}
        >
          <td style={{ padding: '10px' }}>
            <Checkbox
              aria-label="Select row"
              onChange={() => toggleRow(item.id)}
              checked={selected}
            />
          </td>
          { item.checkout.length === 1 ? (<Table.Td>{item.checkout[0].user.name}</Table.Td>) : (<Table.Td></Table.Td>)}
          { item.checkout.length === 1 ? (<Table.Td>{item.department.name}</Table.Td>) : (<Table.Td></Table.Td>)}
          { item.checkout.length === 1 ? (<Table.Td> <Button
              variant={item.status === 'Checked In' ? 'filled' : 'outline'}
              color={item.status === 'Checked In' ? 'blue' : 'gray'}
              size="xs"
              onClick={() => {
                changeStatus(item.id)
              }}
            >
              {item.status}
            </Button></Table.Td>) : (<Table.Td>Checked in</Table.Td>)}
            { item.checkout.length === 1 ? (<Table.Td>{item.location.locationName}</Table.Td>) : (<Table.Td></Table.Td>)}
          <Table.Td>{item.name}</Table.Td>
          <Table.Td style={{ color: 'black' }}>{item.serialNumber}</Table.Td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan={8} style={{ textAlign: 'center' }}>
        No Data Found
      </td>
    </tr>
  );
//go to the change status button add functionality it pulls input from all rows and changes all the statuses
//might just need to remove checkboxes
  return (
    <div>
      <Navbar />
      <div className="flex flex-col bg-white bg-opacity-100 border-white border-2 rounded-lg p-2 m-5 overflow-x-auto">
        <div className="flex justify-between items-center">
          <Text size="xl" weight={700}>
            Inventory
          </Text>
            <input type="search" id="query" name="q" placeholder="Search to filter...." aria-label="Search through site content" style = {{ display: 'flex',
          alignItems: 'center',  width: '400px',
          padding: '10px 20px', borderRadius: '50px',   border: '2px solid #ccc',  backgroundColor: 'white'}} onChange={(e) => setSearch(e.target.value)}/>
          <Button
            variant="filled"
            color="green"
            onClick={() => setTrigger(true)}
          >
            Register new device
          </Button>
          <Popup trigger={trigger} setTrigger={setTrigger}>
          <RegisterDevice />
        </Popup>
        </div>
        <div className="md:flex md:justify-center">
          <Table withTableBorder withColumnBorders className="mt-4 bg-gray-100">
            <thead>
              <tr>
                <th style={{ padding: '10px 20px' }}></th>
                <th style={{ padding: '10px 20px' }}>Employee Name</th>
                <th style={{ padding: '10px 20px' }}>Department</th>
                <th style={{ padding: '10px 20px' }}>Status</th>
                <th style={{ padding: '10px 20px' }}>Location</th>
                <th style={{ padding: '10px 20px' }}>Device Make/Model</th>
                <th style={{ padding: '10px 20px', color: 'red' }}>Serial Number</th>
                <th style={{ padding: '10px 20px' }}>Checkout Date</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
