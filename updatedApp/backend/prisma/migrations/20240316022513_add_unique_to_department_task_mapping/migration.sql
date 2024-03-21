/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `DepartmentTaskMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departmentId]` on the table `DepartmentTaskMapping` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DepartmentTaskMapping_taskId_key" ON "DepartmentTaskMapping"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentTaskMapping_departmentId_key" ON "DepartmentTaskMapping"("departmentId");
