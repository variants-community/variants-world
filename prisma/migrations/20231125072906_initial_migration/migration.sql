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
CREATE TABLE "Session" (
    "cookie" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "metadata" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("cookie")
);

-- CreateTable
CREATE TABLE "PostOnUserLikes" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PostOnUserLikes_pkey" PRIMARY KEY ("postId","userId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profileUrl" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "refreshToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "gameNr" INTEGER NOT NULL,
    "fen" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "GameType" NOT NULL DEFAULT 'NCV',
    "status" "GameStatus" NOT NULL,
    "verdict" TEXT,
    "authorUserId" INTEGER NOT NULL,
    "variantLink" TEXT NOT NULL,

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
    "hidden" BOOLEAN NOT NULL DEFAULT false,

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
    "postDetailsId" INTEGER NOT NULL,

    CONSTRAINT "Voice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GameRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameRuleToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_gameNr_key" ON "Post"("gameNr");

-- CreateIndex
CREATE UNIQUE INDEX "Post_variantLink_key" ON "Post"("variantLink");

-- CreateIndex
CREATE UNIQUE INDEX "PostDetails_postId_key" ON "PostDetails"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Voice_testerId_postDetailsId_key" ON "Voice"("testerId", "postDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "GameRule_name_key" ON "GameRule"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GameRuleToPost_AB_unique" ON "_GameRuleToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_GameRuleToPost_B_index" ON "_GameRuleToPost"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnUserLikes" ADD CONSTRAINT "PostOnUserLikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnUserLikes" ADD CONSTRAINT "PostOnUserLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostDetails" ADD CONSTRAINT "PostDetails_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voice" ADD CONSTRAINT "Voice_testerId_fkey" FOREIGN KEY ("testerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voice" ADD CONSTRAINT "Voice_postDetailsId_fkey" FOREIGN KEY ("postDetailsId") REFERENCES "PostDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameRuleToPost" ADD CONSTRAINT "_GameRuleToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "GameRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameRuleToPost" ADD CONSTRAINT "_GameRuleToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
