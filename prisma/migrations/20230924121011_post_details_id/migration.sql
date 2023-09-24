/*
  Warnings:

  - You are about to drop the column `postId` on the `Voice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[testerId,postDetailsId]` on the table `Voice` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Voice_testerId_postId_key";

-- AlterTable
ALTER TABLE "Voice" DROP COLUMN "postId";

-- CreateIndex
CREATE UNIQUE INDEX "Voice_testerId_postDetailsId_key" ON "Voice"("testerId", "postDetailsId");
