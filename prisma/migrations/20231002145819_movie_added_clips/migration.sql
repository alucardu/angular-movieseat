-- CreateEnum
CREATE TYPE "Clip" AS ENUM ('id', 'name', 'key', 'site', 'type', 'official', 'published_at');

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "clips" "Clip"[];
