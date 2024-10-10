-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;
