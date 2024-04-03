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
    where: { email: 'admin2@admin2.com' },
    update: {},
    create: {
      name: 'Admin2',
      email: 'admin2@admin2.com',
      role: UserRole.ADMIN,
    },
  });

  // ----------------------------------------------------

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

  // ----------------------------------------------------

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

  // ----------------------------------------------------

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

  // ----------------------------------------------------

  const task1 = await prisma.task.upsert({
    where: { desc: 'Reviews Job Description' },
    update: {},
    create: {
      desc: 'Reviews Job Description',
      tag: 'Pre-Hire',
    },
  });

  const task2 = await prisma.task.upsert({
    where: { desc: 'Completes Requisition Form*' },
    update: {},
    create: {
      desc: 'Completes Requisition Form*',
      tag: 'Pre-Hire',
    },
  });

  const task3 = await prisma.task.upsert({
    where: { desc: 'Submits Requisition Packet To Executives for Approval' },
    update: {},
    create: {
      desc: 'Submits Requisition Packet To Executives for Approval',
      tag: 'Pre-Hire',
    },
  });

  const task4 = await prisma.task.upsert({
    where: { desc: 'Insperity portal introduction ' },
    update: {},
    create: {
      desc: 'Insperity portal introduction ',
      tag: 'First Day',
    },
  });

  const task5 = await prisma.task.upsert({
    where: {
      desc: `Collect HR documents: Driver's license & Auto Insurance, license,transcripts, CPR, direct deposit `,
    },
    update: {},
    create: {
      desc: `Collect HR documents: Driver's license & Auto Insurance, license,transcripts, CPR, direct deposit `,
      tag: 'First Day',
    },
  });

  const task6 = await prisma.task.upsert({
    where: {
      desc: `Schedule 30 minutes for Amy Spawn to meet new staff`,
    },
    update: {},
    create: {
      desc: `Schedule 30 minutes for Amy Spawn to meet new staff`,
      tag: 'First Day',
    },
  });

  const task7 = await prisma.task.upsert({
    where: {
      desc: `Tour Office (supplies, office equipment, alarm, etc.) `,
    },
    update: {},
    create: {
      desc: `Tour Office (supplies, office equipment, alarm, etc.) `,
      tag: 'First Day',
    },
  });

  const task8 = await prisma.task.upsert({
    where: {
      desc: `Computer usage (VPN, Email Signature, Drives, Room scheduling calendar)`,
    },
    update: {},
    create: {
      desc: `Computer usage (VPN, Email Signature, Drives, Room scheduling calendar)`,
      tag: 'First Day',
    },
  });

  const task9 = await prisma.task.upsert({
    where: {
      desc: `Required Trainings (Confidentiality, Universal Precautions, Safety, etc)`,
    },
    update: {},
    create: {
      desc: `Required Trainings (Confidentiality, Universal Precautions, Safety, etc)`,
      tag: 'First Day',
    },
  });

  const task10 = await prisma.task.upsert({
    where: {
      desc: `How to work with translators and guidelines for…(ie., need one and talking to parents, not translators)`,
    },
    update: {},
    create: {
      desc: `How to work with translators and guidelines for…(ie., need one and talking to parents, not translators)`,
      tag: 'First Week',
    },
  });

  const task11 = await prisma.task.upsert({
    where: {
      desc: `Scheduled Observations: Visits, Initial Evaluation, Re-evaluation, parent communicationmomen`,
    },
    update: {},
    create: {
      desc: `Scheduled Observations: Visits, Initial Evaluation, Re-evaluation, parent communicationmomen`,
      tag: 'First Week',
    },
  });

  const task12 = await prisma.task.upsert({
    where: {
      desc: `Insurance 101 - timelines, scoring cut-offs, billing codes, etc. `,
    },
    update: {},
    create: {
      desc: `Insurance 101 - timelines, scoring cut-offs, billing codes, etc. `,
      tag: 'First Week',
    },
  });
  // ----------------------------------------------------

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
      department: { connect: { id: department2.id } },
    },
  });

  // ----------------------------------------------------

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task1.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task2.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task3.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task4.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task5.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task6.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task7.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task8.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task9.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task10.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task11.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.departmentTaskMapping.create({
    data: {
      task: { connect: { id: task12.id } },
      department: { connect: { id: department2.id } },
    },
  });

  // ----------------------------------------------------

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
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task3.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task4.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task5.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task6.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task7.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task8.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task9.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task10.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task11.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      task: { connect: { id: task12.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee2.id } },
      task: { connect: { id: task7.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee2.id } },
      task: { connect: { id: task8.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee2.id } },
      task: { connect: { id: task9.id } },
      department: { connect: { id: department2.id } },
    },
  });
  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee2.id } },
      task: { connect: { id: task10.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee2.id } },
      task: { connect: { id: task11.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee2.id } },
      task: { connect: { id: task12.id } },
      department: { connect: { id: department2.id } },
    },
  });

  // ----------------------------------------------------

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor1.id } },
      task: { connect: { id: task1.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor1.id } },
      task: { connect: { id: task7.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor1.id } },
      task: { connect: { id: task2.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor1.id } },
      task: { connect: { id: task8.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.supervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor1.id } },
      task: { connect: { id: task3.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor1.id } },
      task: { connect: { id: task9.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor2.id } },
      task: { connect: { id: task4.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor2.id } },
      task: { connect: { id: task10.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor2.id } },
      task: { connect: { id: task5.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor2.id } },
      task: { connect: { id: task11.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor2.id } },
      task: { connect: { id: task6.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor2.id } },
      task: { connect: { id: task12.id } },
      department: { connect: { id: department2.id } },
    },
  });

  // ----------------------------------------------------
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
