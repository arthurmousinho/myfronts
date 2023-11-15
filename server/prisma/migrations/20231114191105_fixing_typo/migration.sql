/*
  Warnings:

  - You are about to drop the column `useranme` on the `User` table. All the data in the column will be lost.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "useranme",
ADD COLUMN     "username" TEXT NOT NULL;
