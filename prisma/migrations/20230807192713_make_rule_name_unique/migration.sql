-- SQLBook: Code
/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `GameRule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GameRule_name_key" ON "GameRule"("name");
