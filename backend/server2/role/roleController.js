
const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {

    getAllRoles: async (req, res) => {
        try {
            const roles = await prisma.role.findMany({
                where: {
                    archived: false
                }
            });
            // //map through roles and add all users with that role to the role object
            // const rolesWithUsers = await Promise.all(roles.map(async (role) => {
            //     const users = await prisma.userRoleMapping.findMany({
            //         where: {
            //             roleId: role.id
            //         }
            //     });
            //     role.users = users;
            //     return role;
            // }));
            res.status(200).json(roles);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error retrieving roles" });
        }
    }
}