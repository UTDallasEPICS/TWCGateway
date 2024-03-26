const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const axios = require('axios');

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
    console.error('error in tasksController -> isRoleAdmin', error);
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
    console.error('Error in tasksController -> isRoleAdminOrSupervisor', error);
  }
  return userRole === 'ADMIN' || userRole === 'SUPERVISOR';
};

module.exports = {

  //GET
  getAllTasksForEmployee: async (req, res) => {
    const { id } = req.params;
    const { page, pageSize } = req.query;

    const skip =
      page && pageSize ? (parseInt(page) - 1) * parseInt(pageSize) : 0;
    const take = pageSize ? parseInt(pageSize) : 10;

    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {

        const totalTasks = await prisma.onboardingEmployeeTaskMapping.count({
          where: {
            AND: {
              userId: parseInt(id),
              archived: false
            },
          }
        })

        const employeeTasks = await prisma.onboardingEmployeeTaskMapping.findMany({
          where: {
            AND: {
              userId: parseInt(id),
              archived: false
            },
          },
          include: {
            task: true,
            department: true
          },
          skip,
          take,
        })

        const totalPages = Math.ceil(totalTasks / take);
        const result = { ...employeeTasks, totalPages, totalTasks }

        res.status(200).json(result);
      } catch (err) {
        console.log(err);
        res
          .status(400)
          .json({ error: 'Error getting tasks for onboarding employee' });
      }
    }
    else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllTasksForSupervisor: async (req, res) => {
    const { id } = req.params;
    const { page, pageSize } = req.query;

    const skip =
      page && pageSize ? (parseInt(page) - 1) * parseInt(pageSize) : 0;
    const take = pageSize ? parseInt(pageSize) : 10;

    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {

        const totalTasks = await prisma.supervisorTaskMapping.count({
          where: {
            AND: {
              userId: parseInt(id),
              archived: false
            },
          }
        })

        const employeeTasks = await prisma.supervisorTaskMapping.findMany({
          where: {
            AND: {
              userId: parseInt(id),
              archived: false
            },
          },
          include: {
            task: true,
            department: true
          },
          skip,
          take,
        })

        const totalPages = Math.ceil(totalTasks / take);
        const result = { ...employeeTasks, totalPages, totalTasks }

        res.status(200).json(result);
      } catch (err) {
        console.log(err);
        res
          .status(400)
          .json({ error: 'Error getting tasks for supervisor' });
      }
    }
    else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  //POST
  addTaskForDepartment: async (req, res) => {
    const { deptId, desc, tag, superId } = req.body;
    const fixedTag = tag.toLowerCase();
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const task = await prisma.task.create({
          data: {
            desc: desc,
            tag: fixedTag,
          },

        });
        const taskDeptMap = await prisma.departmentTaskMapping.create({
          data: {
            departmentId: parseInt(deptId),
            taskId: task.id,
          }
        });

        const taskSuperMap = await prisma.supervisorTaskMapping.create({
          data: {
            userId: parseInt(superId),
            taskId: task.id,
            departmentId: parseInt(deptId)
          }
        });
        res.status(200).json("Sucessfully added task to department");
      }

      catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: 'Error adding task for department' });
      }

    }

    else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  addTaskForSupervisor: async (req, res) => {
    const {superId, deptId, taskId} = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const taskSuperMap = await prisma.supervisorTaskMapping.create({
          data:{
            userId : parseInt(superId),
            departmentId : parseInt(deptId),
            taskId : parseInt(taskId)
          }
        });
        res.status(200).json("Sucessfully added task to supervisor");
      }

      catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: 'Error adding task for supervisor' });
      }
    }

    else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  addTaskForEmployee: async (req, res) => {
    const { id, deptId, desc, tag, superId } = req.body;
    const fixedTag = tag.toLowerCase();
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const task = await prisma.task.create({
          data:{
            desc : desc,
            tag : fixedTag
          }
        });

        const taskDeptMap = await prisma.departmentTaskMapping.create({
          data:{
            taskId : task.id,
            departmentId : parseInt(deptId)
          }
        });

        const taskSuperMap = await prisma.supervisorTaskMapping.create({
          data: {
            userId : parseInt(superId),
            departmentId : parseInt(deptId),
            taskId : task.id
          }
        });

        const taskOnBoardMap = await prisma.onboardingEmployeeTaskMapping.create({
          data:{
            userId : parseInt(id),
            departmentId : parseInt(deptId),
            taskId : task.id,
          }
        });

        res.status(200).json("Sucessfully added task to employee");
      }

      catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: 'Error adding task for employee' });
      }

    }

    else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  }
}