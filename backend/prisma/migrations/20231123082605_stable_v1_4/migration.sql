/*
  Warnings:

  - You are about to drop the `onboarding_employee_task_mapping` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dueDate` to the `DepartmentTaskMapping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "onboarding_employee_task_mapping" DROP CONSTRAINT "onboarding_employee_task_mapping_taskId_fkey";

-- DropForeignKey
ALTER TABLE "onboarding_employee_task_mapping" DROP CONSTRAINT "onboarding_employee_task_mapping_userId_fkey";

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "DepartmentTaskMapping" ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "onboarding_employee_task_mapping";

-- CreateTable
CREATE TABLE "OnboardingEmployeeTaskMapping" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "approvedTask" BOOLEAN NOT NULL DEFAULT false,
    "dateApproved" TIMESTAMP(3),
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingEmployeeTaskMapping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OnboardingEmployeeTaskMapping" ADD CONSTRAINT "OnboardingEmployeeTaskMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingEmployeeTaskMapping" ADD CONSTRAINT "OnboardingEmployeeTaskMapping_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
