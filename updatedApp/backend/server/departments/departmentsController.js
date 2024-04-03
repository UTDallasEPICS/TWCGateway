const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const prisma = new PrismaClient();

const isRoleAdmin = async (token) => {
  let userRole = '';
  try {
    const decodedToken = jwt.decode(token);
    const userEmail = decodedToken.email;
    const response = await axios.post(`${process.env.EXPRESS_BASE_URL}/auth`, {
      email: userEmail,
    });
    if (response.data.role === 'ADMIN') {
      userRole = 'ADMIN';
    }
  } catch (error) {
    console.error('error in usersController -> isRoleAdmin', error);
  }
  return userRole === 'ADMIN';
};

const isRoleAdminOrSupervisor = async (token) => {
  let userRole = '';
  try {
    const decodedToken = jwt.decode(token);
    const userEmail = decodedToken.email;
    const response = await axios.post(`${process.env.EXPRESS_BASE_URL}/auth`, {
      email: userEmail,
    });
    if (response.data.role === 'ADMIN') {
      userRole = 'ADMIN';
    } else if (response.data.role === 'SUPERVISOR') {
      userRole = 'SUPERVISOR';
    }
  } catch (error) {
    console.error('Error in usersController -> isRoleAdmin', error);
  }
  return userRole === 'ADMIN' || userRole === 'SUPERVISOR';
};

module.exports = {
  //GET
  getAllDepartments: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const deps = await prisma.department.findMany({
          where: {
            archived: false,
          },
          include: {
            // DepartmentTaskMapping: {
            //   include: {
            //     task: true,
            //   },
            // },
            DepartmentUserMapping: {
              include: {
                user: true,
              },
            },
          },
        });
        if (deps === null || deps.length === 0) {
          res.status(200).json({
            //can't use 204 (no content) because message is not sent
            message: 'No Department Found or All Departments Archived',
          });
        } else {
          res.status(200).json(deps);
        }
      } catch (error) {
        console.log('Error Getting all Departments', error);
        res.status(500).json({ message: 'Error Getting all Departments' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },
};
