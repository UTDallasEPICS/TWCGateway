//TODO: need to check if the updated deleteUser function works

// Sample JSON for addUser
// {
//     "name": "Rita",
//     "email": "reachritawani@gmail.com",
//     "role": "Admin",
//     "departmentID": 1
// }

const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {

    addUser: async (req, res) => {
        const {name, email, role, departmentID} = req.body;
        try {
            
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                const field = err.meta.target[0];
                res.status(400).json({ error: `Unique constraint failed on the field: ${field}` });
            } 
            else {
                res.status(500).json({ error: 'Something went wrong.' });
            }
        }
    },

    getAllUsers: async (req, res) => {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    
    },

    getUserByID: async (req, res) => {
        const {id} = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.json(user);
    },

    getUserByEmail: async (req, res) => {
        const {email} = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        res.json(user);
    },

    updateUser: async (req, res) => {
        const {id} = req.params;
        const {name, email, role, departmentID} = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                email,
                role,
                departmentID
            }
        });
        res.json(updatedUser);
    },
    
    deleteUser: async (req, res) => {
        const {id} = req.params;
        const user = await prisma.user.update({
            // set user's archive flag to true
            where: {
                id: parseInt(id)
            },
            data: {
                archived: true
            }
        });
        res.json(user);
    },

    getAllTasks: async (req, res) => {
        const {id} = req.params;
        const user = await prisma.$queryRaw`SELECT * FROM onboarding_employee_task_mapping`;
        res.json(user);
    }

    // // First query
    // db.query('SELECT * FROM table1 WHERE condition1', (error, results) => {
    //     if (error) {
    //         console.log(error);
    //         return;
    //     }

    //     // Extract necessary data from results
    //     const data = results.map(result => result.columnName);

    //     // Second query
    //     db.query('SELECT * FROM table2 WHERE columnName IN (?)', [data], (error, results) => {
    //         if (error) {
    //             console.log(error);
    //             return;
    //         }

    //         // Use results from second query
    //         console.log(results);
    //     });
    // });
}