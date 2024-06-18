
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."GameClassification" AS ENUM (
    'MATERIALISTIC',
    'TACTICAL',
    'DYNAMIC',
    'POSITIONAL',
    'STRATEGIC',
    'FORTUNE'
);

ALTER TYPE "public"."GameClassification" OWNER TO "postgres";

CREATE TYPE "public"."GameStatus" AS ENUM (
    'ACCEPTED',
    'DECLINED',
    'PENDING_REPLY',
    'UNDER_REVIEW'
);

ALTER TYPE "public"."GameStatus" OWNER TO "postgres";

CREATE TYPE "public"."GameType" AS ENUM (
    'NCV',
    'WOF'
);

ALTER TYPE "public"."GameType" OWNER TO "postgres";

CREATE TYPE "public"."GameplayClassification" AS ENUM (
    'FIRST_POSITIVE',
    'FIRST_NEGATIVE',
    'SECOND_POSITIVE',
    'SECOND_NEGATIVE'
);

ALTER TYPE "public"."GameplayClassification" OWNER TO "postgres";

CREATE TYPE "public"."UserRole" AS ENUM (
    'TESTER',
    'MEMBER'
);

ALTER TYPE "public"."UserRole" OWNER TO "postgres";

CREATE TYPE "public"."VoteValue" AS ENUM (
    'POSITIVE',
    'NEGATIVE',
    'NEUTRAL'
);

ALTER TYPE "public"."VoteValue" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."Comment" (
    "id" integer NOT NULL,
    "content" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    "parent_id" integer,
    "hidden" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."Comment" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."Comment_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."Comment_id_seq" OWNED BY "public"."Comment"."id";

CREATE TABLE IF NOT EXISTS "public"."GameRule" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."GameRule" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."GameRule_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."GameRule_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."GameRule_id_seq" OWNED BY "public"."GameRule"."id";

CREATE TABLE IF NOT EXISTS "public"."Post" (
    "id" integer NOT NULL,
    "gameNr" integer NOT NULL,
    "fen" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "type" "public"."GameType" DEFAULT 'NCV'::"public"."GameType" NOT NULL,
    "status" "public"."GameStatus" NOT NULL,
    "verdict" "text",
    "authorUserId" integer NOT NULL,
    "variantLink" "text" NOT NULL
);

ALTER TABLE "public"."Post" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."PostDetails" (
    "id" integer NOT NULL,
    "postId" integer NOT NULL,
    "notes" "text",
    "gameClassification" "public"."GameClassification",
    "gameplayClassification" "public"."GameplayClassification"
);

ALTER TABLE "public"."PostDetails" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."PostDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."PostDetails_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."PostDetails_id_seq" OWNED BY "public"."PostDetails"."id";

CREATE TABLE IF NOT EXISTS "public"."PostOnUserLikes" (
    "postId" integer NOT NULL,
    "userId" integer NOT NULL
);

ALTER TABLE "public"."PostOnUserLikes" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."Post_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."Post_id_seq" OWNED BY "public"."Post"."id";

CREATE TABLE IF NOT EXISTS "public"."Session" (
    "cookie" "text" NOT NULL,
    "userId" integer NOT NULL,
    "date" timestamp(3) without time zone NOT NULL,
    "metadata" "text" NOT NULL
);

ALTER TABLE "public"."Session" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."User" (
    "id" integer NOT NULL,
    "uuid" "text" NOT NULL,
    "username" "text" NOT NULL,
    "profileUrl" "text",
    "role" "public"."UserRole" DEFAULT 'MEMBER'::"public"."UserRole" NOT NULL,
    "refreshToken" "text"
);

ALTER TABLE "public"."User" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."User_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."User_id_seq" OWNED BY "public"."User"."id";

CREATE TABLE IF NOT EXISTS "public"."Vote" (
    "id" integer NOT NULL,
    "value" "public"."VoteValue" NOT NULL,
    "testerId" integer NOT NULL,
    "postDetailsId" integer NOT NULL
);

ALTER TABLE "public"."Vote" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."Voice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."Voice_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."Voice_id_seq" OWNED BY "public"."Vote"."id";

CREATE TABLE IF NOT EXISTS "public"."_GameRuleToPost" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);

