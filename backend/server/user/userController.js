const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

module.exports = {
  //POST
  addUser: async (req, res) => {
    const { name, email, departmentName, roleName } = req.body;

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

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

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

  // getAllArchivedEmployees: async (req, res) => {
    
  // },

  // getAllArchivedSupervisors: async (req, res) => {
  //   try {
  //     const supervisorRoleMappings = await prisma.userRoleMapping.findMany({
  //       where: {
  //         roleId: 2,
  //       },
  //     });

  //     const uniqueUserIds = [...new Set(supervisorRoleMappings.map(mapping => mapping.userId))];

  //     const collectUserIds = async () => {
  //       let userIds = [];
  //       await Promise.all(
  //         uniqueUserIds.map(async userId => {
  //           const latestEntry = await prisma.userRoleMapping.findFirst({
  //             where: {
  //               userId: userId,
  //             },
  //             orderBy: {
  //               id: 'desc',
  //             },
  //           });
  //           if (latestEntry.roleId === 2) {
  //             userIds.push(userId);
  //           }
  //         })
  //       );
  //       return userIds;
  //     };
  //     const userIds = await collectUserIds();

  //     const getArchivedSupervisors = userIds.map(async userId => {
  //       const user = await prisma.user.findFirst({
  //         where: {
  //           id: userId,
  //           archived: true,
  //         },
  //       });
  //       return user;
  //     });

  //     if (!getArchivedSupervisors) {
  //       return res.status(404).json({ message: 'No supervisors found or all supervisors archived' });
  //     }
  //     res.status(200).json(getArchivedSupervisors);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: 'Error retrieving all archived supervisors' });
  //   }
  // },

  // getAllArchivedAdmins: async (req, res) => {
  //   try {
  //     const adminRoleMappings = await prisma.userRoleMapping.findMany({
  //       where: {
  //         roleId: 1,
  //       },
  //     });

  //     const uniqueUserIds = [...new Set(adminRoleMappings.map(mapping => mapping.userId))];

  //     const collectUserIds = async () => {
  //       let userIds = [];
  //       await Promise.all(
  //         uniqueUserIds.map(async userId => {
  //           const latestEntry = await prisma.userRoleMapping.findFirst({
  //             where: {
  //               userId: userId,
  //             },
  //             orderBy: {
  //               id: 'desc',
  //             },
  //           });
  //           if (latestEntry.roleId === 1) {
  //             userIds.push(userId);
  //           }
  //         })
  //       );
  //       return userIds;
  //     };
  //     const userIds = await collectUserIds();

  //     const getArchivedAdmins = userIds.map(async userId => {
  //       const user = await prisma.user.findFirst({
  //         where: {
  //           id: userId,
  //           archived: true,
  //         },
  //       });
  //       return user;
  //     });

  //     if (!getArchivedAdmins) {
  //       return res.status(404).json({ message: 'No admins found or all admins archived' });
  //     }
  //     res.status(200).json(getArchivedAdmins);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: 'Error retrieving all archived admins' });
  //   }
  // },

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
      const employeeRoleMappings = await prisma.userRoleMapping.findMany({
        where: {
          roleId: 3,
        },
      });

      const uniqueUserIds = [...new Set(employeeRoleMappings.map(mapping => mapping.userId))];

      const collectUserIdsToArchive = async () => {
        let userIdsToArchive = [];
        await Promise.all(
          uniqueUserIds.map(async userId => {
            const latestEntry = await prisma.userRoleMapping.findFirst({
              where: {
                userId: userId,
              },
              orderBy: {
                id: 'desc',
              },
            });
            if (latestEntry.roleId === 3) {
              userIdsToArchive.push(userId);
            }
          })
        );
        return userIdsToArchive;
      };

      const userIdsToArchive = await collectUserIdsToArchive();

      const archiveAllEmployees = userIdsToArchive.map(async userId => {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            archived: true,
          },
        });
      });

      if (!archiveAllEmployees) {
        return res.status(404).json({ message: 'No employees found or all employees archived' });
      }
      res.status(200).json({ message: 'All employees archived successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error archiving all employees' });
    }
  },

  archiveAllSupervisors: async (req, res) => {
    try {
      const supervisorRoleMappings = await prisma.userRoleMapping.findMany({
        where: {
          roleId: 2,
        },
      });

      const uniqueUserIds = [...new Set(supervisorRoleMappings.map(mapping => mapping.userId))];

      const collectUserIdsToArchive = async () => {
        let userIdsToArchive = [];
        await Promise.all(
          uniqueUserIds.map(async userId => {
            const latestEntry = await prisma.userRoleMapping.findFirst({
              where: {
                userId: userId,
              },
              orderBy: {
                id: 'desc',
              },
            });
            if (latestEntry.roleId === 2) {
              userIdsToArchive.push(userId);
            }
          })
        );
        return userIdsToArchive;
      };

      const userIdsToArchive = await collectUserIdsToArchive();

      const archiveAllSupervisors = userIdsToArchive.map(async userId => {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            archived: true,
          },
        });
      });

      if (!archiveAllSupervisors) {
        return res.status(404).json({ message: 'No supervisors found or all supervisors archived' });
      }
      res.status(200).json({ message: 'All supervisors archived successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error archiving all supervisors' });
    }
  },

  //DELETE
  // deleteUser: async (req, res) => {
  //   const { id } = req.params;

  //   try {
  //     const deletedUser = await prisma.user.update({
  //       where: {
  //         id: parseInt(id),
  //       },
  //       data: {
  //         archived: true,
  //       },
  //     });
  //     if (!deletedUser) {
  //       return res.status(404).json({ message: 'User not found or is archived' });
  //     }
  //     res.status(200).json({ message: 'User deleted successfully' });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: 'Error deleting user' });
  //   }
  // },

  // deleteAllUsers: async (req, res) => {
  //   try {
  //     const deletedUsers = await prisma.user.updateMany({
  //       where: {
  //         archived: false,
  //       },
  //       data: {
  //         archived: true,
  //       },
  //     });
  //     if (!deletedUsers) {
  //       return res.status(404).json({ message: 'No users found or all users archived' });
  //     }
  //     res.status(200).json({ message: 'All users deleted successfully' });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: 'Error deleting all users' });
  //   }
  // },

  // deleteArchivedUser: async (req, res) => {},

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
