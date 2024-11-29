const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require('fs');

const prisma = new PrismaClient();

const isRoleAdmin = async token => {
  try {
    // const decodedToken = jwt.decode(token);
    // console.log('This is the process.cwd()', process.cwd());
    const decodedToken = jwt.verify(
      token,
      fs.readFileSync(process.cwd() + '/cert-dev.pem')
    );
    const user = await prisma.user.findUnique({
      where: {
        email: decodedToken.email,
        archived: false,
      },
    });

    if (user === null || user.length === 0) {
      throw new Error('No User with this Email or User is Archived');
    }
    return user.role === 'ADMIN';
  } catch (error) {
    console.error('error in usersController -> isRoleAdmin', error);
  }
};

module.exports = {
  getCheckouts: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const checkouts = await prisma.checkout.findMany({
          where: {
            archived: false,
          },
        });
        res.status(200).json(checkouts);
      } catch (error) {
        console.log('Error Getting Checkouts:', error);
        res
          .status(500)
          .json({ message: 'Error Getting Checkouts', error_message: error });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getCheckoutsByUser: async (req, res) => {
    const { userId } = req.params;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const checkouts = await prisma.Checkout.findMany({
          where: {
            userId: parseInt(userId),
          },
        });
        res.status(200).json(checkouts);
      } catch (error) {
        console.log('Error Getting Checkouts', error);

        res.status(500).json({ error: 'Error Getting Checkouts by User' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getCheckoutsByDevice: async (req, res) => {
    const { deviceId } = req.params;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const checkouts = await prisma.checkout.findMany({
          where: {
            deviceId: parseInt(deviceId),
          },
        });
        res.status(200).json(checkouts);
      } catch (error) {
        console.log('Error Getting Checkouts by User', error);

        res.status(500).json({ error: 'Error Getting Checkouts by User' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getCheckoutsByDeviceSerial: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
  
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const { serialNumber } = req.params;
  
        // Find the device by serialNumber
        const device = await prisma.device.findUnique({
          where: { serialNumber },
        });
  
        if (!device) {
          return res.status(404).json({ message: 'Device not found' });
        }
  
        // Get all checkouts for the device
        const checkouts = await prisma.checkout.findMany({
          where: { deviceId: device.id },
          include: {
            user: true, // Include user details if needed
          },
        });
  
        res.status(200).json(checkouts);
      } catch (error) {
        console.error('Error getting checkouts by device', error);
        res.status(500).json({ error: 'Error getting checkouts by device' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },
  

  updateCheckout: async (req, res) => {
    const { id } = req.params;
    const { userId, deviceId, checkoutDate } = req.body;

    if (!id || !userId || !deviceId || !checkoutDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }

    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const updatedCheckout = await prisma.checkout.update({
          where: { id: parseInt(id) },
          data: {
            userId: parseInt(userId),
            deviceId: parseInt(deviceId),
            checkoutDate: new Date(checkoutDate),
          },
        });
        res.status(200).json(updatedCheckout);
      } catch (error) {
        console.log('Error updating Checkout', error);

        res.status(500).json({ error: 'Error updating checkout.' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  createCheckout: async (req, res) => {
    //const { userId, deviceId, checkoutDate } = req.body;
    const { deviceId, checkoutDate, locationId, departmentId, userId } = req.body;
    console.log('recieved data: ', req.body)
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const newCheckout = await prisma.checkout.create({
          data: {
            userId: parseInt(userId),
            deviceId: parseInt(deviceId),
            checkoutDate: new Date(checkoutDate),
          }
        });
        const updateDevice = await prisma.device.update({
          where: {
            id: parseInt(deviceId),
          },
          data: {
            departmentId: parseInt(departmentId),
            locationId: parseInt(locationId),
          },
        });
        res.status(201).json({newCheckout, updateDevice});
      } catch (error) {
        console.log('Error creating Checkout', error);

        res.status(500).json({ error: 'Error creating checkout.' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  archiveCheckout: async (req, res) => {
    // Check for authorization header
    if (!req.headers.authorization) {
      console.error("No Authorization Header Found");
      return res.status(400).json({ message: "No Authorization Header Found" });
    }

    // Validate if user is an admin
    try {
      const token = req.headers.authorization.split(" ")[1];
      const isAdmin = await isRoleAdmin(token);
      if (!isAdmin) {
        console.warn("User is not authorized to archive checkout.");
        return res.status(401).json({ message: "Not Authorized for this Data" });
      }
    } catch (authError) {
      console.error("Error checking admin role:", authError);
      return res.status(500).json({
        message: "Error validating admin role",
        error_message: authError.message,
      });
    }

    try {
      const { deviceId, checkInDate } = req.body; // Expecting checkInDate in the request body
      console.log("Archiving checkout with deviceId:", deviceId);

      if (!deviceId) {
        console.error("No deviceId provided in request body.");
        return res.status(400).json({ message: "No deviceId provided" });
      }

      // Find the first checkout with the given deviceId and archived = false
      const checkout = await prisma.checkout.findFirst({
        where: {
          deviceId: parseInt(deviceId),
          archived: false, // Only find active (non-archived) checkouts
        },
      });

      if (!checkout) {
        console.warn(`No active checkout found for deviceId ${deviceId}.`);
        return res.status(404).json({ message: "No active checkout found." });
      }

      console.log("Active checkout found:", checkout);

      // Archive the checkout and optionally set the checkInDate
      const updatedCheckout = await prisma.checkout.update({
        where: {
          id: checkout.id, // Use the unique ID from the found record
        },
        data: {
          archived: true,
          checkInDate: checkInDate ? new Date(checkInDate) : null, // Set checkInDate if provided
        },
      });

      console.log("Checkout archived successfully:", updatedCheckout);
      res.status(200).json({
        message: "Checkout archived successfully",
        updatedCheckout,
      });
    } catch (error) {
      console.error("Error archiving checkout:", error);
      res.status(500).json({
        message: "Error archiving checkout",
        error_message: error.message,
      });
    }
  },

  
  
};
