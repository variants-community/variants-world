/*
  Warnings:

  - Added the required column `postDetailsId` to the `Voice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Voice" DROP CONSTRAINT "Voice_postId_fkey";

-- AlterTable
ALTER TABLE "Voice" ADD COLUMN     "postDetailsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Voice" ADD CONSTRAINT "Voice_postDetailsId_fkey" FOREIGN KEY ("postDetailsId") REFERENCES "PostDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
