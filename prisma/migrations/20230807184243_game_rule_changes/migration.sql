/*
  Warnings:

  - You are about to drop the column `postId` on the `GameRule` table. All the data in the column will be lost.
  - You are about to drop the column `ruleTypeId` on the `GameRule` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `GameRule` table. All the data in the column will be lost.
  - You are about to drop the `RuleType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `GameRule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameRule" DROP CONSTRAINT "GameRule_postId_fkey";

-- DropForeignKey
ALTER TABLE "GameRule" DROP CONSTRAINT "GameRule_ruleTypeId_fkey";

-- DropIndex
DROP INDEX "GameRule_postId_ruleTypeId_key";

-- AlterTable
ALTER TABLE "GameRule" DROP COLUMN "postId",
DROP COLUMN "ruleTypeId",
DROP COLUMN "value",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "RuleType";

-- CreateTable
CREATE TABLE "_GameRuleToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameRuleToPost_AB_unique" ON "_GameRuleToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_GameRuleToPost_B_index" ON "_GameRuleToPost"("B");

-- AddForeignKey
ALTER TABLE "_GameRuleToPost" ADD CONSTRAINT "_GameRuleToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "GameRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameRuleToPost" ADD CONSTRAINT "_GameRuleToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
