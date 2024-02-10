const { PrismaClient, PrismaClientKnownRequestError } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllDepartments: async (req, res) => {
    try {
      const departments = await prisma.department.findMany({
        where: {
          archived: false,
        },
      });
      const departmentsWithUsers = await Promise.all(
        departments.map(async department => {
          const userMappings = await prisma.departmentUserMapping.findMany({
            where: {
              departmentId: department.id,
            },
          });
          const users = await Promise.all(
            userMappings.map(async mapping => {
              const user = await prisma.user.findUnique({
                where: {
                  id: mapping.userId,
                },
              });
              return user.name; // assuming the user object has a 'name' field
            })
          );
          return { ...department, users: users };
        })
      );
      const departmentsWithTasks = await Promise.all(
        departmentsWithUsers.map(async department => {
          const taskMappings = await prisma.departmentTaskMapping.findMany({
            where: {
              departmentId: department.id,
            },
          });
          const tasks = await Promise.all(
            taskMappings.map(async mapping => {
              const task = await prisma.task.findUnique({
                where: {
                  id: mapping.taskId,
                },
              });
              return task.description; // assuming the task object has a 'description' field
            })
          );
          return { ...department, tasks: tasks };
        })
      );
      res.status(200).json(departmentsWithTasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all departments' });
    }
  },

  updateDepartment: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const updatedDepartment = await prisma.department.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: name,
        },
      });
      res.status(200).json(updatedDepartment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error updating department' });
    }
  },

  archiveDepartment: async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    try {
      console.log(`User ${authorization} archived department ${id}`);
      console.log(req.headers);
      const archivedDepartment = await prisma.department.update({
        where: {
          id: parseInt(id),
        },
        data: {
          archived: true,
        },
      });
      res.status(200).json(archivedDepartment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error archiving department' });
    }
  },

  getAllArchivedDepartments: async (req, res) => {
    try {
      const departments = await prisma.department.findMany({
        where: {
          archived: true,
        },
      });
      res.status(200).json(departments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving all archived departments' });
    }
  },

  unarchiveDepartment: async (req, res) => {
    const { id } = req.params;
    try {
      const unarchivedDepartment = await prisma.department.update({
        where: {
          id: parseInt(id),
        },
        data: {
          archived: false,
        },
      });
      res.status(200).json(unarchivedDepartment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error unarchiving department' });
    }
  },
};
