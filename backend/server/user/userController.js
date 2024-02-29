const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const axios = require('axios');

const isRoleAdmin = async token => {
  let userRole = '';
  try {
    const decodedToken = jwt.decode(token);
    const userEmail = decodedToken.email;
    await axios.post('http://localhost:5010/checkEmail/', { email: userEmail }).then(response => {
      if (response.data.role === 'ADMIN') {
        userRole = 'ADMIN';
      }
    });
  } catch (error) {
    console.log(error);
  }
  return userRole === 'ADMIN';
};

module.exports = {
  //POST
  addUserEmployee: async (req, res) => {
    const { name, email, departmentName } = req.body;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            role: 'EMPLOYEE',
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

        //make mappings for all the tasks based on the department they are assigned to
        const taskIds = await prisma.departmentTaskMapping.findMany({
          where: {
            departmentId: {
              in: departmentIds,
            },
          },
        });
        const employeeTaskMapping = await prisma.onboardingEmployeeTaskMapping.createMany({
          data: taskIds.map(task => {
            return { taskId: task.taskId, userId: user.id };
          }),
        });

        res.status(200).json({ message: 'Onboarding employee added successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding onboarding employee' });
      }
    } else {
      res.status(403).json({ message: 'You are not authorized to add a user' });
    }
  },

  addUserSupervisor: async (req, res) => {
    const { name, email, assignedTaskIds } = req.body;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            role: 'SUPERVISOR',
            archived: false,
          },
        });

        const assignedTasks = await prisma.supervisorTaskMapping.createMany({
          data: assignedTaskIds.map(taskId => {
            return {
              userId: user.id,
              taskId,
            };
          }),
        });

        res.status(200).json({ message: 'Supervisor added successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding supervisor' });
      }
    } else {
      res.status(403).json({ message: 'You are not authorized to add a user' });
    }
  },

  addUserAdmin: async (req, res) => {
    const { name, email } = req.body;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            role: 'ADMIN',
            archived: false,
          },
        });

        res.status(200).json({ message: 'Admin added successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding admin' });
      }
    } else {
      res.status(403).json({ message: 'You are not authorized to add a user' });
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

  //GET
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

  getAllArchivedUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          archived: true,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No users found or no archived users' });
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
    } catch {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all archived users' });
    }
  },

  getAllArchivedEmployees: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: 'EMPLOYEE',
          archived: true,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No employees found or all employees unarchived' });
      }
    } catch {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all archived employees' });
    }
  },

  getAllArchivedSupervisors: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: 'SUPERVISOR',
          archived: true,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No supervisors found or all supervisors unarchived' });
      }
    } catch {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all archived supervisors' });
    }
  },

  getAllArchivedAdmins: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: 'ADMIN',
          archived: true,
        },
      });

      if (!users) {
        return res.status(404).json({ message: 'No admins found or all admins unarchived' });
      }
    } catch {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all archived admins' });
    }
  },

  getArchivedUserById: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          archived: true,
          id: parseInt(req.params.id),
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found or is not archived' });
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
      res.status(500).json({ message: 'Error retrieving archived user by ID' });
    }
  },

  //PUT
  updateUserEmployee: async (req, res) => {
    const { id } = req.params;
    const { name, departmentName, role, archive } = req.body;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const dataToUpdate = {};
        if (name !== undefined) dataToUpdate.name = name;
        if (role !== undefined) dataToUpdate.role = role;

        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: dataToUpdate,
        });

        if (!updatedUser) {
          return res.status(404).json({ message: 'Employee not found or is archived' });
        }

        if (departmentName !== undefined) {
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

          await prisma.departmentUserMapping.createMany({
            data: departmentIds.map(departmentId => {
              return {
                userId: parseInt(id),
                departmentId,
              };
            }),
          });
        }

        if (archive !== undefined) {
          if (archive) {
            await prisma.user.update({
              where: {
                id: parseInt(id),
              },
              data: {
                archived: archive === 'true',
              },
            });
          }
        }

        res.status(200).json({ message: 'Employee updated successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating employee' });
      }
    } else {
      res.status(403).json({ message: 'You are not authorized to update a user' });
    }
  },

  updateUserSupervisor: async (req, res) => {
    const { id } = req.params;
    const { name, role, archive, assignedTasks } = req.body;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const dataToUpdate = {};
        if (name !== undefined) dataToUpdate.name = name;
        if (role !== undefined) dataToUpdate.role = role;

        const updateUser = await prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: dataToUpdate,
        });

        if (!updateUser) {
          return res.status(404).json({ message: 'Supervisor not found or is archived' });
        }

        if (assignedTasks !== undefined) {
          await prisma.supervisorTaskMapping.deleteMany({
            where: {
              userId: parseInt(id),
            },
          });

          const assignedTasks = await prisma.supervisorTaskMapping.createMany({
            data: assignedTasks.map(taskId => {
              return {
                userId: parseInt(id),
                taskId,
              };
            }),
          });
        }

        if (archive !== undefined) {
          if (archive) {
            await prisma.user.update({
              where: {
                id: parseInt(id),
              },
              data: {
                archived: archive === 'true',
              },
            });
          }
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating supervisor' });
      }
    } else {
      res.status(403).json({ message: 'You are not authorized to update a user' });
    }
  },

  updateUserAdmin: async (req, res) => {
    const { id } = req.params;
    const { name, role, archive } = req.body;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const dataToUpdate = {};
        if (name !== undefined) dataToUpdate.name = name;
        if (role !== undefined) dataToUpdate.role = role;

        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: dataToUpdate,
        });

        if (!updatedUser) {
          return res.status(404).json({ message: 'Admin not found or is archived' });
        }

        if (archive !== undefined) {
          if (archive) {
            await prisma.user.update({
              where: {
                id: parseInt(id),
              },
              data: {
                archived: archive === 'true',
              },
            });
          }
        }

        res.status(200).json({ message: 'Admin updated successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating admin' });
      }
    } else {
      res.status(403).json({ message: 'You are not authorized to update a user' });
    }
  },

  archiveAllEmployees: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
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
    } else {
      res.status(403).json({ message: 'You are not authorized to archive all employees' });
    }
  },

  archiveAllSupervisors: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
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
    } else {
      res.status(403).json({ message: 'You are not authorized to archive all supervisors' });
    }
  },

  //DELETE
  deleteAllArchivedUsers: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
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
    } else {
      res.status(403).json({ message: 'You are not authorized to delete all archived users' });
    }
  },

  deleteArchivedUser: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
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
    } else {
      res.status(403).json({ message: 'You are not authorized to delete a user' });
    }
  },
};
