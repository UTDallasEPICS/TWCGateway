/*
  Warnings:

  - You are about to drop the column `archived` on the `Task` table. All the data in the column will be lost.
  - The `tag` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[departmentId]` on the table `DepartmentTaskMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `DepartmentUserMapping` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[taskId]` on the table `SupervisorTaskMapping` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DepartmentTaskMapping_taskId_key";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "archived",
DROP COLUMN "tag",
ADD COLUMN     "tag" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentTaskMapping_departmentId_key" ON "DepartmentTaskMapping"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentUserMapping_userId_key" ON "DepartmentUserMapping"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SupervisorTaskMapping_taskId_key" ON "SupervisorTaskMapping"("taskId");
