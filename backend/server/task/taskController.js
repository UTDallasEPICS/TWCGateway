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
        const supervisorTaskMapping = await prisma.supervisorTaskMapping.create({
          data: {
            taskId: task.id,
            userId: parseInt(supervisorId),
          },
        });
        const departmentTaskMapping = await prisma.departmentTaskMapping.create({
          data: {
            taskId: task.id,
            departmentId: parseInt(departmentId),
          },
        });
        const employeesAssingedToDepartment = await prisma.departmentUserMapping.findMany({
          where: {
            departmentId: parseInt(departmentId),
          },
        });
        employeesAssingedToDepartment.forEach(async employee => {
          const userTaskMapping = await prisma.onboardingEmployeeTaskMapping.create({
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
      res.status(403).json({ message: 'You are not authorized to add tasks to a department' });
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
        const supervisorTaskMapping = await prisma.supervisorTaskMapping.create({
          data: {
            taskId: task.id,
            userId: parseInt(supervisorId),
          },
        });
        const onboardingEmployeeTaskMapping = await prisma.onboardingEmployeeTaskMapping.create({
          data: {
            taskId: task.id,
            userId: parseInt(employeeId)
          },
        });
        res.status(201).json(task);
      } catch (err) {
        console.log(err)
        res.status(400).json({ error: "Error adding task for user" });
      }
    } else {
      res.status(403).json({ message: 'You are not authorized to add tasks to a user' });
    }
  },

  //GET
  getTasksForUserEmployeeId: async (req, res) => {
    const { id } = req.params;
    try {
      const taskIds = await prisma.onboardingEmployeeTaskMapping.findMany({
        where: {
          userId: parseInt(id),
        },
      });
      const tasksPromises = taskIds.map(taskId => {
        return prisma.task.findMany({
          where:{
            id: taskId.taskId
          },
        })
      });
      const tasks = await Promise.all(tasksPromises);
      res.status(200).json(tasks);
    } catch (err) {
      console.log(err)
      res.status(400).json({ error: 'Error getting tasks for onboarding employee' });
    }
  },

  getTasksForUserSupervisorId: async (req, res) => {
    const { id } = req.params;
    try{
      const taskIds = await prisma.supervisorTaskMapping.findMany({
        where:{
          userId: parseInt(id),
        },
      });
      const tasksPromises = taskIds.map(taskId => {
        return prisma.task.findMany({
          where:{
            id: taskId.taskId
          },
        })
      });
      const tasks = await Promise.all(tasksPromises);
      res.status(200).json(tasks);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'Error getting tasks for supervisors'});
    }
  },

  getTasksForDepartmentId: async (req, res) => {
    const { id } = req.params;
    try {
      const tasks = await prisma.departmentTaskMapping.findMany({
        where: {
          departmentId: parseInt(id),
        },
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
          const supervisorTaskMapping = await prisma.supervisorTaskMapping.updateMany({
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
      res.status(403).json({ message: 'You are not authorized to add tasks to a department' });
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
          const departmentTaskMapping = await prisma.departmentTaskMapping.updateMany({
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
      res.status(403).json({ message: 'You are not authorized to update tasks for a department' });
    }
  },

  //DELETE
  deleteUserTask: async (req, res) => {},
  deleteDepartmentTask: async (req, res) => {},
};
