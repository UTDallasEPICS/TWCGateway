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
  


// get all devices
getAllDevices: async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'No Authorization Header Found' });
  }
  if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
    try {
      const allDevices = await prisma.device.findMany({
        where: {
          archived: false,
        },
        include: {
          checkout: {
            where: {
              archived: false,
            },
          },
          department: {
            select: {
              name: true, // getting the department name 
            },
          },
          location: {
            select: {
              locationName: true, //getting location name 
            },
          },
        },
      });
      console.log('Devices fetched from database:', allDevices);

      if (allDevices === null || allDevices.length === 0) {
        res.status(200).json({
          message: 'No Devices Found or All Devices Archived',
        });
      } else {
        res.status(200).json(allDevices);
      }
    } catch (error) {
      console.log('Error Getting all Devices', error);
      res.status(500).json({ message: 'Error Getting all Devices' });
    }
  } else {
    res.status(401).json({ message: 'Not Authorized for this Data' });
  }
},

// get device based on id
getDeviceID: async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'No Authorization Header Found' });
  }
  if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
    try {
      //const deviceId = req.params.id
      const { id } = req.params;
      const device = await prisma.device.findUnique({
        where: {
          id: parseInt(id),
          archived: false,
        },
      });

      if (device === null) {
        res.status(200).json({ message: 'No Device Found' });
      } else {
        res.status(200).json(device);
      }
    } catch (error) {
      console.log('Error getting device id', error);
      res.status(500).json({ message: 'Error getting device id' });
    }
  } else {
    res.status(401).json({ message: 'Not Authorized for this Data' });
  }
},

// get device based on serial number
getDeviceSerial: async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'No Authorization Header Found' });
  }
  if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
    try {
      //const deviceId = req.params.id
      const { serialNumber } = req.params;
      const device = await prisma.device.findUnique({
        where: {
          id: parseInt(serialNumber),
          archived: false,
        },
      });

      if (device === null) {
        res.status(200).json({ message: 'No Device Found' });
      } else {
        res.status(200).json(device);
      }
    } catch (error) {
      console.log('Error getting device serial number', error);
      res.status(500).json({ message: 'Error getting device serial number' });
    }
  } else {
    res.status(401).json({ message: 'Not Authorized for this Data' });
  }
},

// create new device
createDevice: async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'No Authorization Header Found' });
  }
  if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
    try {
      const { name, serialNumber, departmentId, locationId } = req.body;
      if (!name || !serialNumber || !departmentId || !locationId) {
        return res.status(400).json({
          message: 'Missing required fields: name, serialNumber, departmentId, locationId'
        });
      }
      const newDevice = await prisma.device.create({
        data: {
          name,
          serialNumber,
          departmentId,
          locationId
        },
      });

      res.status(201).json(newDevice);
    } catch (error) {
      console.log('Error creating Device', error);
      res.status(500).json({ message: 'Error creating Device', error: error.message });
    }
  } else {
    res.status(401).json({ message: 'Not Authorized for this Data' });
  }
  },

//add location
  addLocation: async (req, res) => {
    if (!req.headers.authorization) {
    return res.status(400).json({ message: 'No Authorization Header Found' });
  }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const { locationName, address } = req.body;
        

        const newLocation = await prisma.location.create({
          data: {
            locationName,
            address
          },
        });

        res.status(201).json(newLocation);
      } catch (error) {
        console.log("Error creating location", error);
        res.status(500).json({ message: 'Error creating device', error: error.message });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
},

// update device - do we update user or name of device?
updateDevice: async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'No Authorization Header Found' });
  }
  if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
    try {
      const { id, newDeviceName } = req.body;
      const updateDevice = await prisma.device.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: newDeviceName,
        },
      });

      res.status(200).json(updateDevice);
    } catch (error) {
      console.error('Error Updating Device Name', error);
      res.status(500).json({ message: 'Error Updating Device Name' });
    }
  } else {
    res.status(401).json({ message: 'Not Authorized for this Data' });
  }
},

//------------------ COME BACK TO THIS !!!!! -----------------------
// archive/delete device
 deleteDevice: async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'No Authorization Header Found' });
  }
  if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
    try {
      const { id } = req.params;
      // checking if device exists and not alr archived
      const device = await prisma.device.update({
        where: {
          id: parseInt(id),
        },
      });

      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }
      if (device.archived) {
        return res.status(400).json({ message: 'Device already archived' });
      }

      //archive the device
      const archiveDevice = await prisma.device.update({
        where: {
          id: parseInt(id),
        },
        data: {
          archived: true,
        },
      });

      //archive the related checkouts as well
      await prisma.checkout.updateMany({
        where: {
          deviceId: parseInt(id),
          archived: false,
        },
        data: {
          archived: true,
        },
      });

      return res.status(200).json({
        message: 'Device successfully archived',
        device: archivedDevice,
      });
    } catch (error) {
      console.error('Error Archiving Device ', error);
      return res.status(500).json({ message: 'Error Archiving Device' });
    }
  } else {
    return res.status(401).json({ message: 'Not Authorized for this Data' });
  }
},
// delete device based on id and serial number
//get all archived Devices

//get devices based on users??
getDeviceByUser: async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'No Authorization Header Found' });
  }
  if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
    try {
      const { userId } = req.params;
      const userDevices = await prisma.checkout.findMany({
        where: {
          userId: parseInt(userId),
          archived: false,
        },
        include: {
          device: {
            where: {
              archived: false,
            },
          },
        },
      });

      if ((userDevices === null) | (userDevices.length === 0)) {
        return res
          .status(200)
          .json({ message: 'No devices found for this user' });
      } else {
        return res.status(200).json(userDevices);
      }
    } catch (error) {
      console.error('Error getting devices for user ', error);
      res.status(500).json({ message: 'Error getting devices for user', error: error.message });
    }
  } else {
    return res.status(401).json({ message: 'Not Authorized for this Data' });
  }
  },
  
};
  
