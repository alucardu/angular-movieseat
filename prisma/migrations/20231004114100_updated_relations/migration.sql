/*
  Warnings:

  - You are about to drop the column `actorId` on the `PersonMovie` table. All the data in the column will be lost.
  - Added the required column `personId` to the `PersonMovie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_movieId_fkey";

-- DropForeignKey
ALTER TABLE "PersonMovie" DROP CONSTRAINT "PersonMovie_actorId_fkey";

-- AlterTable
ALTER TABLE "PersonMovie" DROP COLUMN "actorId",
ADD COLUMN     "personId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PersonMovie" ADD CONSTRAINT "PersonMovie_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
