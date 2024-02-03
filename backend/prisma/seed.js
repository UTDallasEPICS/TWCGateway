//https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
//npx prisma db seed
//Change the userAdmin with your email and name it whatever you want

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const roleAdmin = await prisma.role.upsert({
    //upsert: if exist update, if not insert
    where: { roleName: 'Admin' }, //where: find by name
    update: {}, //update: thing to update if found
    create: { roleName: 'Admin' }, //create: insert if not found
  });
  const roleSupervisor = await prisma.role.upsert({
    where: { roleName: 'Supervisor' },
    update: {},
    create: { roleName: 'Supervisor' },
  });
  const roleEmployee = await prisma.role.upsert({
    where: { roleName: 'Employee' },
    update: {},
    create: { roleName: 'Employee' },
  });

  const userAdmin = await prisma.user.upsert({
    where: { email: 'reachtusharwani@gmail.com' },
    update: {},
    create: {
      name: 'Tushar Wani',
      email: 'reachtusharwani@gmail.com',
    },
  });

  const userRoleMappingAdmin = await prisma.userRoleMapping.create({
    data: {
      userId: userAdmin.id,
      roleId: roleAdmin.id,
    },
  });
}

main()
  .then(async () => {
    console.log('Seeding done.');
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
