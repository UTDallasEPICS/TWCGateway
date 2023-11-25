
const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {   
    
        getAllDepartments: async (req, res) => {
            try {
                const departments = await prisma.department.findMany({
                    where: {
                        archived: false
                    }
                });
                res.status(200).json(departments);
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error retrieving departments" });
            }
        }
        
}