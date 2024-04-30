const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const axios = require('axios');

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
    console.error('error in tasksController -> isRoleAdmin', error);
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
    console.error('Error in tasksController -> isRoleAdminOrSupervisor', error);
  }
  return userRole === 'ADMIN' || userRole === 'SUPERVISOR';
};

module.exports = {
  //GET
  getAllTasksForEmployee: async (req, res) => {
    const { id } = req.params;
    const { tag, searchTerm } = req.body;
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
              task: {
                tag: tag,
                desc: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
              archived: false,
            },
          },
        });

        const totalPages = Math.ceil(totalTasks / take);

        const employeeTasks =
          await prisma.onboardingEmployeeTaskMapping.findMany({
            where: {
              AND: {
                userId: parseInt(id),
                task: {
                  tag: tag,
                  desc: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
                archived: false,
              },
            },
            include: {
              task: true,
              department: true,
            },
            skip,
            take,
          });

        for (let i = 0; i < employeeTasks.length; i++) {
          const supervisor = await prisma.supervisorTaskMapping.findUnique({
            where: {
              archived: false,
              taskId: employeeTasks[i].taskId,
            },
            include: {
              user: true,
            },
          });
          employeeTasks[i].supervisor = supervisor.user;
        }

        const result = { tasks: employeeTasks, totalPages, totalTasks };

        res.status(200).json(result);
      } catch (err) {
        console.log(err);
        res
          .status(400)
          .json({ error: 'Error getting tasks for onboarding employee' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllTasksForSupervisor: async (req, res) => {
    const { id } = req.params;
    const { searchTerm } = req.body;
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
              task: {
                desc: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
              archived: false,
            },
          },
        });

        const totalPages = Math.ceil(totalTasks / take);

        const employeeTasks = await prisma.supervisorTaskMapping.findMany({
          where: {
            AND: {
              userId: parseInt(id),
              task: {
                desc: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
              archived: false,
            },
          },
          include: {
            task: true,
            department: true,
          },
          skip,
          take,
        });

        const result = { ...employeeTasks, totalPages, totalTasks };

        res.status(200).json(result);
      } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Error getting tasks for supervisor' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllTasksForDepartment: async (req, res) => {
    const { id } = req.params;
    const { page, pageSize } = req.query;
    const { tag } = req.body;

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
        const totalTasks = await prisma.departmentTaskMapping.count({
          where: {
            AND: {
              departmentId: parseInt(id),
              archived: false,
              task: {
                tag: tag
              }
            },
          },
        });

        const totalPages = Math.ceil(totalTasks / take);

        const departmentTasks = await prisma.departmentTaskMapping.findMany({
          where: {
            AND: {
              departmentId: parseInt(id),
              archived: false,
              task: {
                tag: tag
              }
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
            department: true,
          },
          skip,
          take,
        });

        for (let i = 0; i < departmentTasks.length; i++) {
          const supervisor = await prisma.supervisorTaskMapping.findUnique({
            where: {
              archived: false,
              taskId: departmentTasks[i].taskId,
            },
            include: {
              user: true,
            },
          });
          departmentTasks[i].supervisor = supervisor.user;
        }
        const result = { tasks : departmentTasks, totalPages, totalTasks };

        res.status(200).json(result);
      } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Error getting tasks for department' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },


  getAllTasksForAllDepartments: async (req, res) => {
    const { page, pageSize } = req.query;
    const { searchTerm, superId } = req.body;
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
        const totalTasks = await prisma.departmentTaskMapping.count({
          where: {
            archived: false,
            task: {
              desc: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
        });

        const totalPages = Math.ceil(totalTasks / take);

        const departmentTasks = await prisma.departmentTaskMapping.findMany({
          where: {
            archived: false,
            task: {
              desc: {
                contains: searchTerm,
                mode: 'insensitive',
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
            department: true,
          },
          skip,
          take,
        });

        const departmentTasksWithAssignmentInfo = departmentTasks.map(task => {
          const supervisorMapping = task.task.SupervisorTaskMapping[0];

          return {
            ...task,
            assigned: supervisorMapping && supervisorMapping.user.id === parseInt(superId)
              ? true
              : supervisorMapping ? supervisorMapping.user : false,
          };
        });

        const result = {
          ...departmentTasksWithAssignmentInfo,
          totalPages,
          totalTasks,
        };

        res.status(200).json(result);
      } catch (error) {}
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllTaskTagsForEmployee: async (req, res) => {
    const { id } = req.params;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const employeeTasks =
          await prisma.onboardingEmployeeTaskMapping.findMany({
            where: {
              AND: {
                userId: parseInt(id),
                archived: false,
              },
            },
            include: {
              task: true,
              department: true,
            },
          });

        const tags = [
          ...new Set(employeeTasks.map(taskMapping => taskMapping.task.tag)),
        ];

        const result = tags;

        res.status(200).json(result); //returns an array of unique tags
      } catch (err) {
        console.log(err);
        res
          .status(400)
          .json({ error: 'Error getting tasks for onboarding employee' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  getAllTaskTagsForDepartment: async (req, res) => {
    const { id } = req.params;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const departmentTasks =
          await prisma.onboardingEmployeeTaskMapping.findMany({
            where: {
              AND: {
                departmentId: parseInt(id),
                archived: false,
              },
            },
            include: {
              task: true,
              department: true,
            },
          });

        const tags = [
          ...new Set(departmentTasks.map(taskMapping => taskMapping.task.tag)),
        ];

        const result = tags;

        res.status(200).json(result); //returns an array of unique tags
      } catch (err) {
        console.log(err);
        res
          .status(400)
          .json({ error: 'Error getting tasks for onboarding employee' });
      }
    } else {
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
          },
        });

        const taskSuperMap = await prisma.supervisorTaskMapping.create({
          data: {
            userId: parseInt(superId),
            taskId: task.id,
            departmentId: parseInt(deptId),
          },
        });
        res.status(200).json('Sucessfully added task to department');
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error adding task for department' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  addTaskForSupervisor: async (req, res) => {
    const { superId, deptId, taskId } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
      try {
        const taskSuperMap = await prisma.supervisorTaskMapping.create({
          data: {
            userId: parseInt(superId),
            departmentId: parseInt(deptId),
            taskId: parseInt(taskId),
          },
        });
        res.status(200).json('Sucessfully added task to supervisor');
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error adding task for supervisor' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  addTaskForEmployee: async (req, res) => {
    const { userId, deptId, desc, tag, superId } = req.body;
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
            taskId: task.id,
            departmentId: parseInt(deptId),
          },
        });

        const taskSuperMap = await prisma.supervisorTaskMapping.create({
          data: {
            userId: parseInt(superId),
            departmentId: parseInt(deptId),
            taskId: task.id,
          },
        });

        const taskOnBoardMap =
          await prisma.onboardingEmployeeTaskMapping.create({
            data: {
              userId: parseInt(userId),
              departmentId: parseInt(deptId),
              taskId: task.id,
            },
          });

        res.status(200).json('Sucessfully added task to employee');
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error adding task for employee' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  //PUT
  archiveTaskForEmployee: async (req, res) => {
    const { taskID, userID } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const onboardMap =
          await prisma.onboardingEmployeeTaskMapping.updateMany({
            where: {
              taskId: parseInt(taskID),
              userId: parseInt(userID),
            },
            data: {
              archived: true,
            },
          });

        res.status(200).json('Sucessfully archived task from employee');
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error archiving task from employee' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  archiveTaskForSupervisor: async (req, res) => {
    const { superID, taskID } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const superMap = await prisma.supervisorTaskMapping.updateMany({
          where: {
            userId: parseInt(superID),
            taskId: parseInt(taskID),
          },
          data: {
            archived: true,
          },
        });

        res.status(200).json('Sucessfully archived task for supervisor');
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error archiving task for supervisor' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  archiveTasksForDepartment: async (req, res) => {
    const {allSelectedTasks, deptId} = req.body;
    //const { taskID, deptID } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      for (let i = 0; i < allSelectedTasks.length; i++) {
      try {
        const deptTaskMap = await prisma.departmentTaskMapping.updateMany({
          where: {
            taskId: parseInt(allSelectedTasks[i]),
            departmentId: parseInt(deptId),
          },
          data: {
            archived: true,
          },
        });

        const superTaskMap = await prisma.supervisorTaskMapping.updateMany({
          where: {
            taskId: parseInt(allSelectedTasks[i]),
            departmentId: parseInt(deptId),
          },
          data: {
            archived: true,
          },
        });

        const onboardMap =
          await prisma.onboardingEmployeeTaskMapping.updateMany({
            where: {
              taskId: parseInt(allSelectedTasks[i]),
              departmentId: parseInt(deptId),
            },
            data: {
              archived: true,
            },
          });

        res.status(200).json('Sucessfully archived task from department');
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error archiving task from department' });
      }
    }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  //PATCH

  completeTask: async (req, res) => {
    const { userId, taskId } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
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

        res.status(200).json('Sucessfully completed task');
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error completing task' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  uncompleteTask: async (req, res) => {
    const { userId, taskId } = req.body;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (
      await isRoleAdminOrSupervisor(req.headers.authorization.split(' ')[1])
    ) {
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

        res.status(200).json('Sucessfully uncompleted task');
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error uncompleting task' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  updateTask: async (req, res) => {
    const { id, desc, tag, superId } = req.body;
    const dataToUpdate = {};
    if (desc !== undefined) dataToUpdate.desc = desc;
    if (tag !== undefined) dataToUpdate.tag = tag;
    // if (superId !== undefined) dataToUpdate.superId = superId;
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'No Authorization Header Found' });
    }
    if (await isRoleAdmin(req.headers.authorization.split(' ')[1])) {
      try {
        const task = await prisma.task.update({
          where: {
            id: parseInt(id),
          },
          data: dataToUpdate,
        });

        if (superId !== undefined) {
          const deleteSuperMap =
            await prisma.supervisorTaskMapping.deleteUnique({
              where: {
                taskId: parseInt(id),
              },
            });

          const makeNewTaskSuperMap = await prisma.supervisorTaskMapping.create(
            {
              data: {
                userId: parseInt(superId),
                taskId: parseInt(id),
              },
            }
          );
        }

        res.status(200).json('Sucessfully updated task');
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error updating task' });
      }
    } else {
      res.status(401).json({ message: 'Not Authorized for this Data' });
    }
  },

  // updateEmployeeTask: async (req, res) => {
  //   const { id } = req.params;
  //   const { description, supervisorId, category} = req.body;
  //   const dataToUpdate = {};
  //   if (description !== undefined) dataToUpdate.desc = description;
  //   if(category !== undefined) dataToUpdate.tag = category;
  //   if (!req.headers.authorization) {
  //     return res.status(403).json({ message: 'No authorization header found' });
  //   }
  //   if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
  //     try {
  //       const task = await prisma.task.updateMany({
  //         where: {
  //           id: parseInt(id),
  //         },
  //         data: dataToUpdate,
  //       });
  //       if (supervisorId !== undefined) {
  //         const supervisorTaskMapping =
  //           await prisma.supervisorTaskMapping.updateMany({
  //             where: {
  //               taskId: parseInt(id),
  //             },
  //             data: {
  //               userId: parseInt(supervisorId),
  //             },
  //           });
  //       }
  //       res.status(200).json(task);
  //     } catch (err) {
  //       console.log(err);
  //       res.status(400).json({ error: 'Error updating employee task' });
  //     }
  //   } else {
  //     res.status(403).json({
  //       message: 'You are not authorized to add tasks to a department',
  //     });
  //   }
  // },

  // updateDepartmentTask: async (req, res) => {
  //   const { id } = req.params;
  //   const { description, departmentId } = req.body;
  //   const dataToUpdate = {};
  //   if (description !== undefined) dataToUpdate.description = description;
  //   if (!req.headers.authorization) {
  //     return res.status(403).json({ message: 'No authorization header found' });
  //   }
  //   if (isRoleAdmin(req.headers.authorization.split(' ')[1])) {
  //     try {
  //       const task = await prisma.task.update({
  //         where: {
  //           id: parseInt(id),
  //         },
  //         data: dataToUpdate,
  //       });
  //       if (departmentId !== undefined) {
  //         const departmentTaskMapping =
  //           await prisma.departmentTaskMapping.updateMany({
  //             where: {
  //               taskId: parseInt(id),
  //             },
  //             data: {
  //               departmentId: parseInt(departmentId),
  //             },
  //           });
  //       }
  //       res.status(200).json(task);
  //     } catch (err) {
  //       console.log(err);
  //       res.status(400).json({ error: 'Error updating department task' });
  //     }
  //   } else {
  //     res.status(403).json({
  //       message: 'You are not authorized to update tasks for a department',
  //     });
  //   }
  // },

  // //PATCH
  // completeTask: async (req, res) => {
  //   const { userId, taskId } = req.body;
  //   if (!req.headers.authorization) {
  //     return res.status(403).json({ message: 'No authorization header found' });
  //   }
  //   if (isRoleSupervisor(req.headers.authorization.split(' ')[1])) {
  //     try {
  //       const task = await prisma.onboardingEmployeeTaskMapping.updateMany({
  //         where: {
  //           userId: parseInt(userId),
  //           taskId: parseInt(taskId),
  //         },
  //         data: {
  //           taskCompleted: true,
  //           dateCompleted: new Date(),
  //         },
  //       });
  //       const taskUpdated = await prisma.onboardingEmployeeTaskMapping.findMany(
  //         {
  //           where: {
  //             userId: parseInt(userId),
  //             taskId: parseInt(taskId),
  //           },
  //         }
  //       );
  //       res.status(200).json(taskUpdated);
  //     } catch (err) {
  //       console.log(err);
  //       res.status(400).json({ error: 'Error completing task' });
  //     }
  //   } else {
  //     res
  //       .status(403)
  //       .json({ message: 'You are not authorized to complete tasks' });
  //   }
  // },

  // uncompleteTask: async (req, res) => {
  //   const { userId, taskId } = req.body;
  //   if (!req.headers.authorization) {
  //     return res.status(403).json({ message: 'No authorization header found' });
  //   }
  //   if (isRoleSupervisor(req.headers.authorization.split(' ')[1])) {
  //     try {
  //       const task = await prisma.onboardingEmployeeTaskMapping.updateMany({
  //         where: {
  //           userId: parseInt(userId),
  //           taskId: parseInt(taskId),
  //         },
  //         data: {
  //           taskCompleted: false,
  //           dateCompleted: null,
  //         },
  //       });
  //       const taskUpdated = await prisma.onboardingEmployeeTaskMapping.findMany(
  //         {
  //           where: {
  //             userId: parseInt(userId),
  //             taskId: parseInt(taskId),
  //           },
  //         }
  //       );
  //       res.status(200).json(taskUpdated);
  //     } catch (err) {
  //       console.log(err);
  //       res.status(400).json({ error: 'Error uncompleting task' });
  //     }
  //   } else {
  //     res
  //       .status(403)
  //       .json({ message: 'You are not authorized to uncomplete tasks' });
  //   }
  // },
};
