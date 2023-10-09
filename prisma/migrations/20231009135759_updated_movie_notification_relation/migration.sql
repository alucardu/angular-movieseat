/*
  Warnings:

  - You are about to drop the column `movieId` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[notificationId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `notificationId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_movieId_fkey";

-- DropIndex
DROP INDEX "Notification_movieId_key";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "notificationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "movieId";

-- CreateIndex
CREATE UNIQUE INDEX "Movie_notificationId_key" ON "Movie"("notificationId");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
