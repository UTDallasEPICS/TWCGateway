import React from 'react';
import axios from 'axios';
import { Button } from '@mantine/core';

const Checkin = ({ serialNumber, onClose }) => {
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;

  const handleCheckin = async () => {
    try {
      // Get the active checkout ID by serial number
      const deviceCheckouts = await axios.get(
        `${
          import.meta.env.VITE_APP_EXPRESS_BASE_URL
        }/getDeviceSerial/${serialNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Device checkouts data:', deviceCheckouts.data);
      // Find the active checkout (non-archived)
      const activeCheckout = deviceCheckouts.data.find(
        checkout => !checkout.archived
      );

      if (!activeCheckout) {
        alert('No active checkout found for this device.');
        return;
      }

      //  Archive the active checkout to check in the device
      const response = await axios.post(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/archiveCheckout/${
          activeCheckout.id
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message); // Success message from backend
      onClose();
    } catch (error) {
      console.error('Error checking in the device:', error);
      alert(error.response?.data?.message || 'Failed to check in the device.');
    }
  };

  return (
    <div>
      <h3>Check-in Device</h3>
      <p>
        Are you sure you want to check in the device with serial number{' '}
        {serialNumber}?
      </p>
      <Button onClick={handleCheckin} color="green">
        Confirm Check-in
      </Button>
      <Button onClick={onClose} color="red">
        Cancel
      </Button>
      
    
    </div>
  );
};

export default Checkin;
