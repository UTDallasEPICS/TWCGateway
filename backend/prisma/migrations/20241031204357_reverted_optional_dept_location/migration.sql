/*
  Warnings:

  - Made the column `departmentId` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locationId` on table `Device` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_locationId_fkey";

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "departmentId" SET NOT NULL,
ALTER COLUMN "locationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
