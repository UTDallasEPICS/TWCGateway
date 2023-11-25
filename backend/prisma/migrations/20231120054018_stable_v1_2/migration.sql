/*
  Warnings:

  - You are about to drop the `OnboardingEmployeeTaskMapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OnboardingEmployeeTaskMapping" DROP CONSTRAINT "OnboardingEmployeeTaskMapping_taskId_fkey";

-- DropForeignKey
ALTER TABLE "OnboardingEmployeeTaskMapping" DROP CONSTRAINT "OnboardingEmployeeTaskMapping_userId_fkey";

-- DropTable
DROP TABLE "OnboardingEmployeeTaskMapping";

-- CreateTable
CREATE TABLE "onboarding_employee_task_mapping" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "approvedTask" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "onboarding_employee_task_mapping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "onboarding_employee_task_mapping" ADD CONSTRAINT "onboarding_employee_task_mapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_employee_task_mapping" ADD CONSTRAINT "onboarding_employee_task_mapping_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
