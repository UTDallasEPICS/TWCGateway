/*
  Warnings:

  - The `tag` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[desc]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "tag",
ADD COLUMN     "tag" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Task_desc_key" ON "Task"("desc");
