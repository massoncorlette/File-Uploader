/*
  Warnings:

  - Added the required column `fileName` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "fileName" TEXT NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT;
