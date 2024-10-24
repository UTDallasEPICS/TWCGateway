//cook here
import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Text, Button } from '@mantine/core';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

function InventoryPage() {
  const [search, setSearch] = useState('')
  console.log(search)
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
        serialNumber: 'ft25gh38',
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
        serialNumber: 'ft12gh34',
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
    inventory.filter((item) => {
      return  search.toLowerCase() === ''? true: item.employeeName.toLowerCase().includes(search.toLowerCase())
      || item.department.toLowerCase().includes(search.toLowerCase())
      || item.location.toLowerCase().includes(search.toLowerCase())
      || item.serialNumber.toLowerCase().includes(search.toLowerCase())
      || `${item.deviceMake} ${item.deviceModel}`.toLowerCase().includes(search.toLowerCase())
    }).map((item, index) => {
      const selected = selectedInventory.includes(item.id);
      const  changeStatus = () => {
      const newInventory = [...inventory];
      newInventory[index].status = newInventory[index].status === 'Checked In' ? 'Checked Out' : 'Checked In'; 
      setInventory(newInventory);
        }
        //might need to get rid of checkbox feature 
      return (
        <tr
          key={item.id}
          style={{
            backgroundColor: selected ? '#E0E8F9' : index % 2 === 0 ? '#F9FAFB' : 'white', 
          }}
        >
          <td style={{ padding: '10px' }}>
            <Checkbox
              aria-label="Select row"
              onChange={() => toggleRow(item.id)}
              checked={selected}
            />
          </td>
          <td>{item.employeeName}</td>
          <td>{item.department}</td>
          <td>
            <Button
              variant={item.status === 'Checked In' ? 'filled' : 'outline'}
              color={item.status === 'Checked In' ? 'blue' : 'gray'}
              size="xs"
              onClick={() => {
                changeStatus(index)
              }}
            >
              {item.status}
            </Button>
          </td>
          <td>{item.location}</td>
          <td>{`${item.deviceMake} ${item.deviceModel}`}</td>
          <td style={{ color: 'red' }}>{item.serialNumber}</td>
          <td>{item.checkoutDate}</td>
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
            <input type="text" id="query" name="q" placeholder="Search to filter...." aria-label="Search through site content" style = {{ display: 'flex',
          alignItems: 'center',  width: '400px',
          padding: '10px 20px', borderRadius: '50px',   border: '2px solid #ccc',  backgroundColor: 'white'}} value= {search} onChange={(e) => setSearch(e.target.value)}/>
          <Button
            variant="filled"
            color="green"
            onClick={() => {
              navigate('/admin/register-device');
            }}
          >
            Register new device
          </Button>
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
