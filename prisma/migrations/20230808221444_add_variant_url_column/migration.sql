/*
  Warnings:

  - A unique constraint covering the columns `[variantLink]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variantLink` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "variantLink" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_variantLink_key" ON "Post"("variantLink");
