const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const axios = require('axios');

const isRoleAdmin = async token => {
  let userRole = '';
  try {
    const decodedToken = jwt.decode(token);
    const userEmail = decodedToken.email;
    await axios
      .post('http://localhost:5010/checkEmail/', { email: userEmail })
      .then(response => {
        if (response.data.role === 'ADMIN') {
          userRole = 'ADMIN';
        }
      });
  } catch (error) {
    console.log(error);
  }
  return userRole === 'ADMIN';
};

const isRoleSupervisor = async token => {
  let userRole = '';
  try {
    const decodedToken = jwt.decode(token);
    const userEmail = decodedToken.email;
    await axios
      .post('http://localhost:5010/checkEmail/', { email: userEmail })
      .then(response => {
        if (
          response.data.role === 'SUPERVISOR' ||
          response.data.role === 'ADMIN'
        ) {
          userRole = 'SUPERVISOR';
        }
      });
  } catch (error) {
    console.log(error);
  }
  return userRole === 'SUPERVISOR';
};

module.exports = {
  //POST
  addTaskForDepartment: async (req, res) => {
    const { description, supervisorId, departmentId } = req.body;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const task = await prisma.task.create({
          data: {
            description,
          },
        });
        const supervisorTaskMapping = await prisma.supervisorTaskMapping.create(
          {
            data: {
              taskId: task.id,
              userId: parseInt(supervisorId),
            },
          }
        );
        const departmentTaskMapping = await prisma.departmentTaskMapping.create(
          {
            data: {
              taskId: task.id,
              departmentId: parseInt(departmentId),
            },
          }
        );
        const employeesAssingedToDepartment =
          await prisma.departmentUserMapping.findMany({
            where: {
              departmentId: parseInt(departmentId),
            },
          });
        employeesAssingedToDepartment.forEach(async employee => {
          const userTaskMapping =
            await prisma.onboardingEmployeeTaskMapping.create({
              data: {
                taskId: task.id,
                userId: employee.userId,
              },
            });
        });

        res.status(201).json(task);
      } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Error adding a task to department' });
      }
    } else {
      res.status(403).json({
        message: 'You are not authorized to add tasks to a department',
      });
    }
  },

  addTaskForUser: async (req, res) => {
    const { description, supervisorId, employeeId } = req.body;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const task = await prisma.task.create({
          data: {
            description,
          },
        });
        const supervisorTaskMapping = await prisma.supervisorTaskMapping.create(
          {
            data: {
              taskId: task.id,
              userId: parseInt(supervisorId),
            },
          }
        );
        const onboardingEmployeeTaskMapping =
          await prisma.onboardingEmployeeTaskMapping.create({
            data: {
              taskId: task.id,
              userId: parseInt(employeeId),
            },
          });
        res.status(201).json(task);
      } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Error adding task for user' });
      }
    } else {
      res
        .status(403)
        .json({ message: 'You are not authorized to add tasks to a user' });
    }
  },

  //GET

  getTaskById: async (req, res) => {
    const { id } = req.params;
    try {
      const task = await prisma.task.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ error: 'Error getting task by id' });
    }
  },

  getTasksForUserEmployeeId: async (req, res) => {
    const { id } = req.params;
    const { page, pageSize } = req.query;

    const skip =
      page && pageSize ? (parseInt(page) - 1) * parseInt(pageSize) : 0;
    const take = pageSize ? parseInt(pageSize) : 10;

    try {
      const totalTasks = await prisma.onboardingEmployeeTaskMapping.count({
        where: {
          userId: parseInt(id),
        },
      });

      const totalPages = Math.ceil(totalTasks / take);

      const taskIds = await prisma.onboardingEmployeeTaskMapping.findMany({
        where: {
          userId: parseInt(id),
        },
        skip,
        take,
      });

      const tasksPromises = taskIds.map(async taskId => {
        const task = await prisma.task.findMany({
          where: {
            id: taskId.taskId,
          },
        });

        const supervisorId = await prisma.supervisorTaskMapping.findMany({
          where: {
            taskId: taskId.taskId,
          },
        });

        const supervisor = await prisma.user.findMany({
          where: {
            id: supervisorId[0].userId,
          },
        });

        const completedTask =
          await prisma.onboardingEmployeeTaskMapping.findMany({
            where: {
              userId: parseInt(id),
              taskId: taskId.taskId,
              taskCompleted: true,
            },
          });

        if (completedTask.length > 0) {
          return {
            ...task[0],
            supervisor: supervisor[0],
            completed: completedTask[0].taskCompleted,
            dateCompleted: completedTask[0].dateCompleted,
          };
        }

        return {
          ...task[0],
          supervisor: supervisor[0],
        };
      });

      const tasks = await Promise.all(tasksPromises);
      const tasksWithTotalPages = tasks.map(task => ({
        ...task,
        totalPages,
      }));
      res.status(200).json(tasksWithTotalPages);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ error: 'Error getting tasks for onboarding employee' });
    }
  },

  getTasksForUserSupervisorId: async (req, res) => {
    const { id } = req.params;
    const { page, pageSize } = req.query;

    const skip =
      page && pageSize ? (parseInt(page) - 1) * parseInt(pageSize) : 0;
    const take = pageSize ? parseInt(pageSize) : 10;
    try {
      const taskIds = await prisma.supervisorTaskMapping.findMany({
        where: {
          userId: parseInt(id),
        },
        skip,
        take,
      });

      const tasksPromises = taskIds.map(taskId => {
        return prisma.task.findMany({
          where: {
            id: taskId.taskId,
          },
        });
      });

      const tasks = await Promise.all(tasksPromises);
      res.status(200).json(tasks);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'Error getting tasks for supervisors' });
    }
  },

  getTasksForDepartmentId: async (req, res) => {
    const { id } = req.params;
    const { page, pageSize } = req.query;

    const skip =
      page && pageSize ? (parseInt(page) - 1) * parseInt(pageSize) : 0;
    const take = pageSize ? parseInt(pageSize) : 10;

    try {
      const tasks = await prisma.departmentTaskMapping.findMany({
        where: {
          departmentId: parseInt(id),
        },
        include: {
          task: true,
        },
        skip,
        take,
      });
      res.status(200).json(tasks);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  //PUT
  updateEmployeeTask: async (req, res) => {
    const { id } = req.params;
    const { description, supervisorId } = req.body;
    const dataToUpdate = {};
    if (description !== undefined) dataToUpdate.description = description;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const task = await prisma.task.update({
          where: {
            id: parseInt(id),
          },
          data: dataToUpdate,
        });
        if (supervisorId !== undefined) {
          const supervisorTaskMapping =
            await prisma.supervisorTaskMapping.updateMany({
              where: {
                taskId: parseInt(id),
              },
              data: {
                userId: parseInt(supervisorId),
              },
            });
        }
        res.status(200).json(task);
      } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Error updating employee task' });
      }
    } else {
      res.status(403).json({
        message: 'You are not authorized to add tasks to a department',
      });
    }
  },

  updateDepartmentTask: async (req, res) => {
    const { id } = req.params;
    const { description, departmentId } = req.body;
    const dataToUpdate = {};
    if (description !== undefined) dataToUpdate.description = description;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const task = await prisma.task.update({
          where: {
            id: parseInt(id),
          },
          data: dataToUpdate,
        });
        if (departmentId !== undefined) {
          const departmentTaskMapping =
            await prisma.departmentTaskMapping.updateMany({
              where: {
                taskId: parseInt(id),
              },
              data: {
                departmentId: parseInt(departmentId),
              },
            });
        }
        res.status(200).json(task);
      } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Error updating department task' });
      }
    } else {
      res.status(403).json({
        message: 'You are not authorized to update tasks for a department',
      });
    }
  },

  //PATCH
  completeTask: async (req, res) => {
    const { userId, taskId } = req.body;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleSupervisor(req.headers.authorization.split(' ')[1])) {
      try {
        const task = await prisma.onboardingEmployeeTaskMapping.updateMany({
          where: {
            userId: parseInt(userId),
            taskId: parseInt(taskId),
          },
          data: {
            taskCompleted: true,
            dateCompleted: new Date(),
          },
        });
        const taskUpdated = await prisma.onboardingEmployeeTaskMapping.findMany(
          {
            where: {
              userId: parseInt(userId),
              taskId: parseInt(taskId),
            },
          }
        );
        res.status(200).json(taskUpdated);
      } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Error completing task' });
      }
    } else {
      res
        .status(403)
        .json({ message: 'You are not authorized to complete tasks' });
    }
  },

  uncompleteTask: async (req, res) => {
    const { userId, taskId } = req.body;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (isRoleSupervisor(req.headers.authorization.split(' ')[1])) {
      try {
        const task = await prisma.onboardingEmployeeTaskMapping.updateMany({
          where: {
            userId: parseInt(userId),
            taskId: parseInt(taskId),
          },
          data: {
            taskCompleted: false,
            dateCompleted: null,
          },
        });
        const taskUpdated = await prisma.onboardingEmployeeTaskMapping.findMany(
          {
            where: {
              userId: parseInt(userId),
              taskId: parseInt(taskId),
            },
          }
        );
        res.status(200).json(taskUpdated);
      } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Error uncompleting task' });
      }
    } else {
      res
        .status(403)
        .json({ message: 'You are not authorized to uncomplete tasks' });
    }
  },

  //DELETE
  deleteUserTask: async (req, res) => {
    const { id } = req.params;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (!isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      return res.status(403).json({
        message: 'You are not authorized to delete user tasks',
      });
    } else {
      try {
        const supervisorTaskMapping =
          await prisma.supervisorTaskMapping.deleteMany({
            where: {
              taskId: parseInt(id),
            },
          });
        const onboardingEmployeeTaskMapping =
          await prisma.onboardingEmployeeTaskMapping.deleteMany({
            where: {
              taskId: parseInt(id),
            },
          });
        const task = await prisma.task.delete({
          where: {
            id: parseInt(id),
          },
        });
        res.status(200).json({ message: 'User task deleted' });
      } catch (err) {
        res.status(400).json({ error: 'Error deleting user task' });
      }
    }
  },
  deleteDepartmentTask: async (req, res) => {
    const { id } = req.params;
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'No authorization header found' });
    }
    if (!isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      return res.status(403).json({
        message: 'You are not authorized to delete department tasks',
      });
    } else {
      try {
        const departmentTaskMapping =
          await prisma.departmentTaskMapping.deleteMany({
            where: {
              taskId: parseInt(id),
            },
          });
        const onboardingEmployeeTaskMapping =
          await prisma.onboardingEmployeeTaskMapping.deleteMany({
            where: {
              taskId: parseInt(id),
            },
          });
        const supervisorTaskMapping =
          await prisma.supervisorTaskMapping.deleteMany({
            where: {
              taskId: parseInt(id),
            },
          });
        const task = await prisma.task.delete({
          where: {
            id: parseInt(id),
          },
        });
        res.status(200).json({ message: 'Department task deleted' });
      } catch (err) {
        res.status(400).json({ error: 'Error deleting department task' });
      }
    }
  },
};
