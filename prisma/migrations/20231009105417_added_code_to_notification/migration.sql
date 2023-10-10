/*
  Warnings:

  - Added the required column `code` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "code" TEXT NOT NULL;
