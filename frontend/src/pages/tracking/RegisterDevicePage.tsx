import React from 'react'
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import { Button } from '@mantine/core';
import { Navigate, useNavigate } from 'react-router-dom';


function RegisterDevicePage() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { make, model, serialNumber });
    navigate(`/admin/generate-qr-code/${serialNumber}`)
  };

  return (
    <div>
        <Navbar />
        <div className="p-4 flex justify-center">
        <form className="w-80" onSubmit={handleSubmit}>
            
            <div className="mb-4">
            <label htmlFor="make" className="block text-gray-700 font-medium mb-2">
                Make
            </label>
            <input
                type="text"
                id="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full p-3  border-2 rounded-md focus:outline-none"
                placeholder="eg. Apple"
                required
            />

            <label htmlFor="model" className="block text-gray-700 font-medium mb-2">
                Model
            </label>
            <input
                type="text"
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-3  border-2 rounded-md focus:outline-none"
                placeholder="eg. Macbook Air"
                required
            />

            <label htmlFor="serialNumber" className="block text-gray-700 font-medium mb-2">
                Serial Number
            </label>
            <input
                type="text"
                id="serialNumber"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full p-3  border-2 rounded-md focus:outline-none"
                placeholder="eg. C02WK32QJ1WL"
                required
            />
            </div>

            <Button className="mt-5" variant="filled" color="green" type='submit'>
            Register
            </Button>
        </form>
        </div>
    </div>
  );
}

export default RegisterDevicePage
