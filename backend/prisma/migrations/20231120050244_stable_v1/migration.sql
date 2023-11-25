/*
  Warnings:

  - You are about to drop the column `archived` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `dateCompleted` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreated` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_DepartmentToTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DepartmentToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TaskToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DepartmentToTask" DROP CONSTRAINT "_DepartmentToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToTask" DROP CONSTRAINT "_DepartmentToTask_B_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToUser" DROP CONSTRAINT "_DepartmentToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToUser" DROP CONSTRAINT "_DepartmentToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_TaskToUser" DROP CONSTRAINT "_TaskToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskToUser" DROP CONSTRAINT "_TaskToUser_B_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "archived",
DROP COLUMN "completed",
DROP COLUMN "dateCompleted",
DROP COLUMN "dateCreated";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "_DepartmentToTask";

-- DropTable
DROP TABLE "_DepartmentToUser";

-- DropTable
DROP TABLE "_TaskToUser";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRoleMapping" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserRoleMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentTaskMapping" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "DepartmentTaskMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentUserMapping" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "DepartmentUserMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApproverTaskMapping" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "ApproverTaskMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnboardingEmployeeTaskMapping" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "OnboardingEmployeeTaskMapping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRoleMapping" ADD CONSTRAINT "UserRoleMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoleMapping" ADD CONSTRAINT "UserRoleMapping_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentTaskMapping" ADD CONSTRAINT "DepartmentTaskMapping_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentTaskMapping" ADD CONSTRAINT "DepartmentTaskMapping_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentUserMapping" ADD CONSTRAINT "DepartmentUserMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentUserMapping" ADD CONSTRAINT "DepartmentUserMapping_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApproverTaskMapping" ADD CONSTRAINT "ApproverTaskMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApproverTaskMapping" ADD CONSTRAINT "ApproverTaskMapping_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingEmployeeTaskMapping" ADD CONSTRAINT "OnboardingEmployeeTaskMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnboardingEmployeeTaskMapping" ADD CONSTRAINT "OnboardingEmployeeTaskMapping_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
