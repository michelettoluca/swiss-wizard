/*
  Warnings:

  - You are about to drop the column `description` on the `Tournament` table. All the data in the column will be lost.
  - Added the required column `format` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "description",
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "roundLimit" INTEGER,
ADD COLUMN     "timeLimit" INTEGER NOT NULL DEFAULT 55;
