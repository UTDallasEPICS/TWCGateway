import React from 'react';
import axios from 'axios';
import { Button } from '@mantine/core';

const Checkin = ({ serialNumber, deviceId, close }) => {
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;

  const handleCheckin = async () => {
    try {
      // Archive the active checkout to check in the device
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/archiveCheckout`,
        {
          deviceId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      
  
      alert(`Device checked in successfully!`);
      close()
    } catch (error) {
      console.error('Error checking in the device:', error);
      alert(error.response?.data?.message || 'Failed to check in the device.');
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Check-in Device</h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to check in the device with serial number{' '}
        <span className="font-medium text-gray-800">{serialNumber}</span>?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleCheckin}
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition-colors"
        >
          Confirm Check-in
        </button>
      </div>
    </div>
  );
};

export default Checkin;
