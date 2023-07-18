-- CreateEnum
CREATE TYPE "VoteValue" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');

-- CreateEnum
CREATE TYPE "GameplayClassification" AS ENUM ('FIRST_POSITIVE', 'FIRST_NEGATIVE', 'SECOND_POSITIVE', 'SECOND_NEGATIVE');

-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('NCV', 'WOF');

-- CreateEnum
CREATE TYPE "GameClassification" AS ENUM ('MATERIALISTIC', 'TACTICAL', 'DYNAMIC', 'POSITIONAL', 'STRATEGIC', 'FORTUNE');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('ACCEPTED', 'DECLINED', 'PENDING_REPLY', 'UNDER_REVIEW');

-- CreateEnum
CREATE TYPE "RuleType" AS ENUM ('GAMEPLAY', 'TIMECONTROL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "isTester" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RuleType" NOT NULL,

    CONSTRAINT "GameRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voice" (
    "id" SERIAL NOT NULL,
    "value" "VoteValue" NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Voice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "GameType" NOT NULL,
    "status" "GameStatus" NOT NULL,
    "verdict" TEXT,
    "notes" TEXT,
    "gameClassification" "GameClassification",
    "gameplayClassification" "GameplayClassification",
    "authorUserId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameRuleToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LikedPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GameRule_name_key" ON "GameRule"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GameRuleToPost_AB_unique" ON "_GameRuleToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_GameRuleToPost_B_index" ON "_GameRuleToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LikedPosts_AB_unique" ON "_LikedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedPosts_B_index" ON "_LikedPosts"("B");

-- AddForeignKey
ALTER TABLE "Voice" ADD CONSTRAINT "Voice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voice" ADD CONSTRAINT "Voice_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameRuleToPost" ADD CONSTRAINT "_GameRuleToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "GameRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameRuleToPost" ADD CONSTRAINT "_GameRuleToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedPosts" ADD CONSTRAINT "_LikedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedPosts" ADD CONSTRAINT "_LikedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
