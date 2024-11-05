import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mantine/core';
import axios from 'axios';

function Checkout({ serialNumber }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [inventory, setInventory] = useState([]);
  const [device, setDevice] = useState(null);
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;

  // fetch data from the backend
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

    fetchInventory();
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
        //foundDevice.checkout.length === 1 ? setCheckedIn(false) : setCheckedIn(true);
        //console.log(checkedIn);
      }
    }
  }, [serialNumber, inventory]);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Form submitted:', { name, department, location });
    setDepartment(department);
    setLocation(location);
    setName(name);
    const date = new Date();
    const formattedDate = date.toISOString();
    // checkout logic
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/updateCheckout/${device.id}`,
        {
          //userId: 1,
          deviceId:device.id, // use the device ID from the found device
          checkoutDate: date,
          name,
          department,
          location
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
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-3 border-2 rounded-md focus:outline-none"
            placeholder="John Doe"
            required
          />

          <label
            htmlFor="department"
            className="block text-gray-700 font-medium mb-2"
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={e => setDepartment(e.target.value)}
            className="w-full p-3 border-2 rounded-md focus:outline-none"
            placeholder="Technology"
            required
          />

          <label
            htmlFor="location"
            className="block text-gray-700 font-medium mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full p-3 border-2 rounded-md focus:outline-none"
            placeholder="Richardson"
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
