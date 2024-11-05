import React, { useState } from 'react';
import { Button, Modal, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function Checkin({}) {
  const [isOpen, setIsOpen] = useState(false); // State for the confirmation dialog
  const [deviceId, setDeviceId] = useState(''); // Replace with actual device ID or serial number
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token; // Retrieve the token
  const userId = null 
  // Function to handle the check-in confirmation
  const handleCheckinClick = id => {
    setDeviceId(id); // Set the device ID to check in
    setIsOpen(true); // Open the confirmation dialog
  };

  // Function to handle confirming the check-in
  const handleConfirmCheckin = async () => {
    setIsOpen(false); // Close the confirmation dialog

    // Prepare the data to update the checkout
    const updatedData = {
      userId,
      //departmentId: null,
      //locationId: null,
      name: null,
    };

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_EXPRESS_BASE_URL
        }/updateCheckout/${deviceId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Use the retrieved token
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Device checked in successfully:', jsonResponse);
        // Redirect or update UI after successful check-in
        navigate('/some/redirect/path'); // Replace with your desired path
      } else {
        const errorData = await response.json();
        console.error(
          'Failed to check in device:',
          errorData.message || response.statusText
        );
      }
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  };

  return (
    <div>
      
      <h1>Check In Device</h1>
      <Button onClick={() => handleCheckinClick('device.id')}>
        Check In Device
      </Button>
     

  
      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Check-In"
      >
        <p>Are you sure you want to check in this device?</p>
        <Stack spacing="sm">
        <Button  onClick={handleConfirmCheckin}>Yes</Button>
        <Button  onClick={() => setIsOpen(false)}>No</Button>
        </Stack>
        
      </Modal>
    </div>
  );
}

export default Checkin;
