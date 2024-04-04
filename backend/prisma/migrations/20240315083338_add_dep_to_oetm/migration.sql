/*
  Warnings:

  - Added the required column `departmentId` to the `OnboardingEmployeeTaskMapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnboardingEmployeeTaskMapping" ADD COLUMN     "departmentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OnboardingEmployeeTaskMapping" ADD CONSTRAINT "OnboardingEmployeeTaskMapping_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
