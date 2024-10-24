import React from 'react';
import { useState } from 'react';
import { Button } from '@mantine/core';
import { Navigate, useNavigate } from 'react-router-dom';
//create onClick functionality on the register button
function RegisterDevice() {
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [locationId, setLocationId] = useState('');
  const navigate = useNavigate();
  const key = localStorage.key(1); 
  if (key) {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      try {
        const tokenData = JSON.parse(storedItem);
         const token = tokenData.id_token;
        console.log(token);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    } else {
      console.error("No item found in localStorage for the given key.");
    }
  } else {
    console.error("No key found in localStorage at the given index.");
  }
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Form submitted:', {
      name,
      serialNumber,
      departmentId: parseInt(departmentId, 10),
      locationId: parseInt(locationId, 10),
    });

    const deviceData = {
      name,
      serialNumber,
      departmentId: parseInt(departmentId, 10),
      locationId: parseInt(locationId, 10),
    };

      try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/createDevice`,
        {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(deviceData),
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json(); // Parse JSON from response
        console.log('Device Registered successfully:', jsonResponse);
        navigate(`/admin/generate-qr-code/${serialNumber}`);
      } else {
        // Log the response body to understand the exact error message
        const errorData = await response.json();
        console.error(
          'Failed to register device:',
          errorData.message || response.statusText
        );
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  return (
    <div>
      <div className="p-4 flex justify-center">
        <form className="w-80" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="make"
              className="block text-gray-700 font-medium mb-2"
            >
              Make
            </label>
            <input
              type="text"
              id="make"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 border-2 rounded-md focus:outline-none"
              placeholder="eg. Apple"
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
              onChange={e => setSerialNumber(e.target.value)}
              className="w-full p-3 border-2 rounded-md focus:outline-none"
              placeholder="eg. C02WK32QJ1WL"
              required
            />

            <label
              htmlFor="departmentId"
              className="block text-gray-700 font-medium mb-2"
            >
              Department ID
            </label>
            <input
              type="text"
              id="departmentId"
              value={departmentId}
              onChange={e => setDepartmentId(e.target.value)}
              className="w-full p-3 border-2 rounded-md focus:outline-none"
              placeholder="Enter Department ID"
              required
            />

            <label
              htmlFor="locationId"
              className="block text-gray-700 font-medium mb-2"
            >
              Location ID
            </label>
            <input
              type="text"
              id="locationId"
              value={locationId}
              onChange={e => setLocationId(e.target.value)}
              className="w-full p-3 border-2 rounded-md focus:outline-none"
              placeholder="Enter Location ID"
              required
            />
          </div>

          <Button className="mt-5" variant="filled" color="green" type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterDevice;
