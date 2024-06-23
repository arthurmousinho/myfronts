/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `imageUUID` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "imageURL",
DROP COLUMN "imageUUID",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_imageId_key" ON "Project"("imageId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
