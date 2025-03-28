/*
  Warnings:

  - A unique constraint covering the columns `[faceitId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "faceitId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_faceitId_key" ON "User"("faceitId");
