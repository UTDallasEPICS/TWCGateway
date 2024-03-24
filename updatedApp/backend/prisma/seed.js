/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
// npx prisma db seed
// Change the userAdmin with your email and name it whatever you want

const { PrismaClient, UserRole } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const userAdmin1 = await prisma.user.upsert({
    where: { email: 'reachtusharwani@gmail.com' },
    update: {},
    create: {
      name: 'Tushar Wani',
      email: 'reachtusharwani@gmail.com',
      role: UserRole.ADMIN,
    },
  });

  const userAdmin2 = await prisma.user.upsert({
    where: { email: 'samikshaa.saiprakash@gmail.com' },
    update: {},
    create: {
      name: 'Samikshaa Saiprakash',
      email: 'samikshaa.saiprakash@gmail.com',
      role: UserRole.ADMIN,
    },
  });

  const userSupervisor1 = await prisma.user.upsert({
    where: { email: 'john@john.com' },
    update: {},
    create: {
      name: 'John',
      email: 'john@john.com',
      role: UserRole.SUPERVISOR,
    },
  });

  const userSupervisor2 = await prisma.user.upsert({
    where: { email: 'avery@avery.com' },
    update: {},
    create: {
      name: 'Avery',
      email: 'avery@avery.com',
      role: UserRole.SUPERVISOR,
    },
  });

  const userEmployee1 = await prisma.user.upsert({
    where: { email: 'employee1@employee1.com' },
    update: {},
    create: {
      name: 'Employee1',
      email: 'employee1@employee1.com',
      role: UserRole.EMPLOYEE,
    },
  });

  const userEmployee2 = await prisma.user.upsert({
    where: { email: 'employee2@employee2.com' },
    update: {},
    create: {
      name: 'Employee2',
      email: 'employee2@employee2.com',
      role: UserRole.EMPLOYEE,
    },
  });

  const department1 = await prisma.department.upsert({
    where: { name: 'Basic Onboarding' },
    update: {},
    create: {
      name: 'Basic Onboarding',
    },
  });

  const department2 = await prisma.department.upsert({
    where: { name: 'Clinic' },
    update: {},
    create: {
      name: 'Clinic',
    },
  });

  const task1 = await prisma.task.upsert({
    where: { desc: 'task1' },
    update: {},
    create: {
      desc: 'task1',
      tag: 'pre-hire',
    },
  });

  const task2 = await prisma.task.upsert({
    where: { desc: 'task2' },
    update: {},
    create: {
      desc: 'task2',
      tag: 'first day',
    },
  });

  await prisma.departmentUserMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.departmentUserMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.departmentUserMapping.create({
    data: {
      user: { connect: { id: userEmployee2.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.departmentUserMapping.create({
    data: {
      user: { connect: { id: userEmployee2.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task1.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task2.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task1.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task2.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee2.id } },
      task: { connect: { id: task1.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee2.id } },
      task: { connect: { id: task2.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor1.id } },
      task: { connect: { id: task1.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor2.id } },
      task: { connect: { id: task2.id } },
      department: { connect: { id: department2.id } },
    },
  });
}

main()
  .then(async () => {
    console.log('Seeding done.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
