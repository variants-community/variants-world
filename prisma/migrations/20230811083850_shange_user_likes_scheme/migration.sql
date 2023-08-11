/*
  Warnings:

  - You are about to drop the `_UserLikedPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserLikedPosts" DROP CONSTRAINT "_UserLikedPosts_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedPosts" DROP CONSTRAINT "_UserLikedPosts_B_fkey";

-- DropTable
DROP TABLE "_UserLikedPosts";

-- CreateTable
CREATE TABLE "PostOnUserLikes" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PostOnUserLikes_pkey" PRIMARY KEY ("postId","userId")
);

-- AddForeignKey
ALTER TABLE "PostOnUserLikes" ADD CONSTRAINT "PostOnUserLikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnUserLikes" ADD CONSTRAINT "PostOnUserLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
