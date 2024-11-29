import React, { useEffect, useState } from 'react';
import { Table, Text, ActionIcon, Button } from '@mantine/core';
import DeleteIcon from '../../assets/icons/DeleteIcon'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

function DeviceInfoPage() {
  const { serialNumber } = useParams();
  const navigate = useNavigate()
  const [device, setDevice] = useState(null);
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        // Fetch device details
        const deviceResponse = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getDeviceSerial/${serialNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (deviceResponse.status === 200) {
          setDevice(deviceResponse.data);
        } else {
          console.error('Device not found');
        }

        // Fetch checkouts for the device
        const checkoutsResponse = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getCheckoutsBySerial/${serialNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (checkoutsResponse.status === 200) {
          setCheckouts(checkoutsResponse.data);
          console.log(checkoutsResponse.data)
        } else {
          console.error('Checkouts not found');
        }
      } catch (error) {
        console.error('Error fetching device or checkout details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceDetails();
  }, [serialNumber]);

  // Function to delete (archive) the device
  const handleDeleteDevice = async () => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      try {
        if (!token) {
            alert("Authorization token is missing");
            return;
          }
        const response = await axios.put(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/deleteDevice/${device.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          alert("Device deleted successfully")
          navigate('/admin/inventory-page')
        }
      } catch (error) {
        console.error('Error deleting device:', error);
        alert("Error deleting device")
      }
    }
  };


  if (loading) {
    return (
      <div>
        <Navbar />
        <Text size="xl" align="center" mt="lg">
          Loading device information...
        </Text>
      </div>
    );
  }

  if (!device) {
    return (
      <div>
        <Navbar />
        <Text size="xl" align="center" mt="lg" color="red">
          Device not found.
        </Text>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col bg-white bg-opacity-100 border-white border-2 rounded-lg p-2 m-5 overflow-x-auto">
        <Text size="xl" weight={700} mb="lg">
          Device Information
        </Text>
  
        <Table withTableBorder withColumnBorders className="mt-4 bg-gray-100">
          <thead>
            <tr>
              <th style={{ padding: '10px 20px', textAlign: 'left' }}>Field</th>
              <th style={{ padding: '10px 20px', textAlign: 'left' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px 20px' }}>Device Name</td>
              <td style={{ padding: '10px 20px' }}>{device.name}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px 20px' }}>Serial Number</td>
              <td style={{ padding: '10px 20px' }}>{device.serialNumber}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px 20px' }}>Department</td>
              <td style={{ padding: '10px 20px' }}>{device.department?.name || 'N/A'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px 20px' }}>Location</td>
              <td style={{ padding: '10px 20px' }}>{device.location?.locationName || 'N/A'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px 20px' }}>Cost</td>
              <td style={{ padding: '10px 20px' }}>${device.cost}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px 20px' }}>Status</td>
              <td style={{ padding: '10px 20px' }}>{device.checkout?.archived ? 'Archived' : 'Active'}</td>
            </tr>
          </tbody>
        </Table>
  
        <Text size="xl" weight={700} mt="lg" mb="lg">
          Device Checkouts
        </Text>
  
        <Table withTableBorder withColumnBorders className="mt-4 bg-gray-100">
          <thead>
            <tr>
              <th style={{ padding: '10px 20px', textAlign: 'left' }}>User</th>
              <th style={{ padding: '10px 20px', textAlign: 'left' }}>Checkout Date</th>
              <th style={{ padding: '10px 20px', textAlign: 'left' }}>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {checkouts.length > 0 ? (
              checkouts.map((checkout) => (
                <tr key={checkout.id} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '10px 20px' }}>{checkout.user?.name || 'Unknown'}</td>
                  <td style={{ padding: '10px 20px' }}>
                    {checkout.checkoutDate
                      ? new Date(checkout.checkoutDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'No Checkout Date'}
                  </td>
                  <td style={{ padding: '10px 20px' }}>
                    {checkout.checkInDate
                      ? new Date(checkout.checkInDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Not Returned'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ padding: '10px 20px', textAlign: 'center' }}>
                  No checkouts found for this device.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
  
        {/* Buttons for deleting and downloading QR code */}
        <div className="mt-4 flex justify-end">
          <Button color="red" onClick={handleDeleteDevice}>
            Delete Device
          </Button>
          <Button color="blue" onClick={() => navigate(`/admin/generate-qr-code/${device.id}`)} className="ml-3">
            Download QR Code
          </Button>
        </div>
      </div>
    </div>
  );
  
  
}

export default DeviceInfoPage;
