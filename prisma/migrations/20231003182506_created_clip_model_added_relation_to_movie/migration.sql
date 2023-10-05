/*
  Warnings:

  - You are about to drop the column `clips` on the `Movie` table. All the data in the column will be lost.
  - Changed the type of `tmdb_id` on the `Movie` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `poster_path` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `backdrop_path` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `release_date` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `overview` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vote_average` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `runtime` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Movie_tmdb_id_key";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "clips",
DROP COLUMN "tmdb_id",
ADD COLUMN     "tmdb_id" INTEGER NOT NULL,
ALTER COLUMN "poster_path" SET NOT NULL,
ALTER COLUMN "backdrop_path" SET NOT NULL,
ALTER COLUMN "release_date" SET NOT NULL,
ALTER COLUMN "overview" SET NOT NULL,
ALTER COLUMN "vote_average" SET NOT NULL,
ALTER COLUMN "runtime" SET NOT NULL,
ALTER COLUMN "runtime" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "Clip";

-- CreateTable
CREATE TABLE "Clip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "official" BOOLEAN NOT NULL,
    "published_at" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "Clip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
