/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
// npx prisma db seed
// Change the userAdmin with your email and name it whatever you want

const { PrismaClient, UserRole } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const userAdmin1 = await prisma.user.create({
    data: {
      name: 'Tushar Wani',
      email: 'reachtusharwani@gmail',
      role: UserRole.ADMIN,
    },
  });

  const userAdmin2 = await prisma.user.create({
    data: {
      name: 'Samikshaa Saiprakash',
      email: 'samikshaa.saiprakash@gmail.com',
      role: UserRole.ADMIN,
    },
  });

  const userAdmin3 = await prisma.user.create({
    data: {
      name: 'Sarah Park',
      email: 'pentasky2022@gmail.com',
      role: UserRole.ADMIN,
    },
  });

  const userAdmin4 = await prisma.user.create({
    data: {
      name: 'Isi Emordi',
      email: 'isi.emord1@gmail.com',
      role: UserRole.ADMIN,
    },
  });

  const userAdmin5 = await prisma.user.create({
    data: {
      name: 'Yusuf Shaikh',
      email: 'yshaikh113@outlook.com',
      role: UserRole.ADMIN,
    },
  });

  const userAdmin6 = await prisma.user.create({
    data: {
      name: 'Ahsan Amir',
      email: 'Ahsan.amir2004@gmail.com',
      role: UserRole.ADMIN,
    },
  });

  // ----------------------------------------------------

  const userSupervisor1 = await prisma.user.create({
    data: {
      name: 'John',
      email: 'john@john.com',
      role: UserRole.SUPERVISOR,
    },
  });

  const userSupervisor2 = await prisma.user.create({
    data: {
      name: 'Avery',
      email: 'avery@avery.com',
      role: UserRole.SUPERVISOR,
    },
  });

  const userSupervisor3 = await prisma.user.create({
    data: {
      name: 'Tushar (supervisor)',
      email: 'tws@gmail.com',
      role: UserRole.SUPERVISOR,
    },
  });

  // ----------------------------------------------------

  const userEmployee1 = await prisma.user.create({
    data: {
      name: 'Employee1',
      email: 'employee1@employee1.com',
      role: UserRole.EMPLOYEE,
    },
  });

  const userEmployee2 = await prisma.user.create({
    data: {
      name: 'Employee2',
      email: 'employee2@employee2.com',
      role: UserRole.EMPLOYEE,
    },
  });

  const userEmployee3 = await prisma.user.create({
    data: {
      name: 'Tushar (employee)',
      email: 'twe@gmail.com',
      role: UserRole.EMPLOYEE,
    },
  });

  // ----------------------------------------------------

  const department1 = await prisma.department.create({
    data: {
      name: 'Basic Onboarding',
    },
  });

  const department2 = await prisma.department.create({
    data: {
      name: 'Clinic',
    },
  });

  // ----------------------------------------------------

  const task1 = await prisma.task.create({
    data: {
      desc: 'Reviews Job Description',
      tag: 'Pre-Hire',
    },
  });

  const task2 = await prisma.task.create({
    data: {
      desc: 'Completes Requisition Form*',
      tag: 'Pre-Hire',
    },
  });

  const task3 = await prisma.task.create({
    data: {
      desc: 'Submits Requisition Packet To Executives for Approval',
      tag: 'Pre-Hire',
    },
  });

  const task4 = await prisma.task.create({
    data: {
      desc: 'Insperity portal introduction ',
      tag: 'First Day',
    },
  });

  const task5 = await prisma.task.create({
    data: {
      desc: `Collect HR documents: Driver's license & Auto Insurance, license,transcripts, CPR, direct deposit `,
      tag: 'First Day',
    },
  });

  const task6 = await prisma.task.create({
    data: {
      desc: `Schedule 30 minutes for Amy Spawn to meet new staff`,
      tag: 'First Day',
    },
  });

  const task7 = await prisma.task.create({
    data: {
      desc: `Tour Office (supplies, office equipment, alarm, etc.) `,
      tag: 'First Day',
    },
  });

  const task8 = await prisma.task.create({
    data: {
      desc: `Computer usage (VPN, Email Signature, Drives, Room scheduling calendar)`,
      tag: 'First Day',
    },
  });

  const task9 = await prisma.task.create({
    data: {
      desc: `Required Trainings (Confidentiality, Universal Precautions, Safety, etc)`,
      tag: 'First Day',
    },
  });

  const task10 = await prisma.task.create({
    data: {
      desc: `How to work with translators and guidelines for…(ie., need one and talking to parents, not translators)`,
      tag: 'First Week',
    },
  });

  const task11 = await prisma.task.create({
    data: {
      desc: `Scheduled Observations: Visits, Initial Evaluation, Re-evaluation, parent communicationmomen`,
      tag: 'First Week',
    },
  });

  const task12 = await prisma.task.create({
    data: {
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
      user: { connect: { id: userEmployee2.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.departmentUserMapping.create({
    data: {
      user: { connect: { id: userEmployee3.id } },
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
      department: { connect: { id: department2.id } },
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

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee3.id } },
      task: { connect: { id: task7.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee3.id } },
      task: { connect: { id: task8.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee3.id } },
      task: { connect: { id: task9.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee3.id } },
      task: { connect: { id: task10.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee3.id } },
      task: { connect: { id: task11.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.OnboardingEmployeeTaskMapping.create({
    data: {
      user: { connect: { id: userEmployee3.id } },
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

  // await prisma.SupervisorTaskMapping.create({
  //   data: {
  //     user: { connect: { id: userSupervisor2.id } },
  //     task: { connect: { id: task11.id } },
  //     department: { connect: { id: department2.id } },
  //   },
  // });

  // await prisma.SupervisorTaskMapping.create({
  //   data: {
  //     user: { connect: { id: userSupervisor2.id } },
  //     task: { connect: { id: task6.id } },
  //     department: { connect: { id: department2.id } },
  //   },
  // });

  // await prisma.SupervisorTaskMapping.create({
  //   data: {
  //     user: { connect: { id: userSupervisor2.id } },
  //     task: { connect: { id: task12.id } },
  //     department: { connect: { id: department2.id } },
  //   },
  // });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor3.id } },
      task: { connect: { id: task11.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor3.id } },
      task: { connect: { id: task6.id } },
      department: { connect: { id: department2.id } },
    },
  });

  await prisma.SupervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor3.id } },
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
