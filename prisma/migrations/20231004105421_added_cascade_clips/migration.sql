-- DropForeignKey
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_movieId_fkey";

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
