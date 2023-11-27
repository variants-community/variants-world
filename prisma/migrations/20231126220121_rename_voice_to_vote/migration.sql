ALTER TABLE "Voice" DROP CONSTRAINT "Voice_postDetailsId_fkey";

ALTER TABLE "Voice" DROP CONSTRAINT "Voice_testerId_fkey";

ALTER TABLE "Voice" DROP CONSTRAINT "Voice_pkey";

DROP INDEX "Voice_testerId_postDetailsId_key";



ALTER TABLE "Voice" RENAME TO "Vote";



CREATE UNIQUE INDEX "Vote_testerId_postDetailsId_key" ON "Vote"("testerId", "postDetailsId");

ALTER TABLE "Vote" ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("id");

ALTER TABLE "Vote" ADD CONSTRAINT "Vote_testerId_fkey" FOREIGN KEY ("testerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Vote" ADD CONSTRAINT "Vote_postDetailsId_fkey" FOREIGN KEY ("postDetailsId") REFERENCES "PostDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