ALTER TABLE "public"."_GameRuleToPost" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);

ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";

ALTER TABLE ONLY "public"."Comment" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Comment_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."GameRule" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."GameRule_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."Post" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Post_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."PostDetails" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."PostDetails_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."User" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."User_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."Vote" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Voice_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."GameRule"
    ADD CONSTRAINT "GameRule_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."PostDetails"
    ADD CONSTRAINT "PostDetails_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."PostOnUserLikes"
    ADD CONSTRAINT "PostOnUserLikes_pkey" PRIMARY KEY ("postId", "userId");

ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("cookie");

ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Vote"
    ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

CREATE UNIQUE INDEX "GameRule_name_key" ON "public"."GameRule" USING "btree" ("name");

CREATE UNIQUE INDEX "PostDetails_postId_key" ON "public"."PostDetails" USING "btree" ("postId");

CREATE UNIQUE INDEX "Post_gameNr_key" ON "public"."Post" USING "btree" ("gameNr");

CREATE UNIQUE INDEX "Post_variantLink_key" ON "public"."Post" USING "btree" ("variantLink");

CREATE UNIQUE INDEX "Vote_testerId_postDetailsId_key" ON "public"."Vote" USING "btree" ("testerId", "postDetailsId");

CREATE UNIQUE INDEX "_GameRuleToPost_AB_unique" ON "public"."_GameRuleToPost" USING "btree" ("A", "B");

CREATE INDEX "_GameRuleToPost_B_index" ON "public"."_GameRuleToPost" USING "btree" ("B");

ALTER TABLE ONLY "public"."Comment"
    ADD CONSTRAINT "Comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."Comment"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."Comment"
    ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."PostDetails"
    ADD CONSTRAINT "PostDetails_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."PostOnUserLikes"
    ADD CONSTRAINT "PostOnUserLikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."PostOnUserLikes"
    ADD CONSTRAINT "PostOnUserLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "Post_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."Vote"
    ADD CONSTRAINT "Vote_postDetailsId_fkey" FOREIGN KEY ("postDetailsId") REFERENCES "public"."PostDetails"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."Vote"
    ADD CONSTRAINT "Vote_testerId_fkey" FOREIGN KEY ("testerId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."_GameRuleToPost"
    ADD CONSTRAINT "_GameRuleToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."GameRule"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."_GameRuleToPost"
    ADD CONSTRAINT "_GameRuleToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Post"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Allow anyone authenticated insert his own like" ON "public"."PostOnUserLikes" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."id" = "PostOnUserLikes"."userId") AND ("User"."uuid" = ("auth"."uid"())::"text")))));

CREATE POLICY "Allow anyone authenticated remove his own like" ON "public"."PostOnUserLikes" FOR DELETE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."id" = "PostOnUserLikes"."userId") AND ("User"."uuid" = ("auth"."uid"())::"text")))));

CREATE POLICY "Allow anyone authenticated select any posts" ON "public"."Post" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Allow anyone authenticated select any posts comments" ON "public"."Comment" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Allow anyone authenticated select any posts like" ON "public"."PostOnUserLikes" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Allow anyone authenticated select his own user" ON "public"."User" FOR SELECT TO "authenticated" USING (("uuid" = ("auth"."uid"())::"text"));

CREATE POLICY "Allow anyone insert his own comments on any posts" ON "public"."Comment" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."id" = "Comment"."userId") AND ("User"."uuid" = ("auth"."uid"())::"text")))));

CREATE POLICY "Allow inserting votes for testers only" ON "public"."Vote" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."id" = "Vote"."testerId") AND ("User"."uuid" = ("auth"."uid"())::"text")))));

CREATE POLICY "Allow reading votes for testers only" ON "public"."Vote" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."id" = "Vote"."testerId") AND ("User"."uuid" = ("auth"."uid"())::"text")))));

CREATE POLICY "Allow select post details for testers only" ON "public"."PostDetails" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."role" = 'TESTER'::"public"."UserRole") AND ("User"."uuid" = ("auth"."uid"())::"text")))));

