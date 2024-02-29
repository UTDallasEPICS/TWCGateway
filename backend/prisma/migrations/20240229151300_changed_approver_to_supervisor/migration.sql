/*
  Warnings:

  - You are about to drop the column `dueDate` on the `DepartmentTaskMapping` table. All the data in the column will be lost.
  - You are about to drop the `ApproverTaskMapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApproverTaskMapping" DROP CONSTRAINT "ApproverTaskMapping_taskId_fkey";

-- DropForeignKey
ALTER TABLE "ApproverTaskMapping" DROP CONSTRAINT "ApproverTaskMapping_userId_fkey";

-- AlterTable
ALTER TABLE "DepartmentTaskMapping" DROP COLUMN "dueDate";

-- DropTable
DROP TABLE "ApproverTaskMapping";

-- CreateTable
CREATE TABLE "SupervisorTaskMapping" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "SupervisorTaskMapping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SupervisorTaskMapping" ADD CONSTRAINT "SupervisorTaskMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupervisorTaskMapping" ADD CONSTRAINT "SupervisorTaskMapping_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
