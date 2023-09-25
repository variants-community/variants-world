/*
  Warnings:

  - Added the required column `fen` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "fen" TEXT NOT NULL;
