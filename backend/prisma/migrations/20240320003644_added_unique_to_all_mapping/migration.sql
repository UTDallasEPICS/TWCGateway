/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `DepartmentUserMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departmentId]` on the table `DepartmentUserMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `OnboardingEmployeeTaskMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[taskId]` on the table `OnboardingEmployeeTaskMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departmentId]` on the table `OnboardingEmployeeTaskMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `SupervisorTaskMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[taskId]` on the table `SupervisorTaskMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departmentId]` on the table `SupervisorTaskMapping` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DepartmentUserMapping_userId_key" ON "DepartmentUserMapping"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentUserMapping_departmentId_key" ON "DepartmentUserMapping"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingEmployeeTaskMapping_userId_key" ON "OnboardingEmployeeTaskMapping"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingEmployeeTaskMapping_taskId_key" ON "OnboardingEmployeeTaskMapping"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingEmployeeTaskMapping_departmentId_key" ON "OnboardingEmployeeTaskMapping"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "SupervisorTaskMapping_userId_key" ON "SupervisorTaskMapping"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SupervisorTaskMapping_taskId_key" ON "SupervisorTaskMapping"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "SupervisorTaskMapping_departmentId_key" ON "SupervisorTaskMapping"("departmentId");
