/*
  Warnings:

  - A unique constraint covering the columns `[gameNr]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameNr` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "gameNr" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_gameNr_key" ON "Post"("gameNr");