CREATE POLICY "Allow update comments for testers only" ON "public"."Comment" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."role" = 'TESTER'::"public"."UserRole") AND ("User"."uuid" = ("auth"."uid"())::"text"))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."role" = 'TESTER'::"public"."UserRole") AND ("User"."uuid" = ("auth"."uid"())::"text")))));

CREATE POLICY "Allow update post details for testers only" ON "public"."PostDetails" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."role" = 'TESTER'::"public"."UserRole") AND ("User"."uuid" = ("auth"."uid"())::"text"))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."role" = 'TESTER'::"public"."UserRole") AND ("User"."uuid" = ("auth"."uid"())::"text")))));

CREATE POLICY "Allow update posts for author too" ON "public"."Post" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."id" = "Post"."authorUserId") AND ("User"."uuid" = ("auth"."uid"())::"text")))));

CREATE POLICY "Allow update posts for testers only" ON "public"."Post" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."role" = 'TESTER'::"public"."UserRole") AND ("User"."uuid" = ("auth"."uid"())::"text"))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."role" = 'TESTER'::"public"."UserRole") AND ("User"."uuid" = ("auth"."uid"())::"text")))));

CREATE POLICY "Allow update votes for testers only" ON "public"."Vote" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."id" = "Vote"."testerId") AND ("User"."uuid" = ("auth"."uid"())::"text"))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."User"
  WHERE (("User"."id" = "Vote"."testerId") AND ("User"."uuid" = ("auth"."uid"())::"text")))));

ALTER TABLE "public"."Comment" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."GameRule" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Post" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."PostDetails" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."PostOnUserLikes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Session" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."User" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Vote" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."_GameRuleToPost" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."Comment";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."Post";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."PostDetails";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."PostOnUserLikes";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."User";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."Vote";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."_GameRuleToPost";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."Comment" TO "anon";
GRANT ALL ON TABLE "public"."Comment" TO "authenticated";
GRANT ALL ON TABLE "public"."Comment" TO "service_role";

GRANT ALL ON SEQUENCE "public"."Comment_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Comment_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Comment_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."GameRule" TO "anon";
GRANT ALL ON TABLE "public"."GameRule" TO "authenticated";
GRANT ALL ON TABLE "public"."GameRule" TO "service_role";

GRANT ALL ON SEQUENCE "public"."GameRule_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."GameRule_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."GameRule_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."Post" TO "anon";
GRANT ALL ON TABLE "public"."Post" TO "authenticated";
GRANT ALL ON TABLE "public"."Post" TO "service_role";

GRANT ALL ON TABLE "public"."PostDetails" TO "anon";
GRANT ALL ON TABLE "public"."PostDetails" TO "authenticated";
GRANT ALL ON TABLE "public"."PostDetails" TO "service_role";

GRANT ALL ON SEQUENCE "public"."PostDetails_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."PostDetails_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."PostDetails_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."PostOnUserLikes" TO "anon";
GRANT ALL ON TABLE "public"."PostOnUserLikes" TO "authenticated";
GRANT ALL ON TABLE "public"."PostOnUserLikes" TO "service_role";

GRANT ALL ON SEQUENCE "public"."Post_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Post_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Post_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."Session" TO "anon";
GRANT ALL ON TABLE "public"."Session" TO "authenticated";
GRANT ALL ON TABLE "public"."Session" TO "service_role";

GRANT ALL ON TABLE "public"."User" TO "anon";
GRANT ALL ON TABLE "public"."User" TO "authenticated";
GRANT ALL ON TABLE "public"."User" TO "service_role";

GRANT ALL ON SEQUENCE "public"."User_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."User_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."User_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."Vote" TO "anon";
GRANT ALL ON TABLE "public"."Vote" TO "authenticated";
GRANT ALL ON TABLE "public"."Vote" TO "service_role";

GRANT ALL ON SEQUENCE "public"."Voice_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Voice_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Voice_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."_GameRuleToPost" TO "anon";
GRANT ALL ON TABLE "public"."_GameRuleToPost" TO "authenticated";
GRANT ALL ON TABLE "public"."_GameRuleToPost" TO "service_role";

GRANT ALL ON TABLE "public"."_prisma_migrations" TO "anon";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "authenticated";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";


RESET ALL;
