import React from 'react';
import { useState } from 'react';
import { Button } from '@mantine/core';
import { Navigate, useNavigate } from 'react-router-dom';

function RegisterDevice() {
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [locationId, setLocationId] = useState('');
  const navigate = useNavigate();

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
      departmentId,
      locationId,
    };

      try {
    const token =
              'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InMxc3FvNTJ1RDNacDdhcjNMUTNIQSJ9.eyJuaWNrbmFtZSI6ImFhcnlhcmF2aXNoYW5rYXIiLCJuYW1lIjoiYWFyeWFyYXZpc2hhbmthckBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNTFjOTk2MjJjYWJjMTE2M2QxNjY0YTQyZmQ0NTE0OTg_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhYS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyNC0xMC0yM1QxNjo1NjozOS44ODhaIiwiZW1haWwiOiJhYXJ5YXJhdmlzaGFua2FyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL3RoZS13YXJyZW4tY2VudGVyLnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJodnNiaHBRYzVJbXBLODVHcG9vM01ybGViYmZzMW9nWiIsImlhdCI6MTcyOTcwMjg5OCwiZXhwIjoxNzI5NzM4ODk4LCJzdWIiOiJhdXRoMHw2NmM3YjA1ZTE0ODkxZWY3OTljYjQyNTkiLCJzaWQiOiJKeWl5T05IYUNMZkVLbUxGeE0xZmdfSlgyYkJwaEVQXyIsIm5vbmNlIjoiWmpjdGNERjJPRkpyWVRkQ1ptcE9ORlZWWXkxblltZ3lNM1l5Y2xKd1ZGUjRNVGhZYTNKQk9UZEJkUT09In0.u4z7f33t8GWVvQlC2Vwy9e0KlAji4SWCd6OrqZKY7D3BpCD9oVr9gYAstC4EvpQjZ2H6x7GWLUxxeuVsuTmt4J7mqfUB7WKEIW7eklIAA0TvBslTZ3hdEcp2rGMInO1eagCVt2z1EGg5USrObDe2cyp9GQLxkTYxyCgVQekkgOAS9yNqRVF0N8ljdXkh5Q99dn8ag193xLP9qNbEaEybeqY7X34zhnetrfpQKrPdA_r0v0l1XeYn50Lem5XWrsBQZr9rRxtOyQ58gGefANaFcPD6rr6YStvnlztQRFs50e0CNXh - i0cq3x266BMzgVq5vybe75VJWjVqc1Uu - BWQmQ';
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
