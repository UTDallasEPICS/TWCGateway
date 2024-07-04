const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const prisma = new PrismaClient();

const isRoleAdmin = async token => {
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

const isRoleAdminOrSupervisor = async token => {
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
  getDepartmentEmployeesNumber: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      // const { id } = req.params;
      const { selectedRows } = req.body;
      // try {
      // const assignedEmps = await prisma.departmentUserMapping.count({
      //   where: {
      //     departmentId: parseInt(id),
      //     archived: false,
      //     user: {
      //       role: 'EMPLOYEE',
      //     },
      //   },
      // });
      //   res.status(200).json({ assignedEmps: assignedEmps });
      // } catch (error) {
      //   console.log('Error Getting Assigned Employees', error);
      //   res.status(500).json({ message: 'Error Getting Assigned Employees' });
      // }
      let isOkay = true;
      try {
        for (i = 0; i < selectedRows.length; i++) {
          console.log('inside of for loop');
          const assignedEmps = await prisma.departmentUserMapping.count({
            where: {
              departmentId: parseInt(selectedRows[i]),
              archived: false,
              user: {
                role: 'EMPLOYEE',
              },
            },
          });
          if (assignedEmps != 0) isOkay = false;
        }
        res.status(200).json({ isOkay });
      } catch (error) {
        console.log('error in checking department employees number');
        res
          .status(500)
          .json({ message: 'error in checking department employees number' });
      }
      // res.status(200).json({message: selectedRows.length})
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

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
              where: {
                archived: false,
              },
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

  getDepartment: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const { id } = req.params;
        const department = await prisma.department.findUnique({
          where: {
            id: parseInt(id),
            archived: false,
          },
          include: {
            DepartmentUserMapping: {
              where: {
                archived: false,
              },
              include: {
                user: true,
              },
            },
            // DepartmentTaskMapping: {
            //   where: {
            //     archived: false,
            //   },
            //   include: {
            //     task: true,
            //   },
            // }
          },
        });
        if (department === null) {
          res.status(200).json({
            //can't use 204 (no content) because message is not sent
            message: 'No Department Found',
          });
        } else {
          res.status(200).json(department);
        }
      } catch (error) {
        console.log('Error Getting Department', error);
        res.status(500).json({ message: 'Error Getting Department' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  //PATCH
  updateDepartmentName: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const { departmentId, newDepartmentName } = req.body;
        const updatedDepartment = await prisma.department.update({
          where: {
            id: parseInt(departmentId),
          },
          data: {
            name: newDepartmentName,
          },
        });
        res.status(200).json(updatedDepartment);
      } catch (error) {
        console.error('Error Updating Department Name', error);
        res.status(500).json({ message: 'Error Updating Department Name' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  archiveDepartments: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const { departmentIds } = req.body;
        for (let i = 0; i < departmentIds.length; i++) {
          await prisma.department.update({
            where: {
              id: parseInt(departmentIds[i]),
            },
            data: {
              archived: true,

              // include: {
              DepartmentTaskMapping: {
                updateMany: {
                  where: {
                    departmentId: parseInt(departmentIds[i]),
                  },
                  data: {
                    archived: true,
                  },
                },
              },
              DepartmentUserMapping: {
                updateMany: {
                  where: {
                    departmentId: parseInt(departmentIds[i]),
                  },
                  data: {
                    archived: true,
                  },
                },
              },
              OnboardingEmployeeTaskMapping: {
                updateMany: {
                  where: {
                    departmentId: parseInt(departmentIds[i]),
                  },
                  data: {
                    archived: true,
                  },
                },
              },
              SupervisorTaskMapping: {
                updateMany: {
                  where: {
                    departmentId: parseInt(departmentIds[i]),
                  },
                  data: {
                    archived: true,
                  },
                },
              },
            },
          });
        }
        res.status(200).json({ message: 'Departments Archived' });
      } catch (error) {
        console.error('Error Archiving Departments', error);
        res.status(500).json({ message: 'Error Archiving Departments' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  //POST
  addDepartment: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const { name } = req.body;
        const newDepartment = await prisma.department.create({
          data: {
            name,
          },
        });
        res.status(201).json(newDepartment);
      } catch (error) {
        console.error('Error Adding Department', error);
        res.status(500).json({ message: 'Error Adding Department' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },
};
