/*
  Warnings:

  - The values [LOCKED] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;

DROP POLICY "Allow select post details for testers only" ON "PostDetails";
DROP POLICY "Allow update post details for testers only" ON "PostDetails";
DROP POLICY "Allow update posts for testers only" ON "Post";
DROP POLICY "Allow update comments for testers only" ON "Comment";


CREATE TYPE "UserRole_new" AS ENUM ('TESTER', 'MEMBER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TABLE "User"
ALTER COLUMN "role" TYPE "UserRole_new"
USING (
    CASE role
        WHEN 'TESTER' THEN 'TESTER'::"UserRole_new"
        WHEN 'MEMBER' THEN 'MEMBER'::"UserRole_new"
        ELSE 'MEMBER'::"UserRole_new"
    END
);
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'MEMBER';

-- restore polices
create policy "Allow select post details for testers only"
on "public"."PostDetails"
as PERMISSIVE
for SELECT
to authenticated
using (
  (EXISTS ( SELECT 1
   FROM "User"
  WHERE (("User".role = 'TESTER'::"UserRole") AND ("User".uuid = (auth.uid())::text))))
);

create policy "Allow update post details for testers only"
on "public"."PostDetails"
as PERMISSIVE
for UPDATE
to authenticated
using (
  (EXISTS ( SELECT 1
   FROM "User"
  WHERE (("User".role = 'TESTER'::"UserRole") AND ("User".uuid = (auth.uid())::text))))
) with check (
    (EXISTS ( SELECT 1
   FROM "User"
  WHERE (("User".role = 'TESTER'::"UserRole") AND ("User".uuid = (auth.uid())::text))))
);

create policy "Allow update posts for testers only"
on "public"."Post"
as PERMISSIVE
for UPDATE
to authenticated
using (
  (EXISTS ( SELECT 1
   FROM "User"
  WHERE (("User".role = 'TESTER'::"UserRole") AND ("User".uuid = (auth.uid())::text))))
) with check (
    (EXISTS ( SELECT 1
   FROM "User"
  WHERE (("User".role = 'TESTER'::"UserRole") AND ("User".uuid = (auth.uid())::text))))
);

create policy "Allow update comments for testers only"
on "public"."Comment"
as PERMISSIVE
for UPDATE
to authenticated
using (
(EXISTS ( SELECT 1
   FROM "User"
   WHERE (("User".role = 'TESTER'::"UserRole") AND ("User".uuid = (auth.uid())::text))))
) with check (
  (EXISTS ( SELECT 1
    FROM "User"
  WHERE (("User".role = 'TESTER'::"UserRole") AND ("User".uuid = (auth.uid())::text))))
);

COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lockedUntil" TIMESTAMP(3);
