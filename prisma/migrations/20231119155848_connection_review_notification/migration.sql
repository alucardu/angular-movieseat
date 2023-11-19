/*
  Warnings:

  - A unique constraint covering the columns `[reviewId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reviewId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "reviewId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_reviewId_key" ON "Notification"("reviewId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
