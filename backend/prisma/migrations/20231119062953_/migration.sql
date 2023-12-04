/*
  Warnings:

  - You are about to drop the column `taskListID` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `taskListID` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `departmentID` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `user_to_task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_departmentID_fkey";

-- DropForeignKey
ALTER TABLE "user_to_task" DROP CONSTRAINT "user_to_task_taskID_fkey";

-- DropForeignKey
ALTER TABLE "user_to_task" DROP CONSTRAINT "user_to_task_userID_fkey";

-- DropIndex
DROP INDEX "department_taskListID_key";

-- AlterTable
ALTER TABLE "department" DROP COLUMN "taskListID";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "taskListID",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateArchived" TIMESTAMP(3),
ADD COLUMN     "dateCompleted" TIMESTAMP(3),
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "departmentID";

-- DropTable
DROP TABLE "user_to_task";

-- CreateTable
CREATE TABLE "_DepartmentToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToUser_AB_unique" ON "_DepartmentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToUser_B_index" ON "_DepartmentToUser"("B");

-- AddForeignKey
ALTER TABLE "_DepartmentToUser" ADD CONSTRAINT "_DepartmentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToUser" ADD CONSTRAINT "_DepartmentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
