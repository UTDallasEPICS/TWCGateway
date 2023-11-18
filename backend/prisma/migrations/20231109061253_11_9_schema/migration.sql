/*
  Warnings:

  - You are about to drop the column `supervisorCuid` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `departmentID` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `user_to_task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentID` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "department" DROP CONSTRAINT "department_supervisorCuid_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_departmentID_fkey";

-- DropForeignKey
ALTER TABLE "user_to_task" DROP CONSTRAINT "user_to_task_taskID_fkey";

-- DropForeignKey
ALTER TABLE "user_to_task" DROP CONSTRAINT "user_to_task_userID_fkey";

-- AlterTable
ALTER TABLE "department" DROP COLUMN "supervisorCuid";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "departmentID",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "departmentID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "user_to_task";

-- CreateTable
CREATE TABLE "tasklist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "departmentID" INTEGER NOT NULL,
    "type" TEXT,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tasklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TaskToTaskList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskToTaskList_AB_unique" ON "_TaskToTaskList"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskToTaskList_B_index" ON "_TaskToTaskList"("B");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_supervisor_userID_fkey" FOREIGN KEY ("supervisor_userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasklist" ADD CONSTRAINT "tasklist_departmentID_fkey" FOREIGN KEY ("departmentID") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToTaskList" ADD CONSTRAINT "_TaskToTaskList_A_fkey" FOREIGN KEY ("A") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToTaskList" ADD CONSTRAINT "_TaskToTaskList_B_fkey" FOREIGN KEY ("B") REFERENCES "tasklist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
