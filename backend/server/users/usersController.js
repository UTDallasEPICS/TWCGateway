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

const isRoleAdminOrSupervisor = async token => {
  try {
    // const decodedToken = jwt.decode(token);
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
    return user.role === 'ADMIN' || user.role === 'SUPERVISOR';
  } catch (error) {
    console.error('Error in usersController -> isRoleAdmin', error);
  }
};

module.exports = {
  //POST
  auth: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
          archived: false,
        },
      });

      if (user === null || user.length === 0) {
        res.status(200).json({
          //can't use 204 (no content) because message is not sent
          message: 'No User with this Email or User is Archived',
        });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error('Error Retrieving User by Email', error);
      res.status(500).json({ message: 'Error Retrieving User by Email' });
    }
  },
  checkEmail: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user === null || user.length === 0) {
        res.status(200).json({
          //can't use 204 (no content) because message is not sent
          message: 'No User with this Email or User is Archived',
        });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error('Error Retrieving User by Email', error);
      res.status(500).json({ message: 'Error Retrieving User by Email' });
    }
  },

  addEmployee: async (req, res) => {
    const { name, email, department, role } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const user = await prisma.user.create({
          data: {
            name: name,
            role: role,
            email: email,
          },
        });
        console.log('department', department);
        const userDepMap = await prisma.departmentUserMapping.create({
          data: {
            userId: user.id,
            departmentId: parseInt(department),
          },
        });
        const tasks = await prisma.departmentTaskMapping.findMany({
          where: {
            departmentId: parseInt(department),
          },
        });
        tasks.forEach(async task => {
          await prisma.onboardingEmployeeTaskMapping.create({
            data: {
              userId: user.id,
              taskId: task.taskId,
              departmentId: parseInt(department),
            },
          });
        });
        res.status(201).send();
      } catch (error) {
        console.error('Error Adding Employee', error);
        res.status(500).json({ message: 'Error Adding Employee' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  addSupervisor: async (req, res) => {
    const { name, email, role } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const user = await prisma.user.create({
          data: {
            name: name,
            email: email,
            role: role,
          },
        });
        res.status(201).send();
      } catch (error) {
        console.error('Errored creating a new supervisor', error);
        res.status(500).json({ message: 'Errored creating a new supervisor' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  addAdmin: async (req, res) => {
    const { name, email, role } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const user = await prisma.user.create({
          data: {
            name: name,
            email: email,
            role: role,
          },
        });
        res.status(201).send();
      } catch (error) {
        console.error('Errored creating a new admin', error);
        res.status(500).json({ message: 'Errored creating a new admin' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getOnboardingEmployeeByEmail: async (req, res) => {
    const { email, searchTerm, activeTab } = req.body;
    const { page, pageSize } = req.query;

    // const skip =
    //   page && pageSize ? (parseInt(page) - 1) * parseInt(pageSize) : 0;
    const skip =
      page && pageSize
        ? Math.max((parseInt(page) - 1) * parseInt(pageSize), 0)
        : 0;
    const take = pageSize ? parseInt(pageSize) : 10;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
          archived: false,
        },
        include: {
          DepartmentUserMapping: {
            include: {
              department: true,
            },
          },
        },
      });

      if (user) {
        const tasks = await prisma.onboardingEmployeeTaskMapping.findMany({
          where: {
            userId: user.id,
            archived: false,
            task: {
              desc: {
                contains: searchTerm,
                mode: 'insensitive',
              },
              tag: {
                contains: activeTab,
              },
            },
          },
          include: {
            task: {
              include: {
                SupervisorTaskMapping: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
          skip,
          take,
          // orderBy: {
          //   id: 'asc',
          // },
        });

        const countedTasks = await prisma.onboardingEmployeeTaskMapping.count({
          where: {
            userId: user.id,
            archived: false,
            task: {
              desc: {
                contains: searchTerm,
                mode: 'insensitive',
              },
              tag: {
                contains: activeTab,
              },
            },
          },
        });

        const totalPages = Math.ceil(countedTasks / pageSize);

        user.OnboardingEmployeeTaskMapping = tasks;
        user.totalPages = totalPages;
      }

      if (user === null || user.length === 0) {
        res.status(200).json({
          //can't use 204 (no content) because message is not sent
          message: 'No User with this Email or User is Archived',
        });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error('Error Retrieving User by Email', error);
      res.status(500).json({ message: 'Error Retrieving User by Email' });
    }
  },

  getSupervisorByEmail: async (req, res) => {
    const { email } = req.body;
    try {
      const supervisor = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          SupervisorTaskMapping: {
            include: {
              task: true,
            },
          },
        },
      });
      res.status(200).json(supervisor);
    } catch (error) {
      console.error('Error Retrieving Supervisor by Email', error);
      res.status(500).json({ message: 'Error Retrieving Supervisor by Email' });
    }
  },

  getSupervisorTasks: async (req, res) => {
    const { id, searchTerm } = req.body;
    const { page, pageSize } = req.query;

    const skip =
      page && pageSize ? (parseInt(page) - 1) * parseInt(pageSize) : 0;
    const take = pageSize ? parseInt(pageSize) : 10;

    try {
      const tasks = await prisma.supervisorTaskMapping.findMany({
        where: {
          userId: parseInt(id),
          archived: false,
          task: {
            desc: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        orderBy: {
          id: 'desc',
        },

        include: {
          task: true,
        },
        skip,
        take,
      });

      const employeesPromises = tasks.map(async task => {
        return await prisma.onboardingEmployeeTaskMapping.findMany({
          where: {
            taskId: task.taskId,
          },
          orderBy: {
            userId: 'desc',
          },
          include: {
            user: {
              include: {
                DepartmentUserMapping: {
                  include: {
                    department: true,
                  },
                },
                OnboardingEmployeeTaskMapping: {
                  where: {
                    taskId: task.taskId,
                  },
                },
              },
            },
          },
        });
      });
      const employees = await Promise.all(employeesPromises);

      res.status(200).json({ tasks: tasks, employees: employees });
    } catch (error) {
      console.error('Error Getting Supervisor Tasks', error);
      res.status(500).json({ message: 'Error Getting Supervisor Tasks' });
    }
  },

  getEmployeeTasks: async (req, res) => {
    // const {}
  },

  //GET
  getAllUsers: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const employees = await prisma.user.findMany({
          where: {
            AND: {
              archived: false,
              role: {
                equals: 'EMPLOYEE',
              },
            },
          },
          include: {
            DepartmentUserMapping: {
              include: {
                department: true,
              },
            },
            OnboardingEmployeeTaskMapping: {
              include: {
                task: true,
              },
            },
          },
        });

        const supervisors = await prisma.user.findMany({
          where: {
            AND: {
              archived: false,
              role: {
                equals: 'SUPERVISOR',
              },
            },
          },
          include: {
            SupervisorTaskMapping: {
              include: {
                task: true,
              },
            },
          },
        });

        const admin = await prisma.user.findMany({
          where: {
            AND: {
              archived: false,
              role: {
                equals: 'ADMIN',
              },
            },
          },
        });
        const response = [...employees, ...supervisors, ...admin];
        res.status(200).json(response);
      } catch (error) {
        console.error('Error Getting All Users', error);
        res.status(500).json({ message: 'Error Getting All Users' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllArchivedUsers: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const employees = await prisma.user.findMany({
          where: {
            AND: {
              archived: true,
              role: {
                equals: 'EMPLOYEE',
              },
            },
          },
          include: {
            DepartmentUserMapping: {
              include: {
                department: true,
              },
            },
            OnboardingEmployeeTaskMapping: {
              include: {
                task: true,
              },
            },
          },
        });

        const supervisors = await prisma.user.findMany({
          where: {
            AND: {
              archived: true,
              role: {
                equals: 'SUPERVISOR',
              },
            },
          },
          include: {
            SupervisorTaskMapping: {
              include: {
                task: true,
              },
            },
          },
        });

        const admin = await prisma.user.findMany({
          where: {
            AND: {
              archived: true,
              role: {
                equals: 'ADMIN',
              },
            },
          },
        });
      } catch (error) {
        console.error('Error Getting All Users', error);
        res.status(500).json({ message: 'Error Getting All Users' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllEmployees: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const users = await prisma.user.findMany({
          where: {
            AND: {
              archived: false,
              role: {
                equals: 'EMPLOYEE',
              },
            },
          },
          include: {
            DepartmentUserMapping: {
              where: {
                archived: false,
              },
              include: {
                department: true,
              },
            },
            OnboardingEmployeeTaskMapping: {
              where: {
                archived: false,
              },
              include: {
                task: true,
              },
            },
          },
        });
        if (users === null || users.length === 0) {
          res.status(200).json({
            //can't use 204 (no content) because message is not sent
            message: 'No Employee Found or all Employees Archived',
          });
        } else {
          res.status(200).json(users);
        }
      } catch (error) {
        console.error('Error Getting All Employees', error);
        res.status(500).json({ message: 'Error Getting All Employees' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllArchivedEmployees: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const users = await prisma.user.findMany({
          where: {
            AND: {
              archived: true,
              role: {
                equals: 'EMPLOYEE',
              },
            },
          },
          include: {
            DepartmentUserMapping: {
              include: {
                department: true,
              },
            },
            OnboardingEmployeeTaskMapping: {
              include: {
                task: true,
              },
            },
          },
        });
        if (users === null || users.length === 0) {
          res.status(200).json({
            //can't use 204 (no content) because message is not sent
            message: 'No Employee Found or all Employees Archived',
          });
        } else {
          res.status(200).json(users);
        }
      } catch (error) {
        console.error('Error Getting All Employees', error);
        res.status(500).json({ message: 'Error Getting All Employees' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllSupervisors: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const users = await prisma.user.findMany({
          where: {
            AND: {
              archived: false,
              role: {
                equals: 'SUPERVISOR',
              },
            },
          },
          include: {
            SupervisorTaskMapping: {
              include: {
                task: true,
              },
            },
          },
        });
        if (users === null || users.length === 0) {
          res.status(200).json({
            //can't use 204 (no content) because message is not sent
            message: 'No Supervisor Found or All Supervisors Archived',
          });
        } else {
          res.status(200).json(users);
        }
      } catch (error) {
        console.error('Error Getting All Supervisors', error);
        res.status(500).json({ message: 'Error Getting All Supervisors' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllArchivedSupervisors: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const users = await prisma.user.findMany({
          where: {
            AND: {
              archived: true,
              role: {
                equals: 'SUPERVISOR',
              },
            },
          },
          include: {
            SupervisorTaskMapping: {
              include: {
                task: true,
              },
            },
          },
        });
        if (users === null || users.length === 0) {
          res.status(200).json({
            //can't use 204 (no content) because message is not sent
            message: 'No Supervisor Found or All Supervisors Archived',
          });
        } else {
          res.status(200).json(users);
        }
      } catch (error) {
        console.error('Error Getting All Supervisors', error);
        res.status(500).json({ message: 'Error Getting All Supervisors' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllAdmins: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const users = await prisma.user.findMany({
          where: {
            AND: {
              archived: false,
              role: {
                equals: 'ADMIN',
              },
            },
          },
        });
        if (users === null) {
          res.status(200).json({
            //can't use 204 (no content) because message is not sent
            message: 'No Admin Found or All Admins Archived',
          });
        } else {
          res.status(200).json(users);
        }
      } catch (error) {
        console.error('Error Getting All Admins', error);
        res.status(500).json({ message: 'Error Getting All Admins' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllArchivedAdmins: async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const users = await prisma.user.findMany({
          where: {
            AND: {
              archived: true,
              role: {
                equals: 'ADMIN',
              },
            },
          },
        });
        if (users === null) {
          res.status(200).json({
            //can't use 204 (no content) because message is not sent
            message: 'No Admin Found or All Admins Archived',
          });
        } else {
          res.status(200).json(users);
        }
      } catch (error) {
        console.error('Error Getting All Admins', error);
        res.status(500).json({ message: 'Error Getting All Admins' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getUser: async (req, res) => {
    const { id } = req.params;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        let user = await prisma.user.findUnique({
          where: {
            id: parseInt(id),
            archived: false,
          },
        });
        if (user === null || user.length === 0) {
          res.status(200).json({
            //can't use 204 (no content) because message is not sent
            message: 'No user of this ID available or user is archived',
          });
        }
        if (user.role === 'EMPLOYEE') {
          user = await prisma.user.findUnique({
            where: {
              id: parseInt(id),
              archived: false,
            },
            include: {
              DepartmentUserMapping: {
                include: {
                  department: true,
                },
              },
              // OnboardingEmployeeTaskMapping: {
              //   include: {
              //     task: true,
              //   },
              // },
            },
          });
        } else if (user.role === 'SUPERVISOR') {
          user = await prisma.user.findUnique({
            where: {
              id: parseInt(id),
              archived: false,
            },
            // include: {
            //   SupervisorTaskMapping: {
            //     include: {
            //       task: true,
            //     },
            //   },
            // },
          });
        }
        res.status(200).json(user);
      } catch (error) {
        console.error('Errored Getting User by ID', error);
        res.status(500).json({ message: 'Errored Getting User by ID' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getArchivedUser: async (req, res) => {
    const { id } = req.params;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        let user = await prisma.user.findUnique({
          where: {
            id: parseInt(id),
            archived: true,
          },
        });
        if (user === null || user.length === 0) {
          res.status(200).json({
            //can't use 204 (no content) because message is not sent
            message: 'No user of this ID available or user is archived',
          });
        }
        if (user.role === 'EMPLOYEE') {
          user = await prisma.user.findUnique({
            where: {
              id: parseInt(id),
              archived: true,
            },
            include: {
              DepartmentUserMapping: {
                include: {
                  department: true,
                },
              },
              OnboardingEmployeeTaskMapping: {
                include: {
                  task: true,
                },
              },
            },
          });
        } else if (user.role === 'SUPERVISOR') {
          user = await prisma.user.findUnique({
            where: {
              id: parseInt(id),
              archived: true,
            },
            include: {
              SupervisorTaskMapping: {
                include: {
                  task: true,
                },
              },
            },
          });
        }
        res.status(200).json(user);
      } catch (error) {
        console.error('Errored Getting User by ID', error);
        res.status(500).json({ message: 'Errored Getting User by ID' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  //PATCH
  archiveUsers: async (req, res) => {
    const { allSelectedUsers } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      let results = [];
      for (let i = 0; i < allSelectedUsers.length; i++) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              id: parseInt(allSelectedUsers[i]),
            },
          });
          let userUpdate;
          if (user.role === 'EMPLOYEE') {
            userUpdate = await prisma.user.update({
              where: {
                id: parseInt(allSelectedUsers[i]),
              },
              data: {
                DepartmentUserMapping: {
                  update: {
                    where: {
                      userId: parseInt(allSelectedUsers[i]),
                    },
                    data: {
                      archived: true,
                    },
                  },
                },
                OnboardingEmployeeTaskMapping: {
                  updateMany: {
                    where: {
                      userId: parseInt(allSelectedUsers[i]),
                    },
                    data: {
                      archived: true,
                    },
                  },
                },
                archived: true,
              },
            });
          } else if (user.role === 'SUPERVISOR') {
            const taskMappings = await prisma.supervisorTaskMapping.findMany({
              where: {
                userId: parseInt(allSelectedUsers[i]),
              },
            });
            if (taskMappings.length === 0) {
              userUpdate = await prisma.user.update({
                where: {
                  id: parseInt(allSelectedUsers[i]),
                },
                data: {
                  SupervisorTaskMapping: {
                    updateMany: {
                      where: {
                        userId: parseInt(allSelectedUsers[i]),
                      },
                      data: {
                        archived: true,
                      },
                    },
                  },
                  archived: true,
                },
              });
            } else {
              results.push({
                userId: allSelectedUsers[i],
                status: 'Supervisor has tasks assigned, cannot archive',
              });
              return res.status(500).json(results);
            }
          } else {
            //admin
            userUpdate = await prisma.user.update({
              where: {
                id: parseInt(allSelectedUsers[i]),
              },
              data: {
                archived: true,
              },
            });
          }

          if (userUpdate === null || userUpdate.length === 0) {
            // if (userUpdate === null) {
            results.push({
              userId: allSelectedUsers[i],
              status:
                'No user of this ID available or user is already archived',
            });
          } else {
            console.error('User Archived Successfully');
            results.push({
              userId: allSelectedUsers[i],
              status: 'User Archived Successfully',
            });
          }
        } catch (error) {
          console.error('Errored Archiving User by ID', error);
          res.status(500).json({ message: 'Errored Archiving User by ID' });
        }
      }
      res.status(200).json(results);
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  unArchiveUsers: async (req, res) => {
    const { allSelectedUsers } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      let results = [];
      for (let i = 0; i < allSelectedUsers.length; i++) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              id: parseInt(allSelectedUsers[i]),
            },
          });
          let userUpdate;
          if (user.role === 'EMPLOYEE') {
            userUpdate = await prisma.user.update({
              where: {
                id: parseInt(allSelectedUsers[i]),
              },
              data: {
                DepartmentUserMapping: {
                  update: {
                    where: {
                      userId: parseInt(allSelectedUsers[i]),
                    },
                    data: {
                      archived: false,
                    },
                  },
                },
                OnboardingEmployeeTaskMapping: {
                  updateMany: {
                    where: {
                      userId: parseInt(allSelectedUsers[i]),
                    },
                    data: {
                      archived: false,
                    },
                  },
                },
                archived: false,
              },
            });
          } else if (user.role === 'SUPERVISOR') {
            userUpdate = await prisma.user.update({
              where: {
                id: parseInt(allSelectedUsers[i]),
              },
              data: {
                SupervisorTaskMapping: {
                  updateMany: {
                    where: {
                      userId: parseInt(allSelectedUsers[i]),
                    },
                    data: {
                      archived: false,
                    },
                  },
                },
                archived: false,
              },
            });
          } else {
            //admin
            userUpdate = await prisma.user.update({
              where: {
                id: parseInt(allSelectedUsers[i]),
              },
              data: {
                archived: false,
              },
            });
          }

          if (userUpdate === null || userUpdate.length === 0) {
            results.push({
              userId: allSelectedUsers[i],
              status:
                'No user of this ID available or user is already un-archived',
            });
          } else {
            console.error('User UnArchived Successfully');
            results.push({
              userId: allSelectedUsers[i],
              status: 'User UnArchived Successfully',
            });
          }
        } catch (error) {
          console.error('Errored UnArchiving User by ID', error);
          res.status(500).json({ message: 'Errored UnArchiving User by ID' });
        }
      }
      res.status(200).json(results);
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  //PUT
  updateEmployee: async (req, res) => {
    const { id } = req.params;
    const { name, email, role, department } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const prevUser = await prisma.user.findFirst({
          where: {
            id: parseInt(id),
          },
        });
        console.log('prevUser', prevUser);
        if (prevUser.role === 'EMPLOYEE') {
          const deleteDeptUserMaps =
            await prisma.departmentUserMapping.deleteMany({
              where: {
                userId: parseInt(id),
              },
            });

          const deleteOnBoardMaps =
            await prisma.onboardingEmployeeTaskMapping.deleteMany({
              where: {
                userId: parseInt(id),
              },
            });
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: {
            name: name,
            email: email,
            role: role,
          },
        });

        const deptUserMap = await prisma.departmentUserMapping.create({
          data: {
            userId: parseInt(id),
            departmentId: parseInt(department),
          },
        });
        const tasks = await prisma.departmentTaskMapping.findMany({
          where: {
            departmentId: parseInt(department),
            archived: false,
          },
        });
        tasks.forEach(async task => {
          await prisma.onboardingEmployeeTaskMapping.create({
            data: {
              userId: parseInt(id),
              taskId: task.taskId,
              departmentId: parseInt(department),
            },
          });
        });
        res
          .status(200)
          .json({ message: 'Employee Updated Successfully', updatedUser });
      } catch (error) {
        console.error('Error Updating Employee', error);
        res.status(500).json({ message: 'Error Updating Employee' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  updateSupervisor: async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const prevUser = await prisma.user.findFirst({
          where: {
            id: parseInt(id),
          },
        });
        console.log('prevUser', prevUser);
        if (prevUser.role === 'EMPLOYEE') {
          const deleteDeptUserMaps =
            await prisma.departmentUserMapping.deleteMany({
              where: {
                userId: parseInt(id),
              },
            });

          const deleteOnBoardMaps =
            await prisma.onboardingEmployeeTaskMapping.deleteMany({
              where: {
                userId: parseInt(id),
              },
            });
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: {
            name: name,
            email: email,
            role: role,
          },
        });
        res
          .status(200)
          .json({ message: 'Supervisor Updated Successfully', updatedUser });
      } catch (error) {
        console.error('Error Updating Supervisor', error);
        res.status(500).json({ message: 'Error Updating Supervisor' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  updateAdmin: async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      const prevUser = await prisma.user.findFirst({
        where: {
          id: parseInt(id),
        },
      });
      console.log('prevUser', prevUser);
      if (prevUser.role === 'EMPLOYEE') {
        const deleteMaps = await prisma.departmentUserMapping.deleteMany({
          where: {
            userId: parseInt(id),
          },
        });
        const deleteOnBoardMaps =
          await prisma.onboardingEmployeeTaskMapping.deleteMany({
            where: {
              userId: parseInt(id),
            },
          });
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: name,
          email: email,
          role: role,
        },
      });
      res
        .status(200)
        .json({ message: 'Admin Updated Successfully', updatedUser });
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },
};
