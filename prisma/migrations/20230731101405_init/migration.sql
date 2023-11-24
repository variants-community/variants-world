-- SQLBook: Code
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
CREATE TYPE "UserRole" AS ENUM ('TESTER', 'MEMBER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "GameType" NOT NULL,
    "status" "GameStatus" NOT NULL,
    "verdict" TEXT,
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
CREATE TABLE "PostDetails" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "notes" TEXT,
    "gameClassification" "GameClassification",
    "gameplayClassification" "GameplayClassification",

    CONSTRAINT "PostDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voice" (
    "id" SERIAL NOT NULL,
    "value" "VoteValue" NOT NULL,
    "testerId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Voice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuleType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RuleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRule" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "ruleTypeId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "GameRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserLikedPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PostDetails_postId_key" ON "PostDetails"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Voice_testerId_postId_key" ON "Voice"("testerId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "RuleType_name_key" ON "RuleType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GameRule_postId_ruleTypeId_key" ON "GameRule"("postId", "ruleTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikedPosts_AB_unique" ON "_UserLikedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikedPosts_B_index" ON "_UserLikedPosts"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostDetails" ADD CONSTRAINT "PostDetails_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voice" ADD CONSTRAINT "Voice_testerId_fkey" FOREIGN KEY ("testerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voice" ADD CONSTRAINT "Voice_postId_fkey" FOREIGN KEY ("postId") REFERENCES "PostDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRule" ADD CONSTRAINT "GameRule_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRule" ADD CONSTRAINT "GameRule_ruleTypeId_fkey" FOREIGN KEY ("ruleTypeId") REFERENCES "RuleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedPosts" ADD CONSTRAINT "_UserLikedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedPosts" ADD CONSTRAINT "_UserLikedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
