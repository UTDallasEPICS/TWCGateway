/*
  Warnings:

  - You are about to drop the column `supervisor_userID` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `_TaskToTaskList` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[departmentID]` on the table `tasklist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supervisorID` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskListID` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TaskToTaskList" DROP CONSTRAINT "_TaskToTaskList_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskToTaskList" DROP CONSTRAINT "_TaskToTaskList_B_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_supervisor_userID_fkey";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "supervisor_userID",
ADD COLUMN     "supervisorID" INTEGER NOT NULL,
ADD COLUMN     "taskListID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_TaskToTaskList";

-- CreateIndex
CREATE UNIQUE INDEX "tasklist_departmentID_key" ON "tasklist"("departmentID");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_departmentID_fkey" FOREIGN KEY ("departmentID") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_supervisorID_fkey" FOREIGN KEY ("supervisorID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_taskListID_fkey" FOREIGN KEY ("taskListID") REFERENCES "tasklist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
