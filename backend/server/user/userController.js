const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

module.exports = {
  //POST
  addUser: async (req, res) => {
    const { name, email, departmentName, role } = req.body;

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          role,
          archived: false,
        },
      });

      const departmentIds = await Promise.all(
        departmentName.map(async name => {
          const department = await prisma.department.findFirst({
            where: {
              name,
            },
          });
          return department.id;
        })
      );
      const userDepartment = await prisma.departmentUserMapping.createMany({
        data: departmentIds.map(departmentId => {
          return {
            userId: user.id,
            departmentId: departmentId,
          };
        }),
      });

      res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error adding user' });
    }
  },

  //GET
  getUserById: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          archived: false,
          id: parseInt(req.params.id),
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found or is archived' });
      }

      const userDepartment = await prisma.departmentUserMapping.findMany({
        where: {
          userId: parseInt(req.params.id),
        },
      });
      const departments = await Promise.all(
        userDepartment.map(async mapping => {
          const department = await prisma.department.findUnique({
            where: {
              id: mapping.departmentId,
            },
          });
          return department.name;
        })
      );
      user.departmentName = departments;

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving user by ID' });
    }
  },

  getUserByEmail: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
          archived: false,
        },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user by email' });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          archived: false,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No users found or all users archived' });
      }

      const usersWithDepartments = await Promise.all(
        users.map(async user => {
          const userDepartment = await prisma.departmentUserMapping.findMany({
            where: {
              userId: user.id,
            },
          });
          const departments = await Promise.all(
            userDepartment.map(async mapping => {
              const department = await prisma.department.findUnique({
                where: {
                  id: mapping.departmentId,
                },
              });
              return department.name;
            })
          );
          user.departmentName = departments;
          return user;
        })
      );

      res.status(200).json(usersWithDepartments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all users' });
    }
  },

  getAllEmployeeUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: 'EMPLOYEE',
          archived: false,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No users found or all users archived' });
      }

      const usersWithDepartments = await Promise.all(
        users.map(async user => {
          const userDepartment = await prisma.departmentUserMapping.findMany({
            where: {
              userId: user.id,
            },
          });
          const departments = await Promise.all(
            userDepartment.map(async mapping => {
              const department = await prisma.department.findUnique({
                where: {
                  id: mapping.departmentId,
                },
              });
              return department.name;
            })
          );
          user.departmentName = departments;
          return user;
        })
      );

      res.status(200).json(usersWithDepartments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all employee users' });
    }
  },

  getAllSupervisorUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: 'SUPERVISOR',
          archived: false,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No users found or all users archived' });
      }

      const usersWithDepartments = await Promise.all(
        users.map(async user => {
          const userDepartment = await prisma.departmentUserMapping.findMany({
            where: {
              userId: user.id,
            },
          });
          const departments = await Promise.all(
            userDepartment.map(async mapping => {
              const department = await prisma.department.findUnique({
                where: {
                  id: mapping.departmentId,
                },
              });
              return department.name;
            })
          );
          user.departmentName = departments;
          return user;
        })
      );

      res.status(200).json(usersWithDepartments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all supervisor users' });
    }
  },

  getAllAdminUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: 'ADMIN',
          archived: false,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No users found or all users archived' });
      }

      const usersWithDepartments = await Promise.all(
        users.map(async user => {
          const userDepartment = await prisma.departmentUserMapping.findMany({
            where: {
              userId: user.id,
            },
          });
          const departments = await Promise.all(
            userDepartment.map(async mapping => {
              const department = await prisma.department.findUnique({
                where: {
                  id: mapping.departmentId,
                },
              });
              return department.name;
            })
          );
          user.departmentName = departments;
          return user;
        })
      );

      res.status(200).json(usersWithDepartments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all admin users' });
    }
  },

  //PUT
  updateUser: async (req, res) => {
    //TODO:
    // nested writes and nester reads
    // atomicity - transaction (not needed with one query)
    const { id } = req.params;
    const { name, departmentName, role } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          role,
        },
      });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found or is archived' });
      }

      await prisma.departmentUserMapping.deleteMany({
        where: {
          userId: parseInt(id),
        },
      });

      const departmentIds = await Promise.all(
        departmentName.map(async name => {
          const department = await prisma.department.findFirst({
            where: {
              name,
            },
          });

          if (!department) {
            throw new Error(`Department with name ${name} does not exist`);
          }

          return department.id;
        })
      );
      const userDepartment = await prisma.departmentUserMapping.createMany({
        data: departmentIds.map(departmentId => {
          return {
            userId: parseInt(id),
            departmentId,
          };
        }),
      });

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error updating user' });
    }
  },

  archiveUser: async (req, res) => {
    try {
      const archivedUser = await prisma.user.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          archived: true,
        },
      });
      if (!archivedUser) {
        return res.status(404).json({ message: 'User not found or is already archived' });
      }
      res.status(200).json({ message: 'User archived successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error archiving user' });
    }
  },

  archiveAllEmployees: async (req, res) => {
    try {
      const employees = await prisma.user.findMany({
        where: {
          role: 'EMPLOYEE',
          archived: false,
        },
      });

      if (!employees) {
        return res.status(404).json({ message: 'No employees found or all employees archived' });
      }

      const archiveAllEmployees = employees.map(async employee => {
        await prisma.user.update({
          where: {
            id: employee.id,
          },
          data: {
            archived: true,
          },
        });
      });

      res.status(200).json({ message: 'All employees archived successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error archiving all employees' });
    }
  },

  archiveAllSupervisors: async (req, res) => {
    try {
      const supervisors = await prisma.user.findMany({
        where: {
          role: 'SUPERVISOR',
          archived: false,
        },
      });

      if (!supervisors) {
        return res.status(404).json({ message: 'No supervisors found or all supervisors archived' });
      }

      const archiveAllSupervisors = supervisors.map(async supervisor => {
        await prisma.user.update({
          where: {
            id: supervisor.id,
          },
          data: {
            archived: true,
          },
        });
      });

      res.status(200).json({ message: 'All supervisors archived successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error archiving all supervisors' });
    }
  },

  //DELETE

  deleteArchivedUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: {
          id: id,
          archived: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found or is not archived' });
      }

      await prisma.departmentUserMapping.deleteMany({
        where: {
          userId: id,
        },
      });

      await prisma.user.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  },

  deleteAllArchivedUsers: async (req, res) => {
    try {
      const archivedUsers = await prisma.user.findMany({
        where: {
          archived: true,
        },
      });

      if (archivedUsers.length === 0) {
        return res.status(404).json({ message: 'No users found or no archived users' });
      }

      await Promise.all(
        archivedUsers.map(async user => {
          await prisma.departmentUserMapping.deleteMany({
            where: {
              userId: user.id,
            },
          });
          await prisma.user.delete({
            where: {
              id: user.id,
            },
          });
        })
      );

      res.status(200).json({ message: 'All users deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting all archived users' });
    }
  },
};
