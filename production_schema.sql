--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.4 (Ubuntu 15.4-2.pgdg20.04+1)

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: GameClassification; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."GameClassification" AS ENUM (
    'MATERIALISTIC',
    'TACTICAL',
    'DYNAMIC',
    'POSITIONAL',
    'STRATEGIC',
    'FORTUNE'
);


--
-- Name: GameStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."GameStatus" AS ENUM (
    'ACCEPTED',
    'DECLINED',
    'PENDING_REPLY',
    'UNDER_REVIEW'
);


--
-- Name: GameType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."GameType" AS ENUM (
    'NCV',
    'WOF'
);


--
-- Name: GameplayClassification; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."GameplayClassification" AS ENUM (
    'FIRST_POSITIVE',
    'FIRST_NEGATIVE',
    'SECOND_POSITIVE',
    'SECOND_NEGATIVE'
);


--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserRole" AS ENUM (
    'TESTER',
    'MEMBER'
);


--
-- Name: VoteValue; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."VoteValue" AS ENUM (
    'POSITIVE',
    'NEGATIVE',
    'NEUTRAL'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    parent_id integer,
    hidden boolean DEFAULT false NOT NULL
);


--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: GameRule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GameRule" (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: GameRule_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."GameRule_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: GameRule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."GameRule_id_seq" OWNED BY public."GameRule".id;


--
-- Name: Post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Post" (
    id integer NOT NULL,
    "gameNr" integer NOT NULL,
    fen text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type public."GameType" DEFAULT 'NCV'::public."GameType" NOT NULL,
    status public."GameStatus" NOT NULL,
    verdict text,
    "authorUserId" integer NOT NULL,
    "variantLink" text NOT NULL,
    "gameNrs" integer[]
);


--
-- Name: PostDetails; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PostDetails" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    notes text,
    "gameClassification" public."GameClassification",
    "gameplayClassification" public."GameplayClassification",
    "allowInstant" boolean
);


--
-- Name: PostDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."PostDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: PostDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."PostDetails_id_seq" OWNED BY public."PostDetails".id;


--
-- Name: PostOnUserLikes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PostOnUserLikes" (
    "postId" integer NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: Post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Post_id_seq" OWNED BY public."Post".id;


--
-- Name: Session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Session" (
    cookie text NOT NULL,
    "userId" integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    metadata text NOT NULL
);


--
-- Name: System; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."System" (
    id integer NOT NULL,
    stars integer NOT NULL
);


--
-- Name: System_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."System_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: System_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."System_id_seq" OWNED BY public."System".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    uuid text NOT NULL,
    username text NOT NULL,
    "profileUrl" text,
    role public."UserRole" DEFAULT 'MEMBER'::public."UserRole" NOT NULL,
    "refreshToken" text,
    "lockedUntil" timestamp(3) without time zone
);


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Vote; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Vote" (
    id integer NOT NULL,
    value public."VoteValue" NOT NULL,
    "testerId" integer NOT NULL,
    "postDetailsId" integer NOT NULL
);


--
-- Name: Voice_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Voice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Voice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Voice_id_seq" OWNED BY public."Vote".id;


--
-- Name: _GameRuleToPost; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_GameRuleToPost" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: GameRule id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameRule" ALTER COLUMN id SET DEFAULT nextval('public."GameRule_id_seq"'::regclass);


--
-- Name: Post id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post" ALTER COLUMN id SET DEFAULT nextval('public."Post_id_seq"'::regclass);


--
-- Name: PostDetails id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PostDetails" ALTER COLUMN id SET DEFAULT nextval('public."PostDetails_id_seq"'::regclass);


