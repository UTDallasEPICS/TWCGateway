const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {

    addUser: async (req, res) => {
        const {name, email, role, departmentID} = req.body;
        console.log("name: " + name);
        console.log("email: " + email);
        console.log("role: " + role);
        console.log("departmentID: " + departmentID);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                role,
                departmentID
            }
        });
        res.json(newUser);
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
        const user = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json(user);
    }
}


// {
//     "name": "Rita",
//     "email": "reachritawani@gmail.com",
//     "role": "Admin",
//     "departmentID": 1
// }