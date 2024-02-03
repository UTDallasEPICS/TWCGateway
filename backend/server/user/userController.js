const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

module.exports = {
  //POST
  addUser: async (req, res) => {
    const { name, email, departmentName, roleName } = req.body;
    console.log(name, email, departmentName, roleName);
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          archived: false,
        },
      });

      const roleId = await prisma.role.findUnique({
        where: {
          roleName,
        },
      });
      const userRole = await prisma.userRoleMapping.create({
        data: {
          userId: user.id,
          roleId: roleId.id,
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

      const userRole = await prisma.userRoleMapping.findFirst({
        where: {
          userId: parseInt(req.params.id),
        },
        orderBy: {
          id: 'desc',
        },
      });
      const role = await prisma.role.findUnique({
        where: {
          id: userRole.roleId,
        },
      });
      user.roleName = role.roleName;

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
        },
      });

      const roleId = await prisma.userRoleMapping.findFirst({
        where: {
          userId: user.id,
        },
        orderBy: {
          id: 'desc',
        },
      });
      const role = await prisma.role.findUnique({
        where: {
          id: roleId.roleId,
        },
      });
      user.roleName = role.roleName;

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

      const usersWithRoleAndDepartment = await Promise.all(
        users.map(async user => {
          console.log('user from userController', user);
          const userRole = await prisma.userRoleMapping.findFirst({
            where: {
              userId: user.id,
            },
            orderBy: {
              id: 'desc',
            },
          });
          const role = await prisma.role.findUnique({
            where: {
              id: userRole.roleId,
            },
          });
          user.roleName = role.roleName;

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

      res.status(200).json(usersWithRoleAndDepartment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all users' });
    }
  },

  getAllEmployeeUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          archived: false,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No users found or all users archived' });
      }

      const usersWithRoleAndDepartment = await Promise.all(
        users.map(async user => {
          const userRole = await prisma.userRoleMapping.findFirst({
            where: {
              userId: user.id,
            },
            orderBy: {
              id: 'desc',
            },
          });

          const role = await prisma.role.findUnique({
            where: {
              id: userRole.roleId,
            },
          });
          user.roleName = role.roleName;

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

      const employeeUsers = usersWithRoleAndDepartment.filter(user => user.roleName === 'Employee');

      res.status(200).json(employeeUsers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all employee users' });
    }
  },

  getAllSupervisorUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          archived: false,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No users found or all users archived' });
      }

      const usersWithRoleAndDepartment = await Promise.all(
        users.map(async user => {
          const userRole = await prisma.userRoleMapping.findFirst({
            where: {
              userId: user.id,
            },
            orderBy: {
              id: 'desc',
            },
          });

          const role = await prisma.role.findUnique({
            where: {
              id: userRole.roleId,
            },
          });
          user.roleName = role.roleName;

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

      const supervisorUsers = usersWithRoleAndDepartment.filter(user => user.roleName === 'Supervisor');

      res.status(200).json(supervisorUsers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all supervisor users' });
    }
  },

  getAllAdminUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          archived: false,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No users found or all users archived' });
      }

      const usersWithRoleAndDepartment = await Promise.all(
        users.map(async user => {
          const userRole = await prisma.userRoleMapping.findFirst({
            where: {
              userId: user.id,
            },
            orderBy: {
              id: 'desc',
            },
          });

          const role = await prisma.role.findUnique({
            where: {
              id: userRole.roleId,
            },
          });
          user.roleName = role.roleName;

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

      const adminUsers = usersWithRoleAndDepartment.filter(user => user.roleName === 'Admin');

      res.status(200).json(adminUsers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all admin users' });
    }
  },

  getAllArchivedUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          archived: true,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No users found or all users archived' });
      }

      const usersWithRoleAndDepartment = await Promise.all(
        users.map(async user => {
          const userRole = await prisma.userRoleMapping.findFirst({
            where: {
              userId: user.id,
            },
            orderBy: {
              id: 'desc',
            },
          });

          const role = await prisma.role.findUnique({
            where: {
              id: userRole.roleId,
            },
          });
          user.roleName = role.roleName;

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

      res.status(200).json(usersWithRoleAndDepartment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all arhived users' });
    }
  },

  //PUT
  updateUser: async (req, res) => {
    //TODO:
    // nested writes and nester reads
    // atomicity - transaction (not needed with one query)
    const { id } = req.params;
    const { name, departmentName, roleName } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
        },
      });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found or is archived' });
      }

      const roleId = await prisma.role.findUnique({
        where: {
          roleName,
        },
      });
      const userRole = await prisma.userRoleMapping.create({
        data: {
          userId: parseInt(id),
          roleId: roleId.id,
        },
      });

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
    console.log(req.params.uid);
    try {
      const archivedUser = await prisma.user.update({
        where: {
          id: parseInt(req.params.uid),
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
    // Get all userIds with a roleId of 3
    const userRoleMappings = await prisma.userRoleMapping.findMany({
      where: {
        roleId: 3,
      },
    });

    const userIds = userRoleMappings.map(mapping => mapping.userId);
    try {
      const archivedAllEmployees = await prisma.user.updateMany({
        where: {
          id: {
            in: userIds,
          },
          archived: false,
        },
        data: {
          archived: true,
        },
      });
      if (!archivedAllEmployees) {
        return res.status(404).json({ message: 'No employees found or all employees archived' });
      }
      res.status(200).json({ message: 'All employees archived successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error archiving all employees' });
    }
  },

  archiveAllSupervisors: async (req, res) => {
    // Get all userIds with a roleId of 2
    const userRoleMappings = await prisma.userRoleMapping.findMany({
      where: {
        roleId: 2,
      },
    });

    const userIds = userRoleMappings.map(mapping => mapping.userId);

    try {
      const archivedAllSupervisors = await prisma.user.updateMany({
        where: {
          id: {
            in: userIds,
          },
          archived: false,
        },
        data: {
          archived: true,
        },
      });
      if (!archivedAllSupervisors) {
        return res.status(404).json({ message: 'No supervisors found or all supervisors archived' });
      }
      res.status(200).json({ message: 'All supervisors archived successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error archiving all supervisors' });
    }
  },

  archiveAllAdmins: async (req, res) => {
    // Should this ignore the admin who presses the button?
    try {
      // Get all userIds with a roleId of 1
      const userRoleMappings = await prisma.userRoleMapping.findMany({
        where: {
          roleId: 1,
        },
      });

      const userIds = userRoleMappings.map(mapping => mapping.userId);

      const archivedAllAdmins = await prisma.user.updateMany({
        where: {
          id: {
            in: userIds,
          },
          archived: false,
        },
        data: {
          archived: true,
        },
      });
      if (!archivedAllAdmins) {
        return res.status(404).json({ message: 'No admins found or all admins archived' });
      }
      res.status(200).json({ message: 'All admins archived successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error archiving all admins' });
    }
  },

  /*archiveAllUsers: async (req, res) => {
    const { archived } = req.body;

    try {
      const archivedAllUsers = await prisma.user.updateMany({
        where: {
          archived: false,
        },
        data: {
          archived: true,
        },
      });
      if (!archivedAllUsers) {
        return res
          .status(404)
          .json({ message: 'No users found or all users archived' });
      }
      res.status(200).json({ message: 'All users updated successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error updating all users' });
    }
  },*/

  //DELETE
  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedUser = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          archived: true,
        },
      });
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found or is archived' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  },

  deleteAllUsers: async (req, res) => {
    try {
      const deletedUsers = await prisma.user.updateMany({
        where: {
          archived: false,
        },
        data: {
          archived: true,
        },
      });
      if (!deletedUsers) {
        return res.status(404).json({ message: 'No users found or all users archived' });
      }
      res.status(200).json({ message: 'All users deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting all users' });
    }
  },

  deleteAllArchivedUsers: async (req, res) => {
    try {
      const archivedUserIds = await prisma.user.findMany({
        where: {
          archived: true,
        },
      });
      if (!archivedUserIds) {
        return res.status(404).json({ message: 'No users found or all users not archived' });
      }

      await Promise.all(
        archivedUserIds.map(async user => {
          await prisma.userRoleMapping.deleteMany({
            where: {
              userId: user.id,
            },
          });
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
