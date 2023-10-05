/*
  Warnings:

  - A unique constraint covering the columns `[tmdb_id]` on the table `Person` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_movieId_fkey";

-- DropForeignKey
ALTER TABLE "PersonMovie" DROP CONSTRAINT "PersonMovie_movieId_fkey";

-- DropForeignKey
ALTER TABLE "PersonMovie" DROP CONSTRAINT "PersonMovie_personId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Person_tmdb_id_key" ON "Person"("tmdb_id");

-- AddForeignKey
ALTER TABLE "PersonMovie" ADD CONSTRAINT "PersonMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonMovie" ADD CONSTRAINT "PersonMovie_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
