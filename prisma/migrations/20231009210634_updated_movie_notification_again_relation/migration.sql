/*
  Warnings:

  - You are about to drop the column `notificationId` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `movieId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_notificationId_fkey";

-- DropIndex
DROP INDEX "Movie_notificationId_key";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "notificationId";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
