/*
  Warnings:

  - The `runtime` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "runtime",
ADD COLUMN     "runtime" INTEGER;