--
-- Name: System id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."System" ALTER COLUMN id SET DEFAULT nextval('public."System_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: Vote id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Vote" ALTER COLUMN id SET DEFAULT nextval('public."Voice_id_seq"'::regclass);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: GameRule GameRule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GameRule"
    ADD CONSTRAINT "GameRule_pkey" PRIMARY KEY (id);


--
-- Name: PostDetails PostDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PostDetails"
    ADD CONSTRAINT "PostDetails_pkey" PRIMARY KEY (id);


--
-- Name: PostOnUserLikes PostOnUserLikes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PostOnUserLikes"
    ADD CONSTRAINT "PostOnUserLikes_pkey" PRIMARY KEY ("postId", "userId");


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (cookie);


--
-- Name: System System_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."System"
    ADD CONSTRAINT "System_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Vote Vote_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_pkey" PRIMARY KEY (id);


--
-- Name: _GameRuleToPost _GameRuleToPost_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_GameRuleToPost"
    ADD CONSTRAINT "_GameRuleToPost_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: GameRule_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "GameRule_name_key" ON public."GameRule" USING btree (name);


--
-- Name: PostDetails_postId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "PostDetails_postId_key" ON public."PostDetails" USING btree ("postId");


--
-- Name: Post_gameNr_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Post_gameNr_key" ON public."Post" USING btree ("gameNr");


--
-- Name: Post_variantLink_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Post_variantLink_key" ON public."Post" USING btree ("variantLink");


--
-- Name: Vote_testerId_postDetailsId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Vote_testerId_postDetailsId_key" ON public."Vote" USING btree ("testerId", "postDetailsId");


--
-- Name: _GameRuleToPost_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_GameRuleToPost_B_index" ON public."_GameRuleToPost" USING btree ("B");


--
-- Name: Comment Comment_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Comment Comment_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PostDetails PostDetails_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PostDetails"
    ADD CONSTRAINT "PostDetails_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostOnUserLikes PostOnUserLikes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PostOnUserLikes"
    ADD CONSTRAINT "PostOnUserLikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostOnUserLikes PostOnUserLikes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PostOnUserLikes"
    ADD CONSTRAINT "PostOnUserLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_authorUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Vote Vote_postDetailsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_postDetailsId_fkey" FOREIGN KEY ("postDetailsId") REFERENCES public."PostDetails"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Vote Vote_testerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_testerId_fkey" FOREIGN KEY ("testerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _GameRuleToPost _GameRuleToPost_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_GameRuleToPost"
    ADD CONSTRAINT "_GameRuleToPost_A_fkey" FOREIGN KEY ("A") REFERENCES public."GameRule"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GameRuleToPost _GameRuleToPost_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_GameRuleToPost"
    ADD CONSTRAINT "_GameRuleToPost_B_fkey" FOREIGN KEY ("B") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostOnUserLikes Allow anyone authenticated insert his own like; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow anyone authenticated insert his own like" ON public."PostOnUserLikes" FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".id = "PostOnUserLikes"."userId") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: PostOnUserLikes Allow anyone authenticated remove his own like; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow anyone authenticated remove his own like" ON public."PostOnUserLikes" FOR DELETE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".id = "PostOnUserLikes"."userId") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: Post Allow anyone authenticated select any posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow anyone authenticated select any posts" ON public."Post" FOR SELECT TO authenticated USING (true);


--
-- Name: Comment Allow anyone authenticated select any posts comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow anyone authenticated select any posts comments" ON public."Comment" FOR SELECT TO authenticated USING (true);


--
-- Name: PostOnUserLikes Allow anyone authenticated select any posts like; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow anyone authenticated select any posts like" ON public."PostOnUserLikes" FOR SELECT TO authenticated USING (true);


--
-- Name: User Allow anyone authenticated select his own user; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow anyone authenticated select his own user" ON public."User" FOR SELECT TO authenticated USING ((uuid = (auth.uid())::text));


--
-- Name: Comment Allow anyone insert his own comments on any posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow anyone insert his own comments on any posts" ON public."Comment" FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".id = "Comment"."userId") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: Vote Allow inserting votes for testers only; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow inserting votes for testers only" ON public."Vote" FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".id = "Vote"."testerId") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: Vote Allow reading votes for testers only; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow reading votes for testers only" ON public."Vote" FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".id = "Vote"."testerId") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: PostDetails Allow select post details for testers only; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow select post details for testers only" ON public."PostDetails" FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".role = 'TESTER'::public."UserRole") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: Comment Allow update comments for testers only; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow update comments for testers only" ON public."Comment" FOR UPDATE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".role = 'TESTER'::public."UserRole") AND ("User".uuid = (auth.uid())::text))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".role = 'TESTER'::public."UserRole") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: PostDetails Allow update post details for testers only; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow update post details for testers only" ON public."PostDetails" FOR UPDATE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".role = 'TESTER'::public."UserRole") AND ("User".uuid = (auth.uid())::text))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".role = 'TESTER'::public."UserRole") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: Post Allow update posts for author too; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow update posts for author too" ON public."Post" FOR UPDATE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".id = "Post"."authorUserId") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: Post Allow update posts for testers only; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow update posts for testers only" ON public."Post" FOR UPDATE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".role = 'TESTER'::public."UserRole") AND ("User".uuid = (auth.uid())::text))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".role = 'TESTER'::public."UserRole") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: Vote Allow update votes for testers only; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow update votes for testers only" ON public."Vote" FOR UPDATE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".id = "Vote"."testerId") AND ("User".uuid = (auth.uid())::text))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".id = "Vote"."testerId") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: PostDetails Allow vote deletion; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow vote deletion" ON public."PostDetails" FOR DELETE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public."User"
  WHERE (("User".role = 'TESTER'::public."UserRole") AND ("User".uuid = (auth.uid())::text)))));


--
-- Name: Comment; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."Comment" ENABLE ROW LEVEL SECURITY;

--
-- Name: GameRule; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."GameRule" ENABLE ROW LEVEL SECURITY;

--
-- Name: Post; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."Post" ENABLE ROW LEVEL SECURITY;

--
-- Name: PostDetails; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."PostDetails" ENABLE ROW LEVEL SECURITY;

--
-- Name: PostOnUserLikes; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."PostOnUserLikes" ENABLE ROW LEVEL SECURITY;

--
-- Name: Session; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."Session" ENABLE ROW LEVEL SECURITY;

--
-- Name: System; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."System" ENABLE ROW LEVEL SECURITY;

--
-- Name: User; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;

--
-- Name: Vote; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."Vote" ENABLE ROW LEVEL SECURITY;

--
-- Name: _GameRuleToPost; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public."_GameRuleToPost" ENABLE ROW LEVEL SECURITY;

--
-- Name: _prisma_migrations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public._prisma_migrations ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--

