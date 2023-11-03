/*
  Warnings:

  - You are about to drop the column `githubLink` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinLink` on the `User` table. All the data in the column will be lost.
  - Added the required column `githubURL` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedinURL` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubLink",
DROP COLUMN "linkedinLink",
ADD COLUMN     "githubURL" TEXT NOT NULL,
ADD COLUMN     "linkedinURL" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repositoryURL" TEXT NOT NULL,
    "projectURL" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
