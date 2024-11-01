import React from 'react';
import { useState, useEffect } from 'react'; 
import { Button, Select } from '@mantine/core';
import { Navigate, useNavigate } from 'react-router-dom';

function RegisterDevice() {
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState('');
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;

  // Fetch departments 
  useEffect(() => {
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



    fetchDepartments();
    fetchLocations();
  }, [token]);


  const handleSubmit = async e => {
    e.preventDefault();

    const deviceData = {
      name,
      serialNumber,
      departmentId: parseInt(departmentId, 10),
      locationId: parseInt(departmentId, 10),
    };

    console.log("Form submitted! ", deviceData)

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
            {/* */}
            <label
              htmlFor="departmentName"
              className="block text-gray-700 font-medium mb-2"
            >
              Department
            </label>
            <Select
              id="departmentName"
              data={departments}
              value={departmentId}
              onChange={setDepartmentId}
              placeholder="Select Department"
              required
            />

            <label
              htmlFor="locationName"
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