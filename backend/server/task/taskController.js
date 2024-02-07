
// const { PrismaClient, PrismaClientKnownRequestError } = require('@prisma/client')
// const prisma = new PrismaClient()

// module.exports = {
//     getAllTasks: async (req, res) => {
//         try {
//             const tasks = await prisma.task.findMany()
//             res.status(200).json(tasks)
//         } catch (error) {
//             res.status(500).json({ error: 'An error occurred while retrieving tasks' })
//         }
//     },
//     // other functions...
// }


// import { PrismaClient } from '@prisma/client'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    // Create a new task
    addTask: async(req, res) => {
        const { desc, departmentID } = req.body;
        console.log(desc, departmentID);
        try{
            const task = await prisma.task.create({
                data: {
                    description: desc,
                    archived: false,
                },
            });
            
            const taskDepartmentMapping = await prisma.departmentTaskMapping.create({
                data: {
                    taskId: task.id,
                    departmentId: departmentID,
                    dueDate: new Date(), // add this line
                },
            });
            

            res.status(201).json({ message: 'Task added successfully' });
        }
        catch(error){
            console.log(error);
            res.status(500).json({ message: 'Error adding task', error: error.message });
        }
    },
    

    getTaskByID: async(req, res) => {
        const {id} = req.params;
        try {
            const task = await prisma.task.findUnique({
              where: {
                archived: false,
                id: parseInt(id),
              },
            });
            
            if (!task) {
              return res.status(404).json({ message: 'Task not found or is archived' });
            }
            return res.status(200).json(task)
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving task' });
        }
    },

    getAllTasks: async(req, res) => {
        try {
            const tasks = await prisma.task.findMany({
              where: {
                archived: false,
              },
            });
      
            if (!tasks) {
              return res
                .status(404).json({ message: 'No tasks found' });
            }
            res.status(200).json(tasks);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving all tasks' });
        }
    },

    deleteTask: async(req, res) => {
        const { id } = req.params;
        try {
            const deletedTask = await prisma.task.update({
                where: {
                id: parseInt(id),
              },
            data: {
                archived: true,
              },
            });
            
            if (!deletedTask) {
              return res.status(404).json({ message: 'Task not found or is archived' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error deleting task' });
        }
    },

    updateTask: async (req, res) => {
        const { id } = req.params;
        const { description, departmentID } = req.body;
        
        try {
            const updatedTask = await prisma.task.update({
                where: { id: Number(id) },
                data: { description },
            });
    
            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found or is archived' });
            }
    
            // Update the department mapping
            const taskDepartmentMapping = await prisma.departmentTaskMapping.update({
                where: { id: Number(id) },
                data: {
                    departmentId: departmentID,
                },
            });

          


    
            if (updatedMapping.count === 0) {
                return res.status(404).json({ message: 'No matching task department mapping found' });
            }

            // const taskDepartmentMapping = await prisma.departmentTaskMapping.create({
            //     data: {
            //         taskId: task.id,
            //         departmentId: departmentID,
            //         dueDate: new Date(), // add this line
            //     },
            // });

    
            res.status(200).json({ updatedTask, updatedMapping });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while updating the task and its department mapping' });

        }
    },

 


    // getTaskById: async (req, res) => {
    //     try {
    //         const task = await prisma.task.findUnique({
    //             where: {
    //                 archived: false,
    //                 id: Number(req.params.id),
    //             },
    //         });
    
    //         if (!task) {
    //             return res.status(404).json({ message: 'Task not found or is archived' });
    //         }
    
    //         const taskDepartment = await prisma.departmentTaskMapping.findMany({
    //             where: {
    //                 taskId: Number(req.params.id),
    //             },
    //         });
    
    //         const departments = await Promise.all(
    //             taskDepartment.map(async mapping => {
    //                 const department = await prisma.department.findUnique({
    //                     where: {
    //                         id: mapping.departmentId,
    //                     },
    //                 });
    //                 return department.name;
    //             })
    //         );
    
    //         task.departmentName = departments;
    
    //         res.status(200).json(task);
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: 'Error retrieving task' });
    //     }
    // }

};
