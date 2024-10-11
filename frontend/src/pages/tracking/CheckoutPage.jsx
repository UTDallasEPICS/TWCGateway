import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Button } from '@mantine/core';
import { useParams } from 'react-router-dom';

function CheckoutPage() {
  const { serialNumber } = useParams();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [device, setDevice] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const dummyData = [{
    serialNumber: '123',
    checkedIn: false,
  },
  {
    serialNumber: '456',
    checkedIn: true,
  }];

  useEffect(() => {
    // find the device with the matching serial number
    const foundDevice = dummyData.find(device => device.serialNumber === serialNumber);
    if (foundDevice) {
      setDevice(foundDevice);
      setCheckedIn(foundDevice.checkedIn);
    }
  }, [serialNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, department, location });
    // checkout logic
  };

  const handleCheckIn = () => {
    setCheckedIn(true);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 flex justify-center">
        {!device ? (
          <p>Device not found</p>
        ) : checkedIn ? (
          <form className="w-80" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Employee Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border-2 rounded-md focus:outline-none"
                placeholder="John Doe"
                required
              />

              <label htmlFor="department" className="block text-gray-700 font-medium mb-2">
                Department
              </label>
              <input
                type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-3 border-2 rounded-md focus:outline-none"
                placeholder="Technology"
                required
              />

              <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border-2 rounded-md focus:outline-none"
                placeholder="Richardson"
                required
              />

              <label htmlFor="serialNumber" className="block text-gray-700 font-medium mb-2">
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
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold">Checked in successfully!</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
