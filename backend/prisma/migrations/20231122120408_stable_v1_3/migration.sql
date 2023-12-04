/*
  Warnings:

  - A unique constraint covering the columns `[roleName]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dueDate` to the `onboarding_employee_task_mapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "onboarding_employee_task_mapping" ADD COLUMN     "dateApproved" TIMESTAMP(3),
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Role_roleName_key" ON "Role"("roleName");
