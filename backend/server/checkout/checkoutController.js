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

  updateCheckout: async (req, res) => {
    const { id } = req.params;
    const { userId, deviceId, checkoutDate } = req.body;
//debugging statements to check if any of these exist
    if (!id) {
      return res.status(400).json({ message: 'Checkout ID is required' });
    }
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    if (!deviceId) {
      return res.status(400).json({ message: 'Device ID is required' });
    }
    if (!checkoutDate) {
      return res.status(400).json({ message: 'Checkout date is required' });
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
    const { userId, deviceId, checkoutDate } = req.body;
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
          },
        });
        res.status(201).json(newCheckout);
      } catch (error) {
        console.log('Error creating Checkout', error);

        res.status(500).json({ error: 'Error creating checkout.' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },
};
