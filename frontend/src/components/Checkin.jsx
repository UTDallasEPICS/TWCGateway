import React, { useState } from 'react';
import { Button, Modal, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function Checkin({}) {
  const [isOpen, setIsOpen] = useState(false); // State for the confirmation dialog
  const [deviceId, setDeviceId] = useState(''); // Replace with actual device ID or serial number
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token; // Retrieve the token
  const userId = null 

  // Function to handle confirming the check-in
  const handleConfirmCheckin = async () => {

    // Prepare the data to update the checkout
    const updatedData = {
      userId,
      name: null,
    };

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_EXPRESS_BASE_URL
        }/archiveCheckout`,
        {
          method: 'PATCH',
          headers: {
            //'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Use the retrieved token
          },
          //body: JSON.stringify(updatedData),
        }
      );
      console.log(response);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Device checked in/ archived successfully:', jsonResponse);
        // Redirect or update UI after successful check-in
        navigate('/some/redirect/path'); // Replace with your desired path
      } else {
        const errorData = await response.json();
        console.error(
          'Failed to check in/ archive device:',
          errorData.message || response.statusText
        );
      }
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  };

  return (
    <div>
        <p>Device is currently checked out</p>
        <p>Do you want to check in device?</p>
        <Stack spacing="sm">
          <Button  onClick={handleConfirmCheckin}>Yes</Button>
          <Button  onClick={() => setIsOpen(false)}>No</Button>
        </Stack>
    </div>
  );
}

export default Checkin;
