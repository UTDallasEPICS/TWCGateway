/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRoleMapping` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SUPERVISOR', 'EMPLOYEE');

-- DropForeignKey
ALTER TABLE "UserRoleMapping" DROP CONSTRAINT "UserRoleMapping_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoleMapping" DROP CONSTRAINT "UserRoleMapping_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL;

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "UserRoleMapping";

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");
