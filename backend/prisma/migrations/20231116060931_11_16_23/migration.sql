/*
  Warnings:

  - You are about to drop the column `completed` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreated` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `tasklist` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[taskListID]` on the table `department` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskListID` to the `department` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Supervisor', 'Employee');

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_taskListID_fkey";

-- DropForeignKey
ALTER TABLE "tasklist" DROP CONSTRAINT "tasklist_departmentID_fkey";

-- AlterTable
ALTER TABLE "department" ADD COLUMN     "taskListID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "completed",
DROP COLUMN "dateCreated",
ADD COLUMN     "departmentID" INTEGER,
ALTER COLUMN "taskListID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "tasklist";

-- CreateTable
CREATE TABLE "user_to_task" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "taskID" INTEGER NOT NULL,
    "deprecated" BOOLEAN NOT NULL DEFAULT false,
    "dateDeprecated" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "dateCompleted" TIMESTAMP(3),
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_to_task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "department_taskListID_key" ON "department"("taskListID");

-- AddForeignKey
ALTER TABLE "user_to_task" ADD CONSTRAINT "user_to_task_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_task" ADD CONSTRAINT "user_to_task_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_departmentID_fkey" FOREIGN KEY ("departmentID") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
