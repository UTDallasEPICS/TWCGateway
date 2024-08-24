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
      email: 'reachtusharwani@gmail.com',
      role: UserRole.ADMIN,
    },
  });

  const userAdmin2 = await prisma.user.create({
    data: {
      name: 'Brandy Lindsey',
      email: 'Brandy.Lindsey@thewarrencenter.org',
      role: UserRole.ADMIN,
    },
  });

  // ----------------------------------------------------

  const userSupervisor1 = await prisma.user.create({
    data: {
      name: 'Dana Dodgen',
      email: 'dana.dodgen@thewarrencenter.org',
      role: UserRole.SUPERVISOR,
    },
  });

  const userSupervisor2 = await prisma.user.create({
    data: {
      name: 'Maddie Trigg',
      email: 'maddie.trigg@thewarrencenter.org',
      role: UserRole.SUPERVISOR,
    },
  });

  const userSupervisor3 = await prisma.user.create({
    data: {
      name: 'Brandy Lindsey',
      email: 'bl@twc.org',
      role: UserRole.SUPERVISOR,
    },
  });

  // ----------------------------------------------------

  const userEmployee1 = await prisma.user.create({
    data: {
      name: 'Vivianne Cottingham',
      email: 'vivianne.cottingham@thewarrencenter.org',
      role: UserRole.EMPLOYEE,
    },
  });

  // ----------------------------------------------------

  const department1 = await prisma.department.create({
    data: {
      name: 'Basic Onboarding',
    },
  });

  // ----------------------------------------------------

  // Basic Onboarding
  // Pre-Hire
  const task1 = await prisma.task.create({
    data: {
      desc: 'Reviews Job Description',
      tag: 'Pre-Hire',
    },
  });

  const task2 = await prisma.task.create({
    data: {
      desc: 'Completes Requisition Form',
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
      desc: 'Forwards Approved Requisition Packet to COO',
      tag: 'Pre-Hire',
    },
  });

  const task5 = await prisma.task.create({
    data: {
      desc: 'Reviews Resumes',
      tag: 'Pre-Hire',
    },
  });

  const task6 = await prisma.task.create({
    data: {
      desc: 'Send Application to Candidate',
      tag: 'Pre-Hire',
    },
  });

  const task7 = await prisma.task.create({
    data: {
      desc: 'Screens Candidates',
      tag: 'Pre-Hire',
    },
  });

  const task8 = await prisma.task.create({
    data: {
      desc: 'Collects Application from Candidate',
      tag: 'Pre-Hire',
    },
  });

  const task9 = await prisma.task.create({
    data: {
      desc: 'Interviews Candidates',
      tag: 'Pre-Hire',
    },
  });

  const task10 = await prisma.task.create({
    data: {
      desc: 'Completes 3 Reference Checks',
      tag: 'Pre-Hire',
    },
  });

  const task11 = await prisma.task.create({
    data: {
      desc: 'Completes Candidate Form',
      tag: 'Pre-Hire',
    },
  });

  const task12 = await prisma.task.create({
    data: {
      desc: 'Sends Candidate Packet to Executives for approval',
      tag: 'Pre-Hire',
    },
  });

  const task13 = await prisma.task.create({
    data: {
      desc: 'Makes Verbal Offer',
      tag: 'Pre-Hire',
    },
  });

  const task14 = await prisma.task.create({
    data: {
      desc: 'Sends Fingerprinting instructions (within 48 hours)',
      tag: 'Pre-Hire',
    },
  });

  const task15 = await prisma.task.create({
    data: {
      desc: 'Forwards Candidate Packet to COO',
      tag: 'Pre-Hire',
    },
  });

  const task16 = await prisma.task.create({
    data: {
      desc: 'Post Job Internally & Externally',
      tag: 'Pre-Hire',
    },
  });

  const task17 = await prisma.task.create({
    data: {
      desc: 'Generates Written Offer letter for CEO to sign',
      tag: 'Pre-Hire',
    },
  });

  const task18 = await prisma.task.create({
    data: {
      desc: 'Sends candidate welcome email (offer letter, I-9 info and first day paperwork)',
      tag: 'Pre-Hire',
    },
  });

  const task19 = await prisma.task.create({
    data: {
      desc: 'Submits New User Creation Information to Meriplex',
      tag: 'Pre-Hire',
    },
  });

  const task20 = await prisma.task.create({
    data: {
      desc: 'Verifies Email Groups are Setup',
      tag: 'Pre-Hire',
    },
  });

  const task21 = await prisma.task.create({
    data: {
      desc: 'Sends Josette and Anthony new hire information',
      tag: 'Pre-Hire',
    },
  });

  const task22 = await prisma.task.create({
    data: {
      desc: 'Runs VeriFYI background check',
      tag: 'Pre-Hire',
    },
  });

  const task23 = await prisma.task.create({
    data: {
      desc: 'Verifies License',
      tag: 'Pre-Hire',
    },
  });

  const task24 = await prisma.task.create({
    data: {
      desc: 'Insider Announcement',
      tag: 'Pre-Hire',
    },
  });

  const task25 = await prisma.task.create({
    data: {
      desc: 'Add employee to Org Chart',
      tag: 'Pre-Hire',
    },
  });

  const task26 = await prisma.task.create({
    data: {
      desc: 'Sets up Orientation/Trainings with other departments',
      tag: 'Pre-Hire',
    },
  });

  const task27 = await prisma.task.create({
    data: {
      desc: 'Welcome Email with first day instructions',
      tag: 'Pre-Hire',
    },
  });

  const task28 = await prisma.task.create({
    data: {
      desc: 'Identify Desk',
      tag: 'Pre-Hire',
    },
  });

  const task29 = await prisma.task.create({
    data: {
      desc: 'Welcome Sign',
      tag: 'Pre-Hire',
    },
  });

  const task30 = await prisma.task.create({
    data: {
      desc: 'TWC T-shirt',
      tag: 'Pre-Hire',
    },
  });

  const task31 = await prisma.task.create({
    data: {
      desc: 'Prepares Desk',
      tag: 'Pre-Hire',
    },
  });

  // First Day
  const task32 = await prisma.task.create({
    data: {
      desc: 'Insperity portal introduction',
      tag: 'First Day',
    },
  });

  const task33 = await prisma.task.create({
    data: {
      desc: 'Tuberculosis Questionnaire',
      tag: 'First Day',
    },
  });

  const task34 = await prisma.task.create({
    data: {
      desc: "Collect HR documents: Driver's license & auto Insurance, license, transcripts, CPR, direct deposit",
      tag: 'First Day',
    },
  });

  const task35 = await prisma.task.create({
    data: {
      desc: "Schedule 15 minutes to meet each C-Suite during staff's first week",
      tag: 'First Day',
    },
  });

  const task36 = await prisma.task.create({
    data: {
      desc: 'Add employee to RingCentral app + setup sim card',
      tag: 'First Day',
    },
  });

  const task37 = await prisma.task.create({
    data: {
      desc: 'Add to check-in iPad',
      tag: 'First Day',
    },
  });

  const task38 = await prisma.task.create({
    data: {
      desc: 'Favorites Form completed & saved in Common Drive',
      tag: 'First Day',
    },
  });

  const task39 = await prisma.task.create({
    data: {
      desc: 'Strengths Finder completed & top 5 saved on spreadsheet in common drive',
      tag: 'First Day',
    },
  });

  const task40 = await prisma.task.create({
    data: {
      desc: 'E-Verify',
      tag: 'First Day',
    },
  });

  const task41 = await prisma.task.create({
    data: {
      desc: 'Issues IT equipment and logins',
      tag: 'First Day',
    },
  });

  const task42 = await prisma.task.create({
    data: {
      desc: 'Collects Asset/Equipment Agreement',
      tag: 'First Day',
    },
  });

  const task43 = await prisma.task.create({
    data: {
      desc: 'Add staff new CEU spreadsheet',
      tag: 'First Day',
    },
  });

  const task44 = await prisma.task.create({
    data: {
      desc: 'Explain CEU Requirement',
      tag: 'First Day',
    },
  });

  const task45 = await prisma.task.create({
    data: {
      desc: 'Order Business Cards',
      tag: 'First Day',
    },
  });

  const task46 = await prisma.task.create({
    data: {
      desc: 'Explains 401k',
      tag: 'First Day',
    },
  });

  const task47 = await prisma.task.create({
    data: {
      desc: 'Explains Aflac',
      tag: 'First Day',
    },
  });

  const task48 = await prisma.task.create({
    data: {
      desc: 'Enters new staff into Aflac + Fidelity portal (even if they are not opting in)',
      tag: 'First Day',
    },
  });

  const task49 = await prisma.task.create({
    data: {
      desc: 'Issues Keycard',
      tag: 'First Day',
    },
  });

  const task50 = await prisma.task.create({
    data: {
      desc: 'Email to employee supervisor: Favorites Form, Top 5 Strengths',
      tag: 'First Day',
    },
  });

  const task51 = await prisma.task.create({
    data: {
      desc: 'HIPAA Policy & Procedures Agreements',
      tag: 'First Day',
    },
  });

  const task52 = await prisma.task.create({
    data: {
      desc: "Complete Strength's Finder",
      tag: 'First Day',
    },
  });

  const task53 = await prisma.task.create({
    data: {
      desc: 'Explains RingCentral App',
      tag: 'First Day',
    },
  });

  const task54 = await prisma.task.create({
    data: {
      desc: 'Risk Management Explanation + Overview',
      tag: 'First Day',
    },
  });

  const task55 = await prisma.task.create({
    data: {
      desc: 'Explains Triplog App and mileage procedures for ECI staff',
      tag: 'First Day',
    },
  });

  const task56 = await prisma.task.create({
    data: {
      desc: 'Provide t-shirt to new hire, take picture wearing shirt, save in Common Drive, print and attach to employee poster',
      tag: 'First Day',
    },
  });

  const task57 = await prisma.task.create({
    data: {
      desc: 'Assign HIPAA and IT Security Courses',
      tag: 'First Day',
    },
  });

  const task58 = await prisma.task.create({
    data: {
      desc: 'Staff completes KnowBe4 training',
      tag: 'First Day',
    },
  });

  // 90 Days Post-Start

  const task59 = await prisma.task.create({
    data: {
      desc: '90 Follow-up questions and meeting',
      tag: '90 Days Post-Start',
    },
  });

  const task60 = await prisma.task.create({
    data: {
      desc: '401k deductions to begin - confirm staff would like to enroll in 401k',
      tag: '90 Days Post-Start',
    },
  });

  // ----------------------------------------------------

  await prisma.departmentUserMapping.create({
    data: {
      user: { connect: { id: userEmployee1.id } },
      department: { connect: { id: department1.id } },
    },
  });

  // ----------------------------------------------------

  for (let i = 1; i <= 60; i++) {
    await prisma.departmentTaskMapping.create({
      data: {
        task: { connect: { id: eval(`task${i}.id`) } },
        department: { connect: { id: department1.id } },
      },
    });
  }

  // ----------------------------------------------------

  for (let i = 1; i <= 60; i++) {
    await prisma.onboardingEmployeeTaskMapping.create({
      data: {
        user: { connect: { id: userEmployee1.id } },
        task: { connect: { id: eval(`task${i}.id`) } },
        department: { connect: { id: department1.id } },
      },
    });
  }

  // ----------------------------------------------------

  // Brandy Lindsey
  await prisma.supervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor3.id } },
      task: { connect: { id: task1.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.supervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor3.id } },
      task: { connect: { id: task14.id } },
      department: { connect: { id: department1.id } },
    },
  });

  for (let i = 16; i <= 25; i++) {
    await prisma.supervisorTaskMapping.create({
      data: {
        user: { connect: { id: userSupervisor3.id } },
        task: { connect: { id: eval(`task${i}.id`) } },
        department: { connect: { id: department1.id } },
      },
    });
  }

  await prisma.supervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor3.id } },
      task: { connect: { id: task27.id } },
      department: { connect: { id: department1.id } },
    },
  });

  for (let i = 29; i <= 30; i++) {
    await prisma.supervisorTaskMapping.create({
      data: {
        user: { connect: { id: userSupervisor3.id } },
        task: { connect: { id: eval(`task${i}.id`) } },
        department: { connect: { id: department1.id } },
      },
    });
  }

  for (let i = 32; i <= 60; i++) {
    await prisma.supervisorTaskMapping.create({
      data: {
        user: { connect: { id: userSupervisor3.id } },
        task: { connect: { id: eval(`task${i}.id`) } },
        department: { connect: { id: department1.id } },
      },
    });
  }

  // Dana Dodgen
  for (let i = 2; i <= 13; i++) {
    await prisma.supervisorTaskMapping.create({
      data: {
        user: { connect: { id: userSupervisor1.id } },
        task: { connect: { id: eval(`task${i}.id`) } },
        department: { connect: { id: department1.id } },
      },
    });
  }

  await prisma.supervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor1.id } },
      task: { connect: { id: task15.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.supervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor1.id } },
      task: { connect: { id: task26.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.supervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor1.id } },
      task: { connect: { id: task28.id } },
      department: { connect: { id: department1.id } },
    },
  });

  await prisma.supervisorTaskMapping.create({
    data: {
      user: { connect: { id: userSupervisor1.id } },
      task: { connect: { id: task31.id } },
      department: { connect: { id: department1.id } },
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
