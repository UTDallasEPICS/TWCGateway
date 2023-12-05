/*
  Warnings:

  - You are about to drop the column `approvedTask` on the `OnboardingEmployeeTaskMapping` table. All the data in the column will be lost.
  - You are about to drop the column `dateApproved` on the `OnboardingEmployeeTaskMapping` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreated` on the `OnboardingEmployeeTaskMapping` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `OnboardingEmployeeTaskMapping` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OnboardingEmployeeTaskMapping" DROP COLUMN "approvedTask",
DROP COLUMN "dateApproved",
DROP COLUMN "dateCreated",
DROP COLUMN "dueDate",
ADD COLUMN     "dateCompleted" TIMESTAMP(3),
ADD COLUMN     "taskCompleted" BOOLEAN NOT NULL DEFAULT false;
