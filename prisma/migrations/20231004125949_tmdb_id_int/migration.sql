/*
  Warnings:

  - Changed the type of `tmdb_id` on the `Person` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "tmdb_id",
ADD COLUMN     "tmdb_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Person_tmdb_id_key" ON "Person"("tmdb_id");
