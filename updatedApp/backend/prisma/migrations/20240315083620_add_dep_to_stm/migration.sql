/*
  Warnings:

  - Added the required column `departmentId` to the `SupervisorTaskMapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SupervisorTaskMapping" ADD COLUMN     "departmentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SupervisorTaskMapping" ADD CONSTRAINT "SupervisorTaskMapping_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
