import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Text, Button } from '@mantine/core';
import Navbar from '../../components/Navbar';
import Popup from '../../components/Popup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisterDevice from '../../components/RegisterDevice';
import Checkout from '../../components/Checkout';
import Checkin from '../../components/Checkin';
import Cookies from 'js-cookie'; 
import * as XLSX from 'xlsx'; 


function InventoryPage() {
  const [search, setSearch] = useState('')
  const [inventory, setInventory] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState([]);
  const [registerTrigger, setRegisterTrigger] = useState(false);
  const [checkoutTrigger, setCheckoutTrigger] = useState(false);
  const [checkinTrigger, setCheckinTrigger] = useState(false);
  const [selectedSerialNumber, setSelectedSerialNumber] = useState(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [refresh, setRefresh] = useState(0)
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
          const updatedInventory = devices.map((item) => ({
            ...item, // Spread the existing properties of the item
            status: (item.checkout.length === 0 || item.checkout.archived === true) ? 'Checked In' : 'Checked Out', 
          }));
        
          setInventory(updatedInventory); 
          console.log('========================')
          console.log(inventory);
        } else {
          console.log('No devices found.');
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, [refresh]);

  const exportToSpreadsheet = () => {
    // Create a new array for the spreadsheet
    const dataToExport = inventory.map(item => ({
      'Employee Name': item.checkout[0]?.user?.name || ' ',
      'Department Name': item.department?.name || ' ',
      'Status': item.status,
      'Location Name': item.location?.locationName || ' ',
      'Device Make/Model': item.name,
      'Serial Number': item.serialNumber,
      'Cost': item.cost,
      'Checkout Date': item.checkout[0]?.checkoutDate,
    }));
    // Create a new workbook and add a sheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory Data');

    // Generate a download
    XLSX.writeFile(workbook, 'inventory_data.xlsx');
  };

  const handleCheckout = (serialNumber) => {
    setCheckoutTrigger(true);
    setSelectedSerialNumber(serialNumber)
  }
  const handleCheckin = (serialNumber, deviceId) => {
    setCheckinTrigger(true);
    setSelectedSerialNumber(serialNumber)
    setSelectedDeviceId(deviceId)
  }
  

  const toggleRow = (id) => {
    setSelectedInventory((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const rows = inventory.length > 0 ? (
    inventory.filter((item) => {
      return  search.toLowerCase() === '' ? true : item.status.toLowerCase().includes(search.toLowerCase())
      || item.department.name.toLowerCase().includes(search.toLowerCase())
      || item.name.toLowerCase().includes(search.toLowerCase())
      || item.cost.toString().toLowerCase().includes(search.toLowerCase())
      || item.location.locationName.toLowerCase().includes(search.toLowerCase())
      || item.serialNumber.toLowerCase().includes(search.toLowerCase())
      ||  item.checkout[0]?.user?.name.toLowerCase().includes(search.toLowerCase())
      || item.checkout[0]?.checkoutDate?.toString().toLowerCase().includes(search.toLowerCase())    
    }).
      
      
map((item) => {
      const selected = selectedInventory.includes(item.id);
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
          {item.checkout.length === 1 ? (
            <Table.Td>{item.checkout[0].user.name}</Table.Td>
          ) : (
            <Table.Td>------</Table.Td>
          )}
          {/* {item.checkout.length === 1 ? (
            <Table.Td>{item.department.name}</Table.Td>
          ) : (
            <Table.Td>------</Table.Td>
          )} */}
          <Table.Td>{item.department.name}</Table.Td>
          <Table.Td>
            <Button
              variant={item.checkout.length === 1 ? 'outline' : 'filled'}
              color={item.checkout.length === 1 ? 'gray' : 'blue'}
              size="xs"
              onClick={() => {
                item.checkout.length === 1
                  ? handleCheckin(item.serialNumber, item.id)
                  : handleCheckout(item.serialNumber);
              }}
            >
              {item.checkout.length === 1 ? 'Checked Out' : 'Checked In'}
            </Button>
          </Table.Td>
          {/* {item.checkout.length === 1 ? (
            <Table.Td>{item.location.locationName}</Table.Td>
          ) : (
            <Table.Td>------</Table.Td>
          )} */}
          <Table.Td>{item.location.locationName}</Table.Td>
          <Table.Td>{item.name}</Table.Td>
          <Table.Td style={{ color: 'black' }}>{item.serialNumber}</Table.Td>
          <Table.Td style={{ color: 'black' }}>{item.cost}</Table.Td>
          {item.checkout.length === 1 ? (
            <Table.Td>{item.checkout[0].checkoutDate}</Table.Td>
          ) : (
            <Table.Td>------</Table.Td>
          )}
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

  return (
    <div>
      <Navbar />
      <div className="flex flex-col bg-white bg-opacity-100 border-white border-2 rounded-lg p-2 m-5 overflow-x-auto">
        <div className="flex justify-between items-center">
          <Text size="xl" weight={700}>
            Inventory
          </Text>
          <input
            type="search"
            id="query"
            name="q"
            placeholder="Search to filter...."
            aria-label="Search through site content"
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '400px',
              padding: '10px 20px',
              borderRadius: '50px',
              border: '2px solid #ccc',
              backgroundColor: 'white',
            }}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex space-x-2">
            <Button
              variant="filled"
              color="green"
              onClick={() => setRegisterTrigger(true)}
            >
              Register new device
            </Button>
            <Button variant="filled" color="blue" onClick={exportToSpreadsheet}>
              Export to Excel
            </Button>
          </div>
          <Popup trigger={registerTrigger} setTrigger={setRegisterTrigger}>
            <RegisterDevice setRefresh={setRefresh} />
          </Popup>
          <Popup trigger={checkoutTrigger} setTrigger={setCheckoutTrigger}>
            <Checkout
              serialNumber={selectedSerialNumber}
              close={() => setCheckoutTrigger(false)}
              setRefresh={setRefresh}
            />
          </Popup>
          <Popup trigger={checkinTrigger} setTrigger={setCheckinTrigger}>
            <Checkin
              serialNumber={selectedSerialNumber}
              deviceId={selectedDeviceId}
              close={() => setCheckinTrigger(false)}
              setRefresh={setRefresh}
            />
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
                <th style={{ padding: '10px 20px', color: 'black' }}>
                  Serial Number
                </th>
                <th style={{ padding: '10px 20px' }}>Cost</th>
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