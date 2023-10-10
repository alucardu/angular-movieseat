-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_notificationId_fkey";

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "notificationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
