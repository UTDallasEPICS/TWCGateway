import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { Button } from '@mantine/core';
import { useParams } from 'react-router-dom';
import Checkout from '../../components/Checkout';

function CheckoutPage() {
  const { serialNumber } = useParams();
  const [name, setName] = useState('');
  const [device, setDevice] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [inventory, setInventory] = useState([]);
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;

  // fetch data from the backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllDevices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log(response);

        if (response.status === 200) {
          const devices = response.data; 
          setInventory(devices);
          //console.log(inventory)
        } else {
          console.log('No devices found.');
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  // find the device with the matching serial number
  useEffect(() => {
    const foundDevice = inventory.find(device => device.serialNumber === serialNumber);
    console.log(inventory.length);
    if (inventory.length > 0) {
      console.log('inventory length > 0');
      if (foundDevice) {
        setDevice(foundDevice);
        foundDevice.checkout.length === 1 ? setCheckedIn(false) : setCheckedIn(true);
        console.log(checkedIn);
      }
    }
  }, [inventory]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, department, location });
    const date = new Date();
    const formattedDate = date.toISOString();
    // checkout logic
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/createCheckout`, {
        userId: 1,
        deviceId: device.id,  // use the device ID from the found device
        checkoutDate: date,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
    
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
          <Checkout serialNumber={serialNumber} />
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
