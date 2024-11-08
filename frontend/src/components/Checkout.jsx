import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Select } from '@mantine/core';
import axios from 'axios';

function Checkout({ serialNumber }) {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');

  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState('');

  const [location, setLocation] = useState('');
  const [locationId, setLocationId] = useState('')
  const [locations, setLocations] = useState([]);

  const [inventory, setInventory] = useState([]);
  const [device, setDevice] = useState(null);
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;

  
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllDevices`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(response);

        if (response.status === 200) {
          const devices = response.data;
          setInventory(devices);
          //console.log(inventory[0]);
        } else {
          console.log('No devices found.');
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllDepartments`,
          {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // format for Select component
          setDepartments(data.map(dept => ({ value: String(dept.id), label: dept.name })));
        } else {
          console.error('Failed to fetch departments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllLocations`,
          {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // format for Select component
          setLocations(data.map(loc => ({ value: String(loc.id), label: loc.locationName })));
        } else {
          console.error('Failed to fetch locations:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllUsers`,
          {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // format for Select component
          setUsers(data.map(user => ({ value: String(user.id), label: user.name })));
        } else {
          console.error('Failed to fetch locations:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchDepartments();
    fetchLocations();
    fetchInventory();
    fetchUsers();
  }, []);


  useEffect(() => {
    // find the device with the matching serial number
    const foundDevice = inventory.find(
      device => device.serialNumber === serialNumber
    );
    console.log(inventory.length);
    if (inventory.length > 0) {
      console.log('inventory length > 0');
      if (foundDevice) {
        setDevice(foundDevice);
      }
    }
  }, [serialNumber, inventory]);


  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Form submitted:', { name, departmentId, locationId, userId });
    setDepartment(department);
    setLocation(location);
    setName(name);
    const date = new Date();
    const formattedDate = date.toISOString();
    // checkout logic
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/createCheckout`,
        {
          deviceId: device.id, // use the device ID from the found device
          departmentId,
          locationId,
          userId,
          checkoutDate: formattedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
  };

  return (
    <div>
      <form className="w-80" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Employee Name
          </label>
          <Select
              id="name"
              data={users}
              value={userId}
              onChange={setUserId}
              placeholder="Select Employee"
              required
            />

          <label
            htmlFor="department"
            className="block text-gray-700 font-medium mb-2"
          >
            Department
          </label>
          <Select
              id="locationName"
              data={departments}
              value={departmentId}
              onChange={setDepartmentId}
              placeholder="Select Department"
              required
            />

          <label
            htmlFor="location"
            className="block text-gray-700 font-medium mb-2"
          >
            Location
          </label>
          <Select
              id="locationName"
              data={locations}
              value={locationId}
              onChange={setLocationId}
              placeholder="Select Location"
              required
            />
          

          <label
            htmlFor="serialNumber"
            className="block text-gray-700 font-medium mb-2"
          >
            Serial Number
          </label>
          <input
            type="text"
            id="serialNumber"
            value={serialNumber}
            className="w-full p-3 border-2 rounded-md focus:outline-none"
            disabled
          />
        </div>

        <Button className="mt-5" variant="filled" color="green" type="submit">
          Check out
        </Button>
      </form>
    </div>
  );
}

export default Checkout;
