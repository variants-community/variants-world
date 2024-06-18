SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.6 (Ubuntu 15.6-1.pgdg20.04+1)

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."User" ("id", "uuid", "username", "profileUrl", "role", "refreshToken") VALUES
	(185230163, '20b42b68-5dde-4ead-905c-4b6222df481a', 'glebchansky2', 'https://images.chesscomfiles.com/uploads/v1/user/185230163.0215609d.160x160o.395219d021b4.jpeg', 'MEMBER', 'def502002dbc0b5f095ab55f319d05c7593a977713fea4550188d35777dab88ed10aecf35e8533a6506f87dafaed853aad6ff49765f6792f49d7210c684b628f68633516e99ab0b43e231cace3da061121c1fbc88eed870d7769bda855601f00794ff1bd5c38fa52ec5e9dc27fa5271463a49f3464b2bfa4faded76e6f456af83a3efe2ed1aa65a0f7724590cc54affbb54919d622d3db2f267d2986da2c641103d84855465f6f118781ac745fdc740a87213882751fb5d22a6c22764a2423b3f72e022dec24459ea7f66c84ad2231cc28e3a049b685d53d3966b73291a48646d47eb0a815cda1211c1968016e68e37270ca2b58fd0c95417f74ccbfe924a07f2e380d4e0e0875a52f548c49f7ee21c8488901f2a2c24c030c8ffc794cb986745728aac6e65ba4f841d382b5fac814e65257c67597278f681db6d98005fa0720de29297bebb3c5dc4a91461d321789a2cb2bc07d9fb9998144839e8674f2d1b26577d36f98f71309ada992e5f2bcde5248c09e53eeb3d300c0627d694f124d1ffde0b725e3bf03d8f9ec06f012fd31151b1b51952c4bd28b7b7dd4449c6c16c641078f89661d1baf2c18dae6d46060178c1083ee906c95d5044750'),
	(50645954, '5e894a0a-96f2-4f43-b635-b674ea95c954', 'qilp', 'https://images.chesscomfiles.com/uploads/v1/user/50645954.d2d675c8.160x160o.57d30666bf02.png', 'TESTER', NULL),
	(47901080, 'cae8b8fe-df52-48b0-ad1d-4d0670810bf8', 'ChessMasterGS', 'https://images.chesscomfiles.com/uploads/v1/user/47901080.18efee0a.160x160o.daeb7f6821e2.png', 'TESTER', NULL),
	(258358739, 'b8513f0f-04ec-44b3-ae73-7d20bec88e4c', 'BFDICHESS', 'https://images.chesscomfiles.com/uploads/v1/user/258358739.8c0b89aa.160x160o.364be86fd887.png', 'MEMBER', NULL),
	(211710517, '9c4b10b6-da72-4cc0-838d-19426dc7300c', '2bHNST', 'https://images.chesscomfiles.com/uploads/v1/user/211710517.87c06c0b.160x160o.caf77d447f8a.png', 'MEMBER', NULL),
	(92837782, 'a464088d-e438-4921-b6e5-284082fd4b7c', 'mainhatminh8', 'https://images.chesscomfiles.com/uploads/v1/user/92837782.b5092fbe.160x160o.0f9da3a5d02f.jpg', 'MEMBER', NULL),
	(310761269, '0befa112-df45-4bf1-a622-182a38ede37c', 'anonymous15010', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.gif', 'MEMBER', NULL),
	(51805526, 'e38f8cc3-6352-47d3-ace1-59487469042b', 'noahfavelo', 'https://images.chesscomfiles.com/uploads/v1/user/51805526.28b16e54.160x160o.0da25a37e9ad.png', 'MEMBER', NULL),
	(272749467, '176a9c86-868e-4d9d-ba2b-5ddf91211c4b', 'jackityjackjack', 'https://images.chesscomfiles.com/uploads/v1/user/272749467.ac8ae214.160x160o.201709aa2387.png', 'MEMBER', NULL),
	(163081401, 'fd2a7fa5-8a6f-4d0c-b204-be76bb2c6c28', 'Nyutixbrother', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.gif', 'MEMBER', NULL),
	(329781945, '24a2e603-1c66-4c90-8e81-e38f35f6918e', 'seggura', 'https://images.chesscomfiles.com/uploads/v1/user/329781945.5d99c873.160x160o.978ca851bffd.jpg', 'MEMBER', NULL),
	(75596324, '00d28d83-e291-48c5-85fb-f9047f427fb3', 'nciSquared', 'https://images.chesscomfiles.com/uploads/v1/user/75596324.be402bca.160x160o.7c0e0221f1e8.jpg', 'MEMBER', NULL),
	(167239707, 'a7625d29-b84f-4eeb-a764-640c10e0dbf7', 'gregorywinston', 'https://images.chesscomfiles.com/uploads/v1/user/167239707.c374db2e.160x160o.30535927146f.jpg', 'MEMBER', NULL),
	(353384769, '9ef00222-ea3a-4f85-a715-cf923cb24df5', 'RealPengu34', 'https://images.chesscomfiles.com/uploads/v1/user/353384769.17fbd9bf.160x160o.551abddbc266.jpg', 'MEMBER', NULL),
	(288038273, 'e56bdf9e-0c57-4804-9d19-65db2152e93e', 'littlebearhammy', 'https://images.chesscomfiles.com/uploads/v1/user/288038273.c9831402.160x160o.73cb04ca3230.png', 'MEMBER', NULL),
	(352656035, '9a28579c-530e-4df4-b7c1-d88ef8c20b19', 'B-for-brain', 'https://images.chesscomfiles.com/uploads/v1/user/352656035.c1a670f7.160x160o.7b992e0ef527.jpg', 'MEMBER', NULL),
	(171868701, '0eea0375-014c-40c6-9b19-49f8bb70f906', 'Guest4777969864', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.gif', 'MEMBER', NULL),
	(341609019, '64d0ff89-ffc2-4603-a742-3cc011a67258', 'ethanlochess8', 'https://images.chesscomfiles.com/uploads/v1/user/341609019.9aad4376.160x160o.91fbb07c2b29.png', 'MEMBER', NULL),
	(362796631, '02309c2c-5b02-4483-8784-96f60681f21e', 'jj-ches-man', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.gif', 'MEMBER', NULL),
	(351884631, 'ce3efaf8-f929-4de3-878f-f0147544fb8a', 'Light-Gamer', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.gif', 'MEMBER', NULL),
	(61432988, '45d8e48d-a249-4606-8e1f-cc6a59f25e7c', 'bluestar-8', 'https://images.chesscomfiles.com/uploads/v1/user/61432988.8a896560.160x160o.8abd039f7415.jpeg', 'MEMBER', NULL),
	(222632197, 'd3b8ded6-43ed-4acb-a30c-dcd972d987a0', 'MegaThief', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.gif', 'MEMBER', NULL),
	(160519263, 'a9728249-142e-44de-9c96-aed01c30fc02', 'Storming2Knight', 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.gif', 'MEMBER', NULL);


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Post" ("id", "gameNr", "fen", "title", "description", "createdAt", "updatedAt", "type", "status", "verdict", "authorUserId", "variantLink") VALUES
	(229, 65782692, 'x,x,x,2K,2G,2C,2Δ,2E,2V,2R,2M,x,x,x/x,x,x,2β,6,2β,x,x,x/x,x,x,1,2β,2δ,2δ,2δ,2δ,2β,1,x,x,x/1M,1β,10,3β,3K/1R,1,1β,8,3β,1,3G/1V,1,1δ,8,3δ,1,3C/1E,1,1δ,8,3δ,1,3Δ/1Δ,1,1δ,8,3δ,1,3E/1C,1,1δ,8,3δ,1,3V/1G,1,1β,8,3β,1,3R/1K,1β,10,3β,3M/x,x,x,1,0B,0B,0B,0B,0B,0B,1,x,x,x/x,x,x,0B,6,0B,x,x,x/x,x,x,0B,0B,0B,0B,0B,0B,0B,0B,x,x,x-1-[false,false,false,false]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"resigned":[true,null,null,null],"zombieType":["pusher","","",""],"zombieImmune":[true,false,false,false]}', 'Lobotomy End', 'This is a lobotomised version of Every End. To win, you need to let the red pusher bishops capture all your pieces. It''s a little bit luck based, but it is pretty fun. This wasn''t intentionally going to be a troll post, but the reason why I made this a troll post was because I was rushing to submit it. Sorry for 3 low quality games, I should have used 9 high quality games, and make some tweaks to it. Btw, oh no i cant stand anymore brain surgery or random pieces jumpscares', '2024-05-18 12:51:26.83', '2024-05-18 12:51:26.83', 'WOF', 'DECLINED', 'You have now been banned from posting for 2 weeks. You were already previously given 2 warnings for making troll posts.
See:  https://variants.world/posts/64', 258358739, 'When will Every End get accepted or declined?'),
	(209, 64982311, 'x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,2G,2C,2Δ,2O,2A,2Δ,2C,2G,x,x,x/x,x,x,2P,2α,2γ,2δ,2δ,2γ,2α,2P,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,x,0P,0α,0γ,0δ,0δ,0γ,0α,0P,x,x,x/x,x,x,0G,0C,0Δ,0O,0A,0Δ,0C,0G,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x-0-[false,true,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"royal":["h4","","h11",""],"lives":[6,6,6,6],"pawnBaseRank":5,"wb":true,"dim":"8x8"}', 'Parallel Dimension Chess', 'Chess but all the pieces have changed! Checkmate the Amazon and rule the dimension!', '2024-04-29 14:10:52.325', '2024-04-29 14:10:52.325', 'NCV', 'UNDER_REVIEW', NULL, 329781945, 'Parallel Dimension Chess'),
	(210, 65060432, 'x,x,x,2W,2β,2F,2F,2K,2F,2β,2W,x,x,x/x,x,x,2P,2P,2P,2,2P,2P,2P,x,x,x/x,x,x,1F,2,1W,1W,2,1F,x,x,x/3K,x,1W,10,1W/x,x,1W,2,1W,1W,1W,1W,4,1W/1F,1F,3,3W,4,1F,1F,2/4,1W,2,1W,1W,2,1W,2/4,3W,2,3W,3W,2,3W,2/3F,3F,3,1W,4,3F,3F,2/x,x,3W,2,3W,3W,3W,3W,4,1W/1K,x,3W,10,1W/x,x,x,3F,2,3W,3W,2,3F,x,x,x/x,x,x,0P,0P,0P,2,0P,0P,0P,x,x,x/x,x,x,0W,0β,0F,0F,0K,0F,0β,0W,x,x,x-0-[false,false,false,false]-[false,false,false,false]-[false,false,false,false]-[0,0,0,0]-0-{"resigned":[null,true,null,true]}', 'Sideways Custom position Hill', 'Go KOTH or pick up pieces or both at the same time!', '2024-05-01 07:03:02.19', '2024-05-01 07:03:02.19', 'WOF', 'DECLINED', 'Post was made with generic name, and NCV/WoF status was not decided beforehand either. In addition, this game is luck based as the rando pieces can potentially move out of a player king’s path to KOTH and save them moves.', 75596324, 'Sideways Custom position Hill'),
	(213, 65137079, 'x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,2R,8,2R,x,x/x,x,1,2N,2B,2Q,2K,2E,2H,2B,2N,1,x,x/x,x,2P,2P,2P,2P,2P,2P,2P,2P,2P,2P,x,x/x,x,10,x,x/x,x,10,x,x/x,x,10,x,x/x,x,10,x,x/x,x,0P,0P,0P,0P,0P,0P,0P,0P,0P,0P,x,x/x,x,1,0N,0B,0Q,0K,0E,0H,0B,0N,1,x,x/x,x,0R,8,0R,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x-0-[false,true,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"pawnBaseRank":5,"wb":true,"dim":"10x10","noCorners":true}', 'Grand Chess', 'Chess with two extra pawns and two new pieces the Marshal (chancellor) and the Cardinal (archbishop) pawns promote to queen,rook,bishop,knight,Marshal (chancellor) and Cardinal (archbishop).
 ', '2024-05-04 21:28:39.201', '2024-05-04 21:28:39.201', 'NCV', 'DECLINED', 'Please see: 
https://variants.world/posts/60
https://variants.world/posts/10061
This variant is almost an exact copy.', 160519263, 'grand chess'),
	(212, 65109977, 'x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,2K,2N,x,x,2K,2F,x,x,x,x/x,x,x,x,2K,2F,x,x,2W,2N,x,x,x,x/x,x,x,x,x,x,2,x,x,x,x,x,x/x,x,x,x,x,x,2,x,x,x,x,x,x/x,x,x,x,0N,0W,x,x,0F,0K,x,x,x,x/x,x,x,x,0F,0K,x,x,0N,0K,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x-0-[false,true,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"royal":["j5","","e10",""],"lives":[7,7,7,7],"pawnBaseRank":5,"wb":true,"dim":"6x6"}', 'Claustrophobia', 'This is a fix of my previously declined variant "Clash of Minor Pieces."
The first change I made was to add crazy house, as I felt the board was too small for pawns.
7+ came along because the only way to checkmate is with a non-royal king.
As for the title, I couldn''t think of anything else.', '2024-05-04 13:52:33.497', '2024-05-04 13:52:33.497', 'NCV', 'DECLINED', 'Unless a player plays too aggressively and blunders a piece, shuffling is very convenient and even the best strategy at times in order to maintain balance.', 211710517, 'Claustrophobia'),
	(201, 64898303, 'x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,2A,2N,2V,2Δ,2K,2G,2M,2E,x,x,x/x,x,x,2P,2P,2P,2P,2P,2P,2P,2P,x,x,x/x,x,x,3,2δ,2δ,3,x,x,x/x,x,x,3,2δ,0δ,3,x,x,x/x,x,x,3,2δ,0δ,3,x,x,x/x,x,x,3,0δ,0δ,3,x,x,x/x,x,x,0P,0P,0P,0P,0P,0P,0P,0P,x,x,x/x,x,x,0A,0N,0V,0Δ,0K,0G,0M,0E,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x-0-[false,true,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"pawnBaseRank":5,"wb":true,"dim":"8x8"}', 'Warui-giveaway', 'we need more warui variants and i can''t forget to mention about random pieces''s autodeclinement lol', '2024-04-27 01:37:08.025', '2024-04-27 01:37:08.025', 'WOF', 'DECLINED', 'Black wins straight out of the opening with an unstoppable tempo.', 258358739, 'Warui-giveaway'),
	(203, 64841024, '2A,2A,2A,2A,X,1,2K,2,X,2A,2A,2A,2A/2A,2A,2A,2A,X,2R,2R,2R,2R,X,2A,2A,2A,2A/2A,2A,2A,2A,X,2P,2P,2P,2P,X,2A,2A,2A,2A/X,X,X,X,X,2P,2P,2P,2P,X,X,X,X,X/X,X,X,X,X,4,X,X,X,X,X/X,1P,1P,1P,1P,4,3P,3P,3P,3P,X/1K,1P,1P,1P,1P,4,3P,3P,3P,3P,1/1,1P,1P,1P,1P,4,3P,3P,3P,3P,3K/X,1P,1P,1P,1P,4,3P,3P,3P,3P,X/X,X,X,X,X,4,X,X,X,X,X/X,X,X,X,X,0P,0P,0P,0P,X,X,X,X,X/0A,0A,0A,0A,X,0P,0P,0P,0P,X,0A,0A,0A,0A/0A,0A,0A,0A,X,0R,0R,0R,0R,X,0A,0A,0A,0A/0A,0A,0A,0A,X,2,0K,1,X,0A,0A,0A,0A-0-[false,false,false,false]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"resigned":[null,true,null,true],"zombieType":["","comfuter","","comfuter"],"noCorners":true}', 'Boom Strike Chess', 'try to blow up your opponent''s pieces with pawns that gets in the way.', '2024-04-27 03:18:58.22', '2024-04-27 03:18:58.22', 'NCV', 'DECLINED', 'The Futer movements of Blue and Green''s pawns means that a player can sometimes be randomly attacked or have their amazons blocked off from checking threats for no reason. In addition, pretty much 90% of time the game is pure shuffling; it ends briefly at the middlegame when Blue and Green are (likely) checkmated, and then resumes right after as neither side can make any significant progress, instead only being able to throw pieces at a pawn wall.', 160519263, 'boom strike chess'),
	(204, 64809579, 'x,x,x,0β,2β,x,x,x,x,x,x,x,x,x/x,x,x,3β,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,2B,x,x,x,x,x,x/x,x,1M,x,x,x,x,x,2R,2K,2N,2B,2R,2N/x,x,x,x,x,1B,1K,x,2P,2P,2P,2P,2P,2P/3F,x,1W,x,x,1R,1P,7/1,x,1,x,x,1δ,1P,7/1,x,1,x,x,1δ,1P,7/1,x,1,x,x,1R,1P,7/1,x,1,x,x,1B,1K,x,0P,0P,0P,0P,0P,0P/3,x,x,x,x,x,0R,0K,0N,0B,0R,0N/x,x,x,x,x,x,x,0B,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,1,3K,x,x,x,x,x,x,x,x,x-0-[false,false,false,false]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"royal":["d14","f8","e14","a9"],"lives":[1,8,1,1],"resigned":[null,null,null,true],"zombieImmune":[false,false,false,true]}', 'Eleventh Hour', 'This is a remake of my previously declined variant In a Pickle. I made a few minor adjustments.

During testing, I found 6 main types of gameplay:
1. Quick resignation. None of those games were submitted here.
2. Blue doesn''t realize they are 14 moves from winning.
3. Blue almost wins.
4. Blue loses early on, and the one who checkmated Blue claims the win.
5. Red attacks Yellow, and Yellow defends while trying to checkmate Blue, or vice versa.
6. Red and Yellow checkmate Blue together, then battle each other.

I''ll (try) to fix Clash of Minor Pieces.', '2024-04-28 00:08:47.302', '2024-04-28 00:08:47.302', 'NCV', 'DECLINED', 'The entire variant comes down to RY vs B, since Blue has to power to checkmate both of their opponents; naturally, Red and Yellow will always (be forced to) obliterate Blue''s position since 2 players are stronger than 1, and the entire variant is unfair to play as result.', 211710517, 'Eleventh Hour'),
	(205, 64919160, '2H,2H,2H,2E,2E,2E,2A,2A,2E,2E,2E,2H,2H,2H/2M,X,X,X,X,X,X,X,X,X,X,X,X,2M/2M,dP,dP,dP,X,X,X,X,X,X,dP,dP,dP,2M/2M,X,X,2R,2N,2B,2Q,2K,2B,2N,2R,X,X,2M/X,X,X,2P,2P,2P,2P,2P,2P,2P,2P,X,X,X/X,X,X,8,X,X,X/X,X,X,8,X,X,X/X,X,X,8,X,X,X/X,X,X,8,X,X,X/X,X,X,0P,0P,0P,0P,0P,0P,0P,0P,X,X,X/0M,X,X,0R,0N,0B,0Q,0K,0B,0N,0R,X,X,0M/0M,dP,dP,dP,X,X,X,X,X,X,dP,dP,dP,0M/0M,X,X,X,X,X,X,X,X,X,X,X,X,0M/0H,0H,0H,0E,0E,0E,0A,0A,0E,0E,0E,0H,0H,0H-0-[false,true,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"pawnBaseRank":5,"wb":true,"noCorners":true}', 'Mutated Knight Chess', 'use your upgraded knights to beat your opponent', '2024-04-28 22:25:42.302', '2024-04-28 22:25:42.302', 'NCV', 'DECLINED', 'Please see: 
https://www.chess.com/clubs/forum/view/how-not-to-make-a-variant
and
https://www.chess.com/clubs/forum/view/good-custom-position-bad-custom-position-dos-and-donts-for-ncps-1', 160519263, 'Mutated Knight Chess'),
	(206, 64972162, 'x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,2G,0U,2C,2E,2A,2O,3R,2R,x,x,x/x,x,x,2P,2P,2P,2P,2U,2P,2P,2P,x,x,x/x,x,x,4,2P,3,x,x,x/x,x,x,4,0P,3,x,x,x/x,x,x,4,2P,3,x,x,x/x,x,x,4,0P,3,x,x,x/x,x,x,0P,0P,0P,0P,0U,0P,0P,0P,x,x,x/x,x,x,0G,2U,0C,0E,0A,0O,1R,0R,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x-0-[false,true,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"royal":["k4","","k11",""],"lives":[7,7,7,7],"pawnBaseRank":5,"wb":true,"dim":"8x8"}', 'Warui-rookmate', 'So this is basically a ''bad'' version of Rookmate. The pieces are changed and a KOTH is added to make it a WOF. A strategy both players can use is to move the camel to D4 or E4, which was inspired by the hidden camel threat in Ashtandrez. Both player can try to nuke the other king (or shall I say rook?) with their rider or their long range pieces. Good luck! But this variant is not scary enough... WE NEED A RANDOM PIECES JUMPSCARE!!! AAAA!', '2024-04-29 05:42:03.169', '2024-04-29 05:42:03.169', 'WOF', 'UNDER_REVIEW', NULL, 258358739, 'Warui-rookmate'),
	(214, 65221323, '0B,0B,0B,3,0B,0B,0B,2A,2N,2A,0B,0B/0B,1,0B,3,0B,1,0B,2N,1W,2N,0B,1/0B,0B,0B,3,0B,0B,0B,2δ,2N,2δ,0B,0B/3,0B,0B,0B,3,0B,0B,0B,2/3,0B,1,0B,3,0B,1,0B,2/3,0B,0B,0B,3,0B,0B,0B,2/0B,0B,0B,3,0B,0B,0B,3,0B,0B/0B,1,0B,3,0B,0K,0B,3,0B,1/0B,0B,0B,3,0B,0B,0B,3,0B,0B/1A,1N,1δ,0B,0B,0B,3,0B,0B,0B,x,x/1N,2W,1N,0B,1,0B,3,0B,1,x,x,x/1A,1N,1δ,0B,0B,0B,3,0B,x,x,x,2R/0B,0B,0B,3,0B,0B,0B,x,x,x,0β,x/0B,1,0B,3,0B,1,0B,x,x,1R,x,0B-1-[false,false,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"royal":["h7","l1","n3",""],"lives":[7,1,1,69],"resigned":[true,null,null,null],"zombieType":["pusher","","",""],"zombieImmune":[true,false,false,false],"noCorners":true}', 'Lobotomydynamix', 'I rather get a brain surgery than fix the errors in Random Pieces (joke) so Let''s finish the Lobotomy Series! In this game, you can find opening traps/double checks to checkmate Red. Checkmate Red to win. Also, when will Every End be accepted?', '2024-05-05 04:27:23.247', '2024-05-05 04:27:23.247', 'WOF', 'UNDER_REVIEW', NULL, 258358739, 'Lobotomydynamix'),
	(208, 64978251, 'x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,3G,3G,3G,3G,3G,3G,3G,3G,x,x,x/x,x,3G,3G,2δ,2δ,2δ,2K,2δ,2δ,3G,3G,x,3K/x,x,3G,4,2δ,3,3G,x,x/x,x,3G,8,3G,x,x/x,x,3G,8,3G,x,1/x,x,3G,8,3G,x,3β/x,x,3G,8,3G,x,x/x,x,3G,4,0δ,3,3G,x,1/x,x,3G,3G,0δ,0δ,0δ,0K,0δ,0δ,3G,3G,x,3β/x,x,x,3G,3G,3G,3G,3G,3G,3G,3G,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x-0-[false,true,false,false]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-1-{"lives":[12,12,12,69],"resigned":[null,null,null,true],"zombieType":["","","","pusher"],"zombieImmune":[false,false,false,true]}', 'Against the Atomici Project', 'This is Scacchi Atomici and Grasshopper Soccer combined! | 1. The name was already taken, so I added an I to Atomic. | 3. Every End will take forever to get accepted/declined. Why???', '2024-04-29 10:55:49.201', '2024-04-29 10:55:49.201', 'WOF', 'DECLINED', 'The gameplay is very linear, with rushing the sergeants at a good opportunity being the only way to win; the green grasshoppers do basically nothing with a basic defense setup.', 258358739, 'Against the Atomici Project'),
	(215, 65290890, '14/1,X,1,X,X,1,X,X,1,X,X,1,X,1/4,X,1,X,X,1,X,4/1,X,2,X,4,X,2,X,1/1,X,X,X,X,X,2,X,X,X,X,X,1/4,X,4,X,4/1,X,X,3,X,X,3,X,X,1/1,X,X,3,X,X,3,X,X,1/4,X,4,X,4/1,X,X,X,X,X,2,X,X,X,X,X,1/1,X,2,X,4,X,2,X,1/4,X,1,X,X,1,X,4/1,X,1,X,X,1,X,X,1,X,X,1,X,1/14-0-[false,true,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"setupPoints":[120,0,120,0],"setupComplete":[false,false,false,false],"pawnBaseRank":5,"wb":true,"noCorners":true,"bank":["rB,rR,rQ,rA,rE,rH,rM,rN,rK,rδ","","yB,yR,yQ,yA,yE,yH,yM,yN,yK,yδ",""]}', 'The Chaotic Structure', 'Navigate through the chaotic structure and blow up (or mate) your opponent''s king', '2024-05-06 22:25:29.912', '2024-05-06 22:25:29.912', 'NCV', 'DECLINED', 'The opening and strategy is forced; 16 sergeants at the front is always the ideal opening, and playing actively near the middle is enough to force a win or a draw. The value of the knights and sergeants are extremely high due to them being very dangerous when played correctly, and this contrasts too much with their low point value.', 160519263, 'The Chaotic Structure I'),
	(218, 65441707, 'x,x,2N,2N,2N,2N,2K,2Q,2N,2N,2N,2N,x,x/x,x,X,X,X,X,2,X,X,X,X,x,x/x,x,10,x,x/x,x,X,X,X,X,2,X,X,X,X,x,x/x,x,X,8,X,x,x/x,x,X,1,X,X,X,X,X,X,1,X,x,x/x,x,10,x,x/x,x,10,x,x/x,x,X,1,X,X,X,X,X,X,1,X,x,x/x,x,X,8,X,x,x/x,x,X,X,X,X,2,X,X,X,X,x,x/x,x,10,x,x/x,x,X,X,X,X,2,X,X,X,X,x,x/x,x,0N,0N,0N,0N,0K,0Q,0N,0N,0N,0N,x,x-0-[false,true,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"wb":true,"noCorners":true}', 'Ladders of the Knight', 'A game where you have to shuffle your knights to gain control of the center with the help of your queen.', '2024-05-11 15:49:55.079', '2024-05-11 15:49:55.079', 'NCV', 'UNDER_REVIEW', NULL, 353384769, 'Ladders of the Knight'),
	(223, 65353650, '2K,2H,2E,2γ,x,x,x,x,x,x,2γ,2E,2H,2K/2H,2Q,2V,2γ,1,x,x,x,x,1,2γ,2V,2Q,2H/2E,2V,2A,2γ,2,x,x,2,2γ,2A,2V,2E/2γ,2γ,2γ,2γ,6,2γ,2γ,2γ,2γ/x,12,x/x,x,10,x,x/x,x,x,8,x,x,x/x,x,x,8,x,x,x/x,x,10,x,x/x,12,x/0γ,0γ,0γ,0γ,6,0γ,0γ,0γ,0γ/0E,0V,0A,0γ,2,x,x,2,0γ,0A,0V,0E/0H,0Q,0V,0γ,1,x,x,x,x,1,0γ,0V,0Q,0H/0K,0H,0E,0γ,x,x,x,x,x,x,0γ,0E,0H,0K-0-[false,true,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"royal":["a1","","n14",""],"lives":[7,7,7,7],"noCorners":true}', 'The Mega X of Super Pieces', 'by having two armies at ones, fight for symertycal pieces placement anddont try to do the 7 checks.', '2024-05-14 11:28:38.699', '2024-05-14 11:28:38.699', 'NCV', 'UNDER_REVIEW', NULL, 167239707, 'the mega X of super pieces'),
	(224, 65691846, 'x,x,x,2R,2N,2B,2K,2Q,2B,2N,2R,x,x,x/x,x,x,2P,2P,2P,2P,2P,2P,2P,2P,x,x,x/x,x,x,8,x,x,x/1P,1P,9,3δ,3L,3E/1P,1P,1P,8,3δ,3V,3O/1P,1P,1P,1P,7,3δ,3Z,3H/1P,1,1P,1P,7,3δ,3R,3M/1P,1,1P,1P,7,3δ,3R,3A/1P,1P,1P,1P,7,3δ,3Z,3H/1P,1P,1P,8,3δ,3V,3O/1P,1P,9,3δ,3L,3E/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,0K,1,x,x,x-0-[false,false,false,false]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"royal":["j1","","g14","n8"],"resigned":[true,null,null,null],"zombieType":["comfuter","","",""]}', 'Attack', 'yellow should try to promote then helping blue to promote while green have strart attacking yellow', '2024-05-16 11:47:47.969', '2024-05-16 11:47:47.969', 'WOF', 'DECLINED', 'Incredibly unbalanced as a 3 Player variant. ', 167239707, 'ATTACK!!!!!!!!!!!!!!!!!!!!!!!!'),
	(220, 65503078, '14/1,X,1,X,X,1,X,X,1,X,X,1,X,1/4,X,1,X,X,1,X,4/1,X,2,X,4,X,2,X,1/2δ,X,X,X,X,X,2δ,2δ,X,X,X,X,X,2δ/2δ,2δ,2δ,2δ,X,2δ,2δ,2δ,2δ,X,2δ,2δ,2δ,2δ/1,X,X,3,X,X,3,X,X,1/1,X,X,3,X,X,3,X,X,1/0δ,0δ,0δ,0δ,X,0δ,0δ,0δ,0δ,X,0δ,0δ,0δ,0δ/0δ,X,X,X,X,X,0δ,0δ,X,X,X,X,X,0δ/1,X,2,X,4,X,2,X,1/4,X,1,X,X,1,X,4/1,X,1,X,X,1,X,X,1,X,X,1,X,1/14-0-[false,true,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"setupPoints":[120,0,120,0],"setupComplete":[false,false,false,false],"pawnBaseRank":5,"wb":true,"noCorners":true,"bank":["rA,rE,rH,rM,rK","","yA,yE,yH,yM,yK",""]}', 'The Chaotic Structure ', 'Navigate through the Chaotic Structure and blow up your opponent''s king.', '2024-05-12 01:45:06.27', '2024-05-12 01:45:06.27', 'NCV', 'UNDER_REVIEW', NULL, 160519263, 'The Chaotic Structure I  '),
	(225, 64805879, '1β,1T,1H,1C,1M,1V,1β,1J,1E,1N,1M,X,X,2β/X,X,X,X,X,X,X,X,X,X,X,X,X,2T/X,X,X,dK,1S,dK,1Y,dK,1Y,2,X,X,2H/0M,X,2,1S,X,1G,X,1G,dK,1,dK,X,2C/0N,X,1,dK,X,1,X,1U,X,X,2S,2S,X,2M/0E,X,0Y,0G,X,dK,X,1,dK,1,X,dK,X,2V/0J,X,dK,X,0U,1,1U,2U,X,X,2G,2Y,X,2β/0β,X,0Y,0G,X,X,0U,3U,1,2U,X,dK,X,2J/0V,X,dK,X,1,dK,1,X,dK,X,2G,2Y,X,2E/0M,X,0S,0S,X,X,3U,X,1,X,dK,1,X,2N/0C,X,dK,1,dK,3G,X,3G,X,3S,2,X,2M/0H,X,X,2,3Y,dK,3Y,dK,3S,dK,X,X,X/0T,X,X,X,X,X,X,X,X,X,X,X,X,X/0β,X,X,3M,3N,3E,3J,3β,3V,3M,3C,3H,3T,3β-0-[false,false,false,false]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"royal":["a1","a14","n14","n1"],"resigned":[null,true,null,true],"zombieType":["","ranter","","ranter"],"noCorners":true}', 'The Dark Dungeon', 'Escape the dark and murky dungeon! Who knows what might be lurking out of sight… Find the path to promote your royal pawn and escape, or die trying', '2024-05-17 16:22:28.648', '2024-05-17 16:22:28.648', 'NCV', 'UNDER_REVIEW', NULL, 341609019, 'Fog of  Custom position Hill'),
	(221, 65579650, 'x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,2C,2N,2H,2K,2G,2H,2N,2C,x,x,x/x,x,x,2P,2P,2P,2P,2P,2P,2P,2P,x,x,x/x,x,x,8,x,x,x/x,x,x,X,X,X,2,X,X,X,x,x,x/x,x,x,X,X,X,2,X,X,X,x,x,x/x,x,x,8,x,x,x/x,x,x,0P,0P,0P,0P,0P,0P,0P,0P,x,x,x/x,x,x,0C,0N,0H,0K,0G,0H,0N,0C,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x-0-[false,true,false,true]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"royal":["h4","","g11",""],"pawnBaseRank":5,"wb":true,"dim":"8x8"}', 'Bunker Chess', 'i put all my work in  to this pls like ', '2024-05-14 03:56:40.344', '2024-05-14 03:56:40.344', 'NCV', 'DECLINED', 'We''ve declined similar variants before. 
Please see: https://variants.world/posts/10001 and https://variants.world/posts/10025
', 362796631, 'border hopper chess'),
	(216, 65466914, 'x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,3U,x,3U,x,3Δ,0B,0β,0β,0β,0β,x,x/x,x,x,3U,x,3U,x,0β,x,1,0δ,1,x,x/x,x,3U,x,0β,x,x,0B,x,2δ,2δ,2δ,x,x/x,x,x,3U,x,3A,x,0B,x,2β,2β,x,x,x/x,x,3U,x,0β,x,x,0B,x,3,x,x/x,x,x,3U,x,0β,x,0B,x,3,x,x/x,x,0β,x,3U,x,x,0B,x,dB,dB,dB,x,x/x,x,x,0β,x,1W,x,0B,x,1F,1W,1F,x,x/x,x,0B,x,2W,x,x,0B,x,1H,1E,1E,x,x/x,x,x,dB,x,3W,x,0B,x,1A,1A,1O,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x/x,x,x,x,x,x,x,x,x,x,x,x,x,x-1-[false,false,false,false]-[true,true,true,true]-[true,true,true,true]-[0,0,0,0]-0-{"royal":["c4","f5","e4","f3"],"lives":[420,1,1,69],"resigned":[true,null,null,true],"zombieType":["pusher","","","muncher"],"zombieImmune":[true,false,false,false],"pawnBaseRank":10,"dim":"10x10","noCorners":true}', 'Lobotomy Runway', 'I lobotomised my favorite variant and turned it into a mini version of thermopylae. Instead of trying to stalemate yourself, Blue has to block Red''s sideways moving pawn, and Yellow has to protect that pawn from Blue. By the way, was the Random Pieces Jumpscare scary? Type aaaa in the comments if that scared you.', '2024-05-11 00:44:47.743', '2024-05-11 00:44:47.743', 'WOF', 'DECLINED', 'The strategy is very dry as Yellow’s entire play is “strategical shuffling” with pawns. Regardless of whether or not this variant is forced, the game ends in about 10 moves anyway, which is not too ideal for an interesting variant.', 258358739, 'Lobotomy yawnuR');


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."Comment" ("id", "content", "createdAt", "postId", "userId", "parent_id", "hidden") VALUES
	(1235, 'Thats their purpose lol.', '2024-06-11 20:32:45.777', 212, 211710517, NULL, false),
	(696, 'The entire dynamic is kind of flawed because inevitably one side will have an advantage, imo', '2024-04-28 21:48:31.725', 204, 47901080, 695, false),
	(959, 'who is reviewing this?', '2024-05-19 23:39:15.184', 220, 160519263, NULL, false),
	(822, 'Myself and @Unknown_2015 were the main reviewers on this variant. Any particular reason why you''re asking?', '2024-05-09 20:21:27.178', 215, 47901080, 813, false),
	(782, '2bHNST are you infected by the rickroll virus ', '2024-05-08 01:40:14.195', 214, 160519263, NULL, true),
	(1252, 'how old
', '2024-06-12 08:03:44.779', 223, 167239707, NULL, false),
	(781, 'again', '2024-05-08 01:38:45.551', 214, 160519263, NULL, true),
	(671, 'Shout out to @anonymous15010, @JustASpeedcuber and @tomasignaciorochazubieta for participating in my 5000th game!', '2024-04-27 02:08:13.922', 201, 258358739, NULL, false),
	(673, 'anonymous15010 is me', '2024-04-27 05:46:30.835', 201, 310761269, NULL, false),
	(674, 'is it too much pawns?', '2024-04-27 16:18:22.006', 203, 160519263, NULL, false),
	(695, 'So basically, I have to make it so Blue isn''t relying on RY making bad moves. Got it, will start making changes.', '2024-04-28 21:11:34.035', 204, 211710517, NULL, false),
	(698, 'sorry the pawns are meant to be gray', '2024-04-28 22:26:27.951', 205, 160519263, NULL, false),
	(699, 'i will remove it', '2024-04-28 22:26:46.834', 205, 160519263, NULL, false),
	(700, 'If I give Blue more pieces or a better position, would it eventually be balanced? Or maybe it won''t work because Blue will still be against two players?', '2024-04-28 23:14:50.356', 204, 211710517, NULL, false),
	(780, 'first lobotomy now rickroll
plz dont rickroll me', '2024-05-08 01:38:37.738', 214, 160519263, NULL, true),
	(779, 'oops too long
', '2024-05-08 01:37:55.843', 214, 160519263, NULL, true),
	(820, '*turning on expensive mode*', '2024-05-09 20:19:29.943', 215, 160519263, NULL, true),
	(960, 'me too ethanlochess8.', '2024-05-19 23:40:26.737', 225, 160519263, NULL, false),
	(701, 'The problem is that you’re setting essentially a “time limit” for when Blue will win. Here, other than Red and Yellow potentially not cooperating due to low level (which is very likely), Blue could also be met instead with very strong players who know to get rid of the threat immediately. Coming back to the start, the gameplay is inherently linear because there is no way to “balance the game” when either Blue is winning and unstoppable in 15-20 moves (which is a very short amount of time to give), Red and Yellow break through Blue’s defense before that time. With such a limited amount of pieces, drawing isn’t going to possible.', '2024-04-28 23:30:49.268', 204, 47901080, 700, true),
	(702, 'If Blue has a clear path to victory in 15ish moves in a 3P variant, then it’s basically impossible to balance. In addition, given the limited amount of pieces, either Blue is losing, or winning. It’s hard to come to something in between here.', '2024-04-28 23:33:03.316', 204, 47901080, 700, false),
	(703, 'I hope this variant gets accepted. This is my first NCV and it won''t be the last!', '2024-04-29 14:11:40.416', 209, 329781945, NULL, false),
	(704, 'Why 6- you know what, I''m not even gonna ask.', '2024-04-29 20:14:25.979', 208, 211710517, NULL, false),
	(705, 'good luck', '2024-04-29 20:19:49.727', 209, 160519263, NULL, false),
	(706, 'good luck', '2024-04-30 06:35:13.184', 209, 258358739, NULL, false),
	(707, 'Good luck but white will win if move grasshopper. ', '2024-04-30 11:22:30.388', 209, 92837782, NULL, false),
	(708, 'Thanks for the luck. But how will white win with the grasshopper?', '2024-04-30 15:37:07.221', 209, 329781945, NULL, false),
	(709, 'But like, is it possible to make it balanced?', '2024-04-30 23:06:08.186', 204, 211710517, 702, false),
	(711, 'Should this be NCV?', '2024-05-01 07:03:25.68', 210, 75596324, NULL, false),
	(713, 'What should the name be? IDK', '2024-05-01 07:43:54.245', 210, 75596324, NULL, false),
	(716, 'good luck for this to et accepted', '2024-05-01 18:27:16.74', 210, 160519263, NULL, false),
	(717, 'sorry i meant at', '2024-05-01 18:27:42.317', 210, 160519263, NULL, false),
	(718, 'You should’ve picked a name before making the post 🙂', '2024-05-01 23:23:47.275', 210, 47901080, 713, false),
	(719, 'oh ok', '2024-05-02 07:20:42.737', 210, 75596324, NULL, false),
	(720, 'so what should i do?', '2024-05-02 07:21:05.634', 210, 75596324, NULL, false),
	(722, 'I just realized white can get an important advantage if black blunders move 1. But i think it''s not important tho asit wouldn''t be the most logic move.', '2024-05-02 13:39:30.114', 209, 329781945, NULL, false),
	(723, 'The 2. in the description is super important', '2024-05-02 13:40:31.368', 208, 329781945, NULL, false),
	(725, '2 mentioned https://variants.world/posts/169', '2024-05-03 05:21:14.701', 208, 258358739, NULL, false),
	(727, 'Maybe? 3P is by far the hardest to make balanced because you generally need to give them an equal amount of pieces and not encourage 2v1s; board shape is also a thing to consider because if you put someone smack in the middle of 2 players, then obviously we know where that''d end up going.', '2024-05-03 13:03:22.484', 204, 47901080, 709, false),
	(728, 'What I''ve generally seen is that the board is "triangular", or that the board is made such that the players are far away from each other that attacks are a bit harder without a setup and that there''s some sort of objective in the middle.', '2024-05-03 13:05:30.158', 204, 47901080, NULL, false),
	(730, 'good luck', '2024-05-04 20:58:50.811', 212, 160519263, NULL, false),
	(731, 'Thanks!', '2024-05-04 21:22:40.848', 212, 211710517, NULL, false),
	(732, 'cool', '2024-05-04 21:31:29.14', 212, 288038273, NULL, false),
	(733, 'Gh3 is a fork on move 1', '2024-05-04 23:17:15.472', 209, 211710517, NULL, false),
	(739, '1 Gh3 Gg6
2 Gc8x/\+ Gc8xg
3 Pawn moves.', '2024-05-04 23:25:08.022', 209, 211710517, NULL, false),
	(742, 'good luck', '2024-05-05 04:29:16.297', 209, 258358739, NULL, false),
	(734, '1 Gh3 Gg6
2 Gc8x/\+ Gc8xg
3 Pawn moves.', '2024-05-04 23:25:07.69', 209, 211710517, NULL, true),
	(735, '1 Gh3 Gg6
2 Gc8x/\+ Gc8xg
3 Pawn moves.', '2024-05-04 23:25:07.701', 209, 211710517, NULL, true),
	(736, '1 Gh3 Gg6
2 Gc8x/\+ Gc8xg
3 Pawn moves.', '2024-05-04 23:25:07.729', 209, 211710517, NULL, true),
	(737, '1 Gh3 Gg6
2 Gc8x/\+ Gc8xg
3 Pawn moves.', '2024-05-04 23:25:07.764', 209, 211710517, NULL, true),
	(738, '1 Gh3 Gg6
2 Gc8x/\+ Gc8xg
3 Pawn moves.', '2024-05-04 23:25:07.876', 209, 211710517, NULL, true),
	(741, 'lol and lets start the ''good luck'' trend', '2024-05-05 04:29:09.469', 209, 258358739, NULL, true),
	(743, 'um fire in the hole????????', '2024-05-05 18:40:06.762', 214, 160519263, NULL, false),
	(744, 'No, water in the air.', '2024-05-05 19:42:36.907', 214, 211710517, NULL, false),
	(745, 'I think you meant water on the hill', '2024-05-05 20:17:36.853', 214, 160519263, NULL, false),
	(746, 'Yeah that''s what I meant to say.', '2024-05-05 21:42:57.943', 214, 211710517, 745, false),
	(747, 'The red pusher bishop is fire in the hole, the red pusher soldier is water on the hill, the red pusher king is rock on the ground, the red pusher amazon is wind from the landscape', '2024-05-06 03:36:48.957', 214, 258358739, NULL, false),
	(750, '3 Warui Variants, this and Every End is still UR. Why?', '2024-05-06 08:54:09.692', 214, 258358739, NULL, false),
	(751, 'Because the variants are coming in faster than we can review them, 20 variants all requiring time and effort from the CGA team isn''t exactly going to go by quickly compared to a much lesser load maybe 1-2 years ago :)', '2024-05-06 09:24:17.854', 214, 47901080, 750, false),
	(752, 'This is really good!', '2024-05-06 19:44:50.374', 209, 352656035, NULL, false),
	(755, 'hope this will get accepted', '2024-05-06 22:26:36.016', 215, 160519263, NULL, false),
	(756, 'remember there might be a another one of this coming after this one (The Chaotic Structure II)', '2024-05-06 22:34:02.628', 215, 160519263, NULL, false),
	(763, 'FIRE IN THE HOLE!', '2024-05-07 02:18:12.957', 214, 258358739, NULL, true),
	(762, 'FIRE IN THE HOLE!', '2024-05-07 02:18:12.601', 214, 258358739, NULL, true),
	(761, 'FIRE IN THE HOLE!', '2024-05-07 02:18:12.538', 214, 258358739, NULL, true),
	(760, 'and this is a joke ok nothing serious', '2024-05-06 22:38:40.893', 214, 160519263, NULL, true),
	(759, 'no seriously plz do not click on this link', '2024-05-06 22:37:04.6', 214, 160519263, NULL, true),
	(754, 'btw FIRE IN THE HOLE', '2024-05-06 22:20:43.904', 214, 160519263, NULL, true),
	(753, 'BFDICHESS how did you found out of this lobotomy trend', '2024-05-06 22:20:17.334', 214, 160519263, NULL, true),
	(757, 'if this gets accepted', '2024-05-06 22:34:14.045', 215, 160519263, NULL, true),
	(714, 'c', '2024-05-01 07:44:06.169', 210, 75596324, NULL, true),
	(712, 'IDK', '2024-05-01 07:06:29.377', 210, 75596324, NULL, true),
	(710, 'Yay', '2024-05-01 07:03:13.214', 210, 75596324, NULL, true),
	(740, 'Whoops didnt mean to post that many times', '2024-05-04 23:25:20.014', 209, 211710517, NULL, true),
	(726, 'yay', '2024-05-03 08:46:56.264', 209, 329781945, NULL, true),
	(724, 'how about another one', '2024-05-02 17:35:50.561', 209, 160519263, 721, true),
	(721, 'Who gave the third like? Thank you!', '2024-05-02 13:38:11.798', 209, 329781945, NULL, true),
	(777, 'One change I would make is swapping the places of the dragons and camels.', '2024-05-08 00:15:30.563', 209, 211710517, NULL, false),
	(778, 'noooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo?!!!!!!', '2024-05-08 01:37:32.054', 214, 160519263, NULL, true),
	(783, 'You''re infected with the spam virus >:)', '2024-05-08 01:56:36.214', 214, 211710517, NULL, true),
	(776, '1\1ever gonna give you up, 
Never gonna let you down,
Never gonna run around, and desert you.
Never gonna make you cry,
Never gonna say goodbye,
Never gonna tell a lie, and hurt you.', '2024-05-07 23:49:24.912', 214, 211710517, NULL, true),
	(775, '1', '2024-05-07 23:45:04.305', 214, 211710517, NULL, true),
	(774, 'type 1 if you are ok', '2024-05-07 22:29:08.657', 214, 160519263, NULL, true),
	(773, '2bHNST are you infected by the lobotomy virus', '2024-05-07 22:28:55.57', 214, 160519263, NULL, true),
	(772, 'or a lobotomy face', '2024-05-07 21:58:07.309', 214, 160519263, NULL, true),
	(771, 'why is there a fire in the hole?', '2024-05-07 21:57:47.912', 214, 160519263, NULL, true),
	(770, 'There''s a minor inciddnt outside; stay in.', '2024-05-07 20:44:23.898', 214, 211710517, NULL, true),
	(768, 'BFDICHESS are you ok', '2024-05-07 13:24:02.521', 214, 160519263, NULL, true),
	(767, '*runs into the nearest bunker*', '2024-05-07 13:22:08.723', 214, 160519263, NULL, true),
	(766, '0.5', '2024-05-07 06:48:26.501', 214, 258358739, NULL, true),
	(764, 'BFDICHESS are you ok type 1 if you are ok don''t type 1 means that you are infected by the lobotomy virus', '2024-05-07 03:30:29.238', 214, 160519263, NULL, true),
	(758, 'plz do not copy and paste this link on youtube https://www.youtube.com/watch?v=6Nyy17k_9ds', '2024-05-06 22:36:21.223', 214, 160519263, NULL, true),
	(784, 'Also its like 9 pm in your time zone why are you still awake', '2024-05-08 01:57:52.531', 214, 211710517, NULL, true),
	(785, 'now try to get most comments on any ncv post ok', '2024-05-08 02:23:53.08', 214, 258358739, NULL, true),
	(786, 'Just because we’re outside of chess.com doesn’t mean that we should spread one message into 5, just fyi', '2024-05-08 03:03:54.302', 214, 47901080, NULL, true),
	(787, 'I’m lenient on starting chains on some posts, but there are other places to just pointlessly spam', '2024-05-08 03:04:33.435', 214, 47901080, NULL, true),
	(788, 'that is probably because of the ncv limit. there should be 2 variants per week rule.', '2024-05-08 09:12:20.889', 214, 258358739, 751, false),
	(789, 'How is this not accepted yet?!', '2024-05-08 17:37:15.907', 209, 352656035, NULL, false),
	(791, 'Ok, I''m trying to remake this.
Here''s my idea: 4 players on a 6x6. Each player gets 1 pawn, 1 ferz, 1 wazir, and 1 xiangqi horse. 4+, game of points, promotion to ferz, wazir, or xiangqi horse, and crazyhouse. +5 for mate', '2024-05-08 20:15:02.94', 212, 211710517, NULL, false),
	(792, 'who liked', '2024-05-08 23:47:08.421', 213, 160519263, NULL, false),
	(794, 'It takes a lot of time for testing, plus there''s a lot of ither variants to test as well. The vote must be unanimous, and the fact they all live in different timezones doesn''t help either.', '2024-05-09 00:45:49.78', 209, 211710517, 789, false),
	(796, 'My main concern here is if a player decides to only place down sergeants, as they can''t blow up.', '2024-05-09 00:55:16.971', 215, 211710517, NULL, false),
	(797, 'what do you mean', '2024-05-09 02:03:56.924', 215, 160519263, NULL, false),
	(790, 'who gave a like', '2024-05-08 20:12:39.155', 215, 160519263, NULL, true),
	(769, 'btw this is so scary ', '2024-05-07 19:32:03.277', 215, 160519263, NULL, true),
	(798, 'It’s variants coming from different people, and it’s across a prolonged period of time, so just because we don’t have a limit anymore doesn’t mean it’s therefore the reason', '2024-05-09 02:07:37.737', 214, 47901080, 788, false),
	(795, 'It takes a lot of time for testing, plus there''s a lot of ither variants to test as well. The vote must be unanimous, and the fact they all live in different timezones doesn''t help either.', '2024-05-09 00:45:49.911', 209, 211710517, 789, true),
	(793, 'It takes a lot of time for testing, plus there''s a lot of ither variants to test as well. The vote must be unanimous, and the fact they all live in different timezones doesn''t help either.', '2024-05-09 00:45:49.762', 209, 211710517, 789, true),
	(799, 'So you can place down a lot of sargeants, and pawns dont blow up, so what if a player places down sergeants and nothing else (except maybe backrank)?', '2024-05-09 02:08:06.844', 215, 211710517, NULL, false),
	(800, 'no no no no sergeants can only be places on the 5th and 6th rank', '2024-05-09 02:11:34.191', 215, 160519263, NULL, false),
	(801, 'you can only place 16 sergeants with the limited amount of space', '2024-05-09 02:13:27.454', 215, 160519263, NULL, false),
	(803, 'I think the more pressing issue with the sergeants is that placing 16 of them is the most ideal opening in every scenario; which means that 16 moves of both players'' time is wasted setting it up. In cases like this, the question of "why wasn''t this just made the starting position?" needs to be asked.', '2024-05-09 06:53:54.197', 215, 47901080, NULL, true),
	(804, 'I think the more pressing issue with the sergeants is that placing 16 of them is the most ideal opening in every scenario, which means that 16 moves of both players'' time is wasted setting it up. In cases like this, the question of "why wasn''t this just made the starting position?" needs to be asked.', '2024-05-09 06:54:14.104', 215, 47901080, NULL, false),
	(805, ' 2bHNST, I could consider it but i wanted to imitate the basic chess position. ', '2024-05-09 13:10:47.899', 209, 329781945, NULL, false),
	(806, 'But it''s also about checks so the move 1 fork doesn''t fully win', '2024-05-09 13:19:08.941', 209, 329781945, NULL, false),
	(807, 'You have a point, but I still think black should have an extra life', '2024-05-09 14:07:16.923', 209, 211710517, NULL, false),
	(809, 'how long has this been under review?', '2024-05-09 19:28:32.545', 215, 160519263, NULL, false),
	(811, 'ChessMasterGS I am experimenting the a new starting pos this right now', '2024-05-09 19:42:49.102', 215, 160519263, NULL, false),
	(812, '2 days...? That''s when it was submitted, and that''s when we start reviewing it', '2024-05-09 19:54:54.556', 215, 47901080, 809, false),
	(813, 'who declined this? lol.', '2024-05-09 20:00:00.627', 215, 160519263, NULL, false),
	(1254, 'NO the rule is a bit diffrent
https://www.pychess.org/variants/grand
', '2024-06-12 09:15:09.011', 213, 167239707, NULL, false),
	(817, 'to be fair I think sergeants and knights are op', '2024-05-09 20:10:38.818', 215, 160519263, NULL, false),
	(808, 'so this is getting declined? :(', '2024-05-09 19:28:04.119', 215, 160519263, NULL, true),
	(814, 'well, it was exciting when it lasted -_-', '2024-05-09 20:01:19.58', 215, 160519263, NULL, true),
	(816, 'also, everything can stay except for knights and sergeants', '2024-05-09 20:07:19.755', 215, 160519263, NULL, true),
	(815, 'type 1 to pay respect', '2024-05-09 20:01:46.671', 215, 160519263, NULL, true),
	(810, 'btw I have one version of this that has solders not sergeants', '2024-05-09 19:36:47.741', 215, 160519263, NULL, true),
	(821, 'Please keep it to one message in the future 🙂
If I posted this without condensing it, then it''d be...
3 comments', '2024-05-09 20:20:20.549', 215, 47901080, NULL, false),
	(823, 'just wondering and yes, 
I will condense it next time when I make a message 
', '2024-05-09 21:04:50.367', 215, 160519263, NULL, false),
	(824, '"Low point value", ok
I will just going to remove 
the cheap ones. :)', '2024-05-09 21:09:04.225', 215, 160519263, NULL, false),
	(826, 'fixing almost (I think) all the problems
1 new starting position
2 remove all the low valued pieces
3 "playing actively near the middle is enough to force a win or a draw."
yeah, I don''t know how to fix this. -_-', '2024-05-10 00:49:54.72', 215, 160519263, NULL, false),
	(827, 'Maybe try blocking off the center, or adding KotH squares on the sides. 
Just and idea.', '2024-05-10 01:28:43.606', 215, 211710517, NULL, false),
	(829, 'Let me rephrase then, the position is cramped bc of the number of pieces and walls, and the way that they''re arranged', '2024-05-10 03:20:26.239', 215, 47901080, 826, false),
	(830, 'but then i could make 200 variants in 1 day and it will take a while to review them all', '2024-05-10 06:04:32.501', 214, 258358739, 798, false),
	(831, 'I mean makes sense but black''s dragon is defended in the fork so if i give black an extra life i just give black an almost decisive advantage. So... I mean grasshopper and dragon are almost equal so the checks make the advantage minimum right? Anyways I will consider it.', '2024-05-10 09:02:07.413', 209, 329781945, NULL, false),
	(832, 'so I should remove the center wall?', '2024-05-10 17:54:13.591', 215, 160519263, NULL, false),
	(833, 'I mean, go ahead if you want, but removing the issues in this variant isn’t about making a singular change and calling it a day', '2024-05-10 21:45:23.348', 215, 47901080, 832, false),
	(834, 'That’s whataboutism to another level', '2024-05-10 21:46:30.55', 214, 47901080, 830, false),
	(835, 'I can but it still will not get 
accepted.', '2024-05-10 22:15:49.452', 215, 160519263, NULL, false),
	(836, 'aaaa', '2024-05-11 00:47:37.283', 216, 258358739, NULL, false),
	(837, 'aaaa', '2024-05-11 00:51:03.741', 216, 171868701, NULL, false),
	(839, 'Why 42- still not gonna ask', '2024-05-11 01:10:20.921', 216, 211710517, NULL, false),
	(840, 'These references are *very* subtle I must say', '2024-05-11 01:53:16.275', 216, 47901080, 839, false),
	(841, 'Quick question: is the issue lack of space? I mean, its literally 20 squares.', '2024-05-11 02:43:44.059', 212, 211710517, NULL, false),
	(842, 'Declined: Bad N-check values.', '2024-05-11 02:53:07.124', 216, 211710517, NULL, false),
	(843, 'ow, my eyes hurt because of that lobotomy
 trend on gd. (joke)', '2024-05-11 03:04:38.219', 216, 160519263, NULL, false),
	(844, 'ok I will stop making this joke', '2024-05-11 03:05:14.013', 216, 160519263, NULL, false),
	(845, 'Good thing I play GD Lite. Have you seen the new level Blast Processing? It''s- wait, what do you mean its 2.2? What do you mean I''m still in 1.9?!', '2024-05-11 03:14:26.037', 216, 211710517, NULL, false),
	(846, 'This is a cool one', '2024-05-11 08:00:17.749', 206, 329781945, NULL, false),
	(848, 'good luck 
I like this variant hope this will get
accepted', '2024-05-11 16:52:38.577', 218, 160519263, NULL, false),
	(849, 'NOTE: This is the second version of my failed variant (The Chaotic Structure I) this is made
to combat the issues of my previous version of this variant.', '2024-05-12 01:47:46.814', 220, 160519263, NULL, false),
	(850, 'Would you mind explaining what changes were make to combat what issues?', '2024-05-12 02:16:04.753', 220, 47901080, 849, false),
	(851, '1 nerfed the promotion (ABEHMNQR to Q)
2 new starting position I did this because of this comment you told me
 "''Why wasn''t this just made the starting position?'' needs to be asked."
so I did.
3 remove all of the cheap pieces from the setup pool
(Rook, queen, knight, bishop, general, chancellor, archbishop, amazon, and king to only 
general, chancellor, archbishop, amazon, and king)
Yeah, I did a lot of nerfing.
', '2024-05-12 02:31:32.024', 220, 160519263, NULL, false),
	(853, 'Thank you, I hope so too.', '2024-05-12 06:22:53.218', 218, 353384769, NULL, false),
	(854, 'I like this variant; I hope this will get
accepted.', '2024-05-12 06:24:20.411', 220, 353384769, NULL, false),
	(855, '2.2 is the full version lol', '2024-05-12 10:44:28.511', 216, 258358739, NULL, false),
	(856, 'Thanks and you too.', '2024-05-12 14:08:31.673', 220, 160519263, NULL, false),
	(857, 'Wait, but I have The Tower. That''s 2.2 right?', '2024-05-12 14:19:06.371', 216, 211710517, NULL, false),
	(858, 'btw I gave a like :)', '2024-05-12 21:00:30.389', 218, 160519263, NULL, false),
	(859, 'seggura your variant is under review for like over 1 week.', '2024-05-12 23:54:43.768', 209, 160519263, NULL, false),
	(861, 'yes but you dont have dash', '2024-05-13 05:12:20.04', 216, 258358739, NULL, false),
	(865, 'That''s actually not long. Reinforced Crazyhouse was posted 2 months ago, and is still under review.', '2024-05-13 20:32:46.172', 209, 211710517, NULL, false),
	(867, 'can you give me the link to the post pls', '2024-05-13 21:13:55.754', 209, 160519263, NULL, false),
	(870, 'https://variants.world/posts/145', '2024-05-14 01:46:09.951', 209, 211710517, NULL, false),
	(866, 'ChessMasterGS do you have any thoughts on this custom chess variant?', '2024-05-13 21:10:51.364', 220, 160519263, NULL, true),
	(825, 'sorry except pawns', '2024-05-09 21:09:48.382', 215, 160519263, NULL, true),
	(868, ' who gave a like', '2024-05-14 01:12:48.685', 220, 160519263, NULL, true),
	(875, 'Here''s an older Under Review: https://variants.world/posts/100', '2024-05-14 02:39:28.42', 209, 211710517, NULL, false),
	(881, 'Good luck with your game but this game need to spend a lot of time to play :) ', '2024-05-14 11:48:49.732', 223, 92837782, NULL, false),
	(876, 'um who liked', '2024-05-14 02:41:20.921', 220, 160519263, NULL, true),
	(877, 'Me.', '2024-05-14 04:56:25.143', 220, 353384769, NULL, true),
	(882, 'Your variant''s name has been temporarily changed, please check your DMs for more information.', '2024-05-14 13:42:46.063', 221, 47901080, NULL, false),
	(883, 'Good luck, I like this variant', '2024-05-14 14:33:01.574', 223, 160519263, NULL, false),
	(884, 'I played this', '2024-05-14 14:33:34.566', 221, 160519263, NULL, false),
	(885, 'Remeber "Clash of Minor Pieces?" This is "Clash of Major Pieces."', '2024-05-15 01:21:24.039', 223, 211710517, NULL, false),
	(889, 'you copy https://www.pychess.org/analysis/grand
', '2024-05-15 11:51:42.108', 213, 167239707, NULL, false),
	(892, 'I like the design of the stone walls', '2024-05-15 21:41:43.739', 220, 341609019, NULL, false),
	(895, 'https://variants.world/posts/223', '2024-05-16 11:51:15.193', 224, 167239707, NULL, false),
	(896, 'seems a bit unfair for blue.', '2024-05-16 12:19:34.398', 224, 353384769, NULL, false),
	(897, 'I can wait.', '2024-05-16 12:55:54.091', 209, 329781945, NULL, false),
	(901, 'Getting nervous, I am.', '2024-05-16 13:02:13.285', 209, 329781945, NULL, false),
	(902, 'Kinda agree with RealPengu34 but everything other that that 
I like the variant', '2024-05-16 14:23:46.78', 224, 160519263, NULL, false),
	(903, 'That sounds like a Yoda quote', '2024-05-16 16:25:46.387', 209, 47901080, 901, false),
	(904, 'wow, declined in one day.
', '2024-05-16 16:44:05.08', 224, 353384769, NULL, false),
	(905, 'this game seems a bit random, because green could take the corner X-horse, or not, which means 50/50% of blue  one egettingxtra move.', '2024-05-16 17:27:54.279', 216, 51805526, NULL, false),
	(906, '*getting one extra*
', '2024-05-16 17:28:14.508', 216, 51805526, NULL, false),
	(907, '4 days making good progress hopefully', '2024-05-16 20:09:56.093', 220, 160519263, NULL, false),
	(908, 'I''m getting dejavu ''cause Eleventh Hour', '2024-05-16 20:12:54.17', 224, 211710517, NULL, false),
	(910, 'World record?', '2024-05-17 02:27:32.489', 224, 160519263, NULL, false),
	(911, '!', '2024-05-17 02:31:56.006', 213, 160519263, NULL, false),
	(912, 'Oh I did not know that website existed 😅 ', '2024-05-17 02:33:53.2', 213, 160519263, NULL, false),
	(913, 'Am I the only one who copied others?
:(', '2024-05-17 02:36:38.777', 213, 160519263, NULL, false),
	(914, 'I did it on purpose actually
', '2024-05-17 08:48:06.833', 209, 329781945, NULL, false),
	(915, 'thats the point lol', '2024-05-17 09:21:03.051', 216, 258358739, NULL, false),
	(916, 'wow, declined in one day.      

that amazing
', '2024-05-17 09:51:40.41', 224, 167239707, NULL, false),
	(919, 'no tineants checkers declined within 58 minutes', '2024-05-17 10:02:04.241', 224, 258358739, NULL, false),
	(920, 'Please set a name for the variant. I will have to autodecline it in a day if this isn’t done 🙂', '2024-05-17 16:44:26.723', 225, 47901080, NULL, false),
	(918, 'at post224
', '2024-05-17 09:54:48.195', 223, 167239707, NULL, true),
	(917, 'wow, declined in one day.                                                                    
', '2024-05-17 09:54:38.051', 223, 167239707, NULL, true),
	(887, 'try to look at my profile picture
', '2024-05-15 09:45:20.04', 223, 167239707, NULL, true),
	(886, 'i call the wildbest a (vibesbest)
', '2024-05-15 09:44:38.375', 223, 167239707, NULL, true),
	(921, 'Labyrinth of the fog maybe...?', '2024-05-17 17:58:14.988', 225, 353384769, NULL, false),
	(922, '"Scary Path"', '2024-05-17 20:10:13.867', 225, 211710517, NULL, false),
	(923, 'I might try to make something like this, is that fine by you?', '2024-05-17 20:26:37.372', 224, 211710517, NULL, false),
	(924, 'maybe dungeon of death?', '2024-05-17 21:19:15.601', 225, 160519263, NULL, false),
	(926, 'I''m assuming you used futers because it''s easier to test, but anyways, here''s more ideas: Labyrinth 83, Ice Labyrinth, Cold Cage, One Way Out.', '2024-05-18 01:41:46.236', 225, 211710517, NULL, false),
	(927, '56 minutes.', '2024-05-18 07:49:23.385', 224, 353384769, 919, false),
	(929, 'In this 3P version of the variant I made 3 months ago (hopefully not the next 5 months old), you need to let the red pusher bishops take your pieces. Good luck!', '2024-05-18 12:52:23.758', 229, 258358739, NULL, false),
	(930, 'It''s a little bit luck based, but it is pretty fun.', '2024-05-18 12:53:08.296', 229, 258358739, NULL, false),
	(931, 'I hope this gets accepted. However, I don''t like the name.', '2024-05-18 12:58:49.515', 229, 171868701, NULL, false),
	(933, 'Atleast there is no lobotomy ', '2024-05-18 14:02:01.788', 229, 160519263, NULL, false),
	(934, 'Wind on the landscape', '2024-05-18 14:23:57.162', 229, 211710517, NULL, false),
	(935, 'I DMed them, and they want it to be called "The Dark Dungeon"', '2024-05-18 14:25:12.439', 225, 211710517, NULL, false),
	(932, 'Ok', '2024-05-18 14:01:10.413', 220, 160519263, NULL, true),
	(925, 'ChessMasterGS what is the probability of this getting accepted?', '2024-05-18 00:33:18.381', 220, 160519263, NULL, true),
	(928, 'how am I supposed to know?', '2024-05-18 08:23:12.311', 220, 47901080, 925, true),
	(909, 'how long will it take to be done reviewing?
just wondering.', '2024-05-17 00:45:38.715', 220, 160519263, NULL, true),
	(893, 'the pattern?', '2024-05-15 22:00:05.374', 220, 160519263, NULL, true),
	(936, 'That wan''t a troll post, that was real', '2024-05-18 22:43:00.128', 229, 258358739, NULL, false),
	(937, 'i swear i am making a ''newer'' version', '2024-05-18 22:56:49.553', 229, 258358739, NULL, false),
	(938, 'I made a newer version of ''When will Every End get accepted or declined?'' so it doesn''t look like a troll post. This time, I added more strategies (such as a closer hill square). Check https://www.chess.com/variants/custom/game/65804004/64/2', '2024-05-18 23:06:22.056', 229, 258358739, NULL, false),
	(939, 'it is going to be acepted
', '2024-05-19 01:06:26.548', 223, 167239707, NULL, false),
	(944, 'It says you are banned.', '2024-05-19 08:33:30.349', 229, 353384769, NULL, false),
	(945, 'AMAZING', '2024-05-19 10:51:34.81', 224, 167239707, NULL, false),
	(946, 'who rewiew stuff
', '2024-05-19 10:52:17.273', 223, 167239707, NULL, false),
	(949, 'for 2 weeks sadly :(', '2024-05-19 13:47:21.632', 229, 160519263, NULL, false),
	(953, 'He''s trolling.', '2024-05-19 16:38:52.873', 229, 353384769, NULL, false),
	(956, 'Thank you', '2024-05-19 21:09:27.589', 225, 341609019, NULL, false),
	(957, 'I couldn’t change it, I dunno why', '2024-05-19 21:09:57.703', 225, 341609019, NULL, false),
	(962, 'Not a bad variant, but for an NCV... red is kind of OP, and the fog makes it very confusing. With the red-yellow piece difference, it would make a better WoF then NCV imo.', '2024-05-20 02:15:50.207', 225, 61432988, NULL, false),
	(966, 'Boom get banned', '2024-05-20 12:21:08.551', 229, 329781945, NULL, false),
	(967, 'Hi! Any updates from the testers?', '2024-05-20 12:22:01.185', 209, 329781945, NULL, false),
	(968, 'No attempts to put pressure :)', '2024-05-20 12:24:30.04', 209, 329781945, NULL, false),
	(970, 'As you can probably tell by the NCV Tester Application, we’re low on testers as two of our CGAs have gone missing, so we’ve been putting off testing some of the NCVs (although I’ve been analyzing it on my own time). I anticipate that with the new round of the applicants being accepted this week that testing will start soon.', '2024-05-20 15:04:23.956', 209, 47901080, 967, false),
	(974, 'Who turned on atomic mode?', '2024-05-20 20:13:34.465', 229, 211710517, NULL, false),
	(975, 'The red kings are supposed to be grey, if that''s what you mean.', '2024-05-20 20:14:17.621', 225, 211710517, NULL, false),
	(978, 'Click “try this variant to see.”', '2024-05-20 21:32:34.856', 225, 341609019, NULL, false),
	(899, 'NCVs take really long.', '2024-05-16 12:57:47.192', 209, 329781945, NULL, true),
	(986, 'Ah, that makes more sense. Why did the color switch when you posted it here?', '2024-05-21 00:48:48.822', 225, 61432988, NULL, false),
	(987, 'I have no idea. Maybe the website thingamajiggy can’t show grey pieces?', '2024-05-21 01:29:10.235', 225, 341609019, NULL, false),
	(988, 'I hope my variant gets accepted', '2024-05-21 01:30:22.978', 225, 341609019, NULL, false),
	(989, 'What I would do: RB vs YG, Stalemate win.', '2024-05-21 02:04:18.294', 216, 211710517, NULL, false),
	(991, 'Nothing, this wans''t a troll post, even so, <b>i only post troll posts on the first day of each week</b>', '2024-05-21 12:12:55.219', 229, 258358739, NULL, false),
	(1013, 'CGA team + variant testers.', '2024-05-22 21:50:27.208', 220, 211710517, NULL, false),
	(1082, 'Well i actually have no time for testing rn so i''m sorry', '2024-05-28 16:39:19.723', 209, 329781945, NULL, false),
	(1083, 'yea but it changes a lot', '2024-05-28 16:42:16.546', 206, 329781945, NULL, false),
	(1018, 'a2, b2, c2, f2, g2, h2, a7, b7, c7, f7, g7, and h7 pawns are useless ', '2024-05-23 07:52:14.257', 221, 163081401, NULL, false),
	(1026, 'I guess i can''t help bc i''m the creator, right?', '2024-05-23 14:43:31.83', 209, 329781945, NULL, false),
	(1047, 'This game has absolutely earned my love', '2024-05-24 08:30:38.3', 206, 50645954, NULL, true),
	(1048, 'This variant has absolutely earned my love.', '2024-05-24 08:31:08.237', 206, 50645954, NULL, false),
	(1049, 'Last time BFDI was a tester, and they had a lot of WoF under review.', '2024-05-24 13:42:32.029', 209, 211710517, NULL, false),
	(1051, 'Yeah but i meant on this variant.', '2024-05-24 13:52:07.757', 209, 329781945, NULL, false),
	(1055, 'I can wait', '2024-05-24 23:26:02.428', 220, 160519263, NULL, false),
	(1025, 'Ok', '2024-05-23 14:43:09.28', 209, 329781945, NULL, true),
	(1050, 'I think.', '2024-05-24 13:42:45.67', 209, 211710517, NULL, true),
	(1059, 'He was one of the players when we tested his own variant so that we could potentially get some extra insights, but we obviously didn''t allow him to vote. Either way, it''s more good than bad, so I would definitely be down to testing with seggura on this before I''m able to test with another CGA', '2024-05-25 10:20:21.869', 209, 47901080, 1049, false),
	(1019, 'aaaa', '2024-05-23 07:52:56.354', 216, 258358739, NULL, true),
	(1010, 'aaaa', '2024-05-22 21:07:50.372', 216, 341609019, NULL, true),
	(1014, 'ok', '2024-05-22 23:26:18.784', 220, 160519263, NULL, true),
	(1071, 'someone''s confident', '2024-05-26 09:00:38.101', 223, 163081401, 939, false),
	(1073, 'bruh i just changed the pieces in rookmate and added the camel in ashtandrez', '2024-05-26 09:18:43.977', 206, 258358739, NULL, false),
	(1076, 'CGA team + variant testers', '2024-05-26 14:16:50.55', 223, 211710517, 946, false),
	(1078, 'can i find them at chess.com
', '2024-05-27 07:17:29.503', 223, 167239707, 1076, false),
	(1085, 'Maybe the title was a bit silly, the description was poorly written, the tone of both sounds too informal to be serious about it', '2024-05-28 20:58:39.542', 229, 222632197, NULL, false),
	(1086, 'If you used a better title/description, they would probably accept', '2024-05-28 20:59:45.106', 229, 222632197, NULL, false),
	(1090, 'They are supposed to be there, I feel that if it were 4pc, it would be too chaotic ', '2024-05-29 13:25:05.276', 225, 341609019, 926, false),
	(1096, '1 month anniversary of Parallel Dimension Chess! (1 day late)', '2024-05-30 12:41:46.073', 209, 329781945, NULL, false),
	(1097, 'cga team how is the progress who are testing this variant?', '2024-05-30 23:04:13.143', 220, 160519263, NULL, false),
	(1100, 'no...?', '2024-05-31 07:41:27.369', 229, 47901080, 1086, false),
	(1107, 'Where is the whatabaout part of the ism?', '2024-05-31 16:38:33.511', 214, 163081401, NULL, false),
	(1111, 'Any long wait useally indicates that the CGA Team is etiher looking for testers or in the voting process', '2024-06-01 04:44:21.265', 220, 163081401, 1097, false),
	(1112, 'should have called this ''lobotomy end'', write a better description and play 10 actual testing gamed', '2024-06-01 10:45:55.215', 229, 258358739, NULL, false),
	(1113, 'what is better: regular rookmate or bad rookmate?', '2024-06-01 23:31:48.523', 206, 258358739, NULL, false),
	(1079, 'can i find them at chess.com
', '2024-05-27 07:17:30.271', 223, 167239707, 1076, true),
	(1123, 'ok ', '2024-06-03 00:08:54.116', 220, 160519263, NULL, true),
	(1080, 'double press', '2024-05-27 07:17:51.77', 223, 167239707, NULL, true),
	(1156, 'Fun fact: the name of this variant is a reference to the backrooms', '2024-06-04 20:07:46.37', 220, 160519263, NULL, false),
	(1159, 'who are the CGAs', '2024-06-04 20:29:42.684', 209, 160519263, 970, false),
	(1160, 'that went missing', '2024-06-04 20:30:06.841', 209, 160519263, NULL, false),
	(1173, 'Or neither. We have a lot of NCVs and we aren''t gonna necessarily be reviewing all of them at the same time or that''d be very inefficient ', '2024-06-05 20:43:12.361', 220, 47901080, 1111, true),
	(1174, 'are you a CGA?', '2024-06-05 21:03:38.044', 220, 160519263, 1111, false),
	(1175, 'has is this still under review?', '2024-06-05 21:16:01.321', 218, 160519263, NULL, false),
	(1176, 'sorry meant "how is this still under review?"', '2024-06-05 21:17:29.989', 218, 160519263, 1175, false),
	(1179, 'Who would actually waste their time "[making] 200 variants in a day"? The argument he made was questioning a system that so far hasn''t shown to be flawed, and proposing something as extreme as just brings up strange points', '2024-06-06 01:58:31.722', 214, 47901080, 1107, false),
	(1181, 'aaa', '2024-06-06 10:44:08.045', 229, 163081401, NULL, false),
	(1183, 'I have no idea.', '2024-06-06 12:11:01.766', 218, 353384769, NULL, false),
	(1184, 'Maybe it is really good. :D', '2024-06-06 12:11:25.272', 218, 353384769, NULL, false),
	(1188, 'how is this still under review?', '2024-06-06 20:28:05.271', 214, 160519263, NULL, false),
	(1189, 'You can find CGAs, and I think they list the variant testers on a forum somewhere.', '2024-06-07 00:24:53.129', 223, 211710517, NULL, false),
	(1190, 'Agreed. I love this variant that you''ve made here. I''ve played it and I have a lot of fun. Also the fact that the ranters are there makes the game actually possible since if they were players there would be too many attacks and ways to quickly lose. Also it makes people actually join. ', '2024-06-07 02:15:43.395', 225, 351884631, NULL, false),
	(1192, 'why is the wait so long', '2024-06-07 08:51:45.319', 223, 167239707, NULL, false),
	(1193, '
3 weeks ago
', '2024-06-07 08:53:13.1', 223, 167239707, NULL, false),
	(1194, 'my first variant posted here', '2024-06-07 14:30:03.282', 203, 160519263, NULL, false),
	(1196, 'the wazir can not move out. ', '2024-06-07 14:38:17.799', 212, 160519263, 841, false),
	(1197, 'no, but he''s decently knowledgeable on how the CGA team works', '2024-06-07 16:24:15.992', 220, 47901080, 1174, false),
	(1198, 'There are older variants lol', '2024-06-07 16:25:29.597', 214, 47901080, 1188, false),
	(1199, 'ok', '2024-06-07 20:51:08.707', 220, 160519263, NULL, false),
	(1201, 'Ok i meant not "they would probably accept" but "they would probably not think it is a joke post" unless it''s another copy of someone else''s creation', '2024-06-08 13:57:50.678', 229, 222632197, 1100, false),
	(1202, 'Ok i meant not "they would probably accept" but "they would probably not think it is a joke post" unless it''s another copy of someone else''s creation', '2024-06-08 13:57:50.809', 229, 222632197, 1100, false),
	(1203, 'Ok i meant not "they would probably accept" but "they would probably not think it is a joke post" unless it''s another copy of someone else''s creation', '2024-06-08 13:57:50.84', 229, 222632197, 1100, false),
	(1204, 'Ok i meant not "they would probably accept" but "they would probably not think it is a joke post" unless it''s another copy of someone else''s creation', '2024-06-08 13:57:51.1', 229, 222632197, 1100, false),
	(1205, 'whoops sorry for the spam when I clicked "comment" but it lagged, I clicked "comment" again and again, so this happened', '2024-06-08 13:58:41.604', 229, 222632197, NULL, false),
	(1206, 'Guys I am not seeing any problems with this variant', '2024-06-08 14:27:49.424', 220, 160519263, NULL, false),
	(1208, 'What is the back of the setup for?', '2024-06-08 20:57:36.638', 220, 272749467, NULL, false),
	(1209, 'I put setup because it will get pretty boring with a fixed position every time
I want it to be different, fun, and chaotic, hence the name (The Chaotic Structure)', '2024-06-09 01:29:53.815', 220, 160519263, 1208, false),
	(1215, 'If we simply reviewed every variant, even those that aren''t autodeclined, for something short like a single day, we would have incomplete reviews and a lot of variants would be wrongly declined or accepted where there is a crucial issue. ', '2024-06-10 03:13:00.151', 223, 47901080, 1192, false),
	(1219, 'Yeah Simplicity took like 5 months. And Dangerous Diagonals still doesn''t have a response.', '2024-06-10 18:49:16.319', 223, 211710517, NULL, false),
	(1223, '@ChessMasterGS is the CGA?
Or not who?
how many people?
', '2024-06-11 10:44:39.272', 223, 167239707, NULL, false),
	(1224, 'the link to Dangerous Diagonals?
', '2024-06-11 10:46:00.898', 223, 167239707, 1219, false),
	(1225, 'anyways I put the rules of the game diffrent
', '2024-06-11 10:48:24.176', 223, 167239707, NULL, false),
	(1227, 'GS is a CGA, along with NoWellOkay, fischer_tanvir, and JKCheeseChess', '2024-06-11 13:46:13.298', 223, 211710517, NULL, false),
	(1228, 'https://www.chess.com/clubs/forum/view/ncv-dangerous-diagonals
It''s so old that it isn''t even on variants world.', '2024-06-11 14:46:39.285', 223, 211710517, NULL, false),
	(1229, 'is there any balancing issues with my variant?', '2024-06-11 14:53:55.275', 220, 160519263, NULL, false);


--
-- Data for Name: GameRule; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."GameRule" ("id", "name") VALUES
	(1, '=D'),
	(2, '1 | 15D'),
	(3, '30-check'),
	(4, 'Play for Mate'),
	(5, '=KNR'),
	(6, 'Sideways'),
	(7, '5 | 5'),
	(8, 'Bare Piece'),
	(9, '1-check'),
	(10, '99th'),
	(11, '5 min'),
	(12, 'Passing'),
	(13, 'Foq'),
	(14, 'KotH(a1,n14)'),
	(15, '=GN'),
	(16, '6th'),
	(17, 'Self Check'),
	(18, 'Alt Teams'),
	(19, '1 | 1'),
	(20, 'KotH'),
	(21, '=R'),
	(22, '10th'),
	(23, '3 min'),
	(24, 'Regicide'),
	(25, '=E'),
	(26, 'Stalemate win'),
	(27, '10 min'),
	(28, '9-check'),
	(29, '10 | 15'),
	(30, '=BEHKNR'),
	(31, '11th'),
	(32, 'Seirawan'),
	(33, 'Crazyhouse'),
	(34, 'KotH(g7,g8,h7,h8)'),
	(35, '12-check'),
	(36, '=LV'),
	(37, '8th'),
	(38, 'Self Partner'),
	(39, 'RB'),
	(40, '2 | 5'),
	(41, '=EFKMNR'),
	(42, '=BKNR'),
	(43, '=HMV'),
	(44, '1 | 5'),
	(45, 'KotH(l6,n6)'),
	(46, 'Stalemate loss'),
	(47, 'RG'),
	(48, '=BCFGIS'),
	(49, '12th'),
	(50, 'KotH(g13)'),
	(51, '7-check'),
	(52, '22s | 2D'),
	(53, 'KotH(d4,d5,e4,e5)'),
	(54, '+40'),
	(55, 'Takeover'),
	(56, '45 sec'),
	(57, '20-check'),
	(58, '14th'),
	(59, '45s | 7D'),
	(60, 'Crazywan'),
	(61, 'KotH(c7,l8)'),
	(62, '3-check'),
	(63, '=FW'),
	(64, '5th'),
	(65, '1 | 2'),
	(66, 'Setup 23'),
	(67, 'Torpedo'),
	(68, '45s | 5D'),
	(69, 'Setup 5'),
	(70, '=AEHO'),
	(71, 'KotH(a1,a14,n1,n14)'),
	(72, '6-check'),
	(73, '=x'),
	(74, 'Setup 1,8'),
	(75, '30s | 2D'),
	(76, '=K'),
	(77, '9th'),
	(78, '+3'),
	(79, '=A'),
	(80, '30s | 1'),
	(81, '=CMNORΘ'),
	(82, '=F'),
	(83, '=QRBNSIF'),
	(84, '3 | 2'),
	(85, '=N'),
	(86, '2-check'),
	(87, '2 | 7'),
	(88, 'Any Capture'),
	(89, 'Fatal'),
	(90, '15s | 2D'),
	(91, '5-check'),
	(92, '3th'),
	(93, '1 | 1D'),
	(94, '=KN'),
	(95, '=BNR'),
	(96, '1 | 15'),
	(97, 'KotH(g13,h12,h13,h14,i13)'),
	(98, '15-check'),
	(99, 'Setup 16,5'),
	(100, '25s | 12D'),
	(101, '=M'),
	(102, 'Diplomacy'),
	(103, 'KotH(a1,c1,d1,e1,f1)'),
	(104, '=Xx'),
	(105, '1 | 7'),
	(106, '=Rx'),
	(107, '+10'),
	(108, '=BFN'),
	(109, '10 | 10D'),
	(110, 'No Opp Castling'),
	(111, '=BMRVZ'),
	(112, 'KotH(g8,h7)'),
	(113, 'KotH(n13,n9)'),
	(114, '30s | 2'),
	(115, 'Atomic'),
	(116, 'KotH(g10,g5,g6,g7,g8,g9,h10,h5,h6,h7,h8,h9)'),
	(117, '5 | 2'),
	(118, 'KotH(b1,m14)'),
	(119, '=O'),
	(120, '30s | 3D'),
	(121, 'KotH(d10,d5,f7,f8,i7,i8,k10,k5)'),
	(122, '4-check'),
	(123, 'KotH(n6)'),
	(124, '2 | 2'),
	(125, '=BEHKMNR'),
	(126, 'Setup 17,13'),
	(127, 'KotH(k7)'),
	(128, '13th'),
	(129, '6s | 1'),
	(130, '1 min'),
	(131, '4th'),
	(132, 'KotH(d11,e11,f11,g11,k4,k5,k6,k7)'),
	(133, '=B'),
	(134, 'Ox4'),
	(135, '=QV'),
	(136, '3 | 5'),
	(137, 'Giveaway'),
	(138, 'Taboo'),
	(139, 'KotH(a13,b13,c13,d13,e13,f13,g13,h13,i13,j13,k13,l13,m13,n13)'),
	(140, '=HOV'),
	(141, '1 | 2D'),
	(142, '=Q'),
	(143, '30 sec'),
	(144, '15 sec'),
	(145, '50-check'),
	(146, '=KEHMV'),
	(147, '=RBNH'),
	(148, '2 | 15'),
	(149, '4 | 5D'),
	(150, '=xXRK'),
	(151, '7th'),
	(152, '1 | 3'),
	(153, 'Semianon'),
	(154, '=BQR'),
	(155, '=BR'),
	(156, '3 | 4D'),
	(157, '=AEHV'),
	(158, '=BGKN'),
	(159, 'KotH(a14,b14,c14,d14,e14,f14,g14,h14,i14,j14,k14,l14,m14,n14)'),
	(160, '=KM'),
	(161, 'KotH(b12,c12,d12,e12,f12,g12,h12,i12,j12,k12,l12,m12)'),
	(162, 'KotH(c14,d14,e14,f14,i14,j14,k14,l14)'),
	(163, '+5'),
	(164, '10 | 6D'),
	(165, 'Ghost'),
	(166, '2 | 1'),
	(167, 'KotH(c3,d3,k3,l3)'),
	(168, '=GKU'),
	(169, '5 | 4'),
	(170, 'Setup 30'),
	(171, '5 | 3'),
	(172, '=BMNQR'),
	(173, '=BEHMNQR'),
	(174, 'Setup 10'),
	(175, 'KotH(e12,j3)'),
	(176, '=ABCEHKLMNOQRV'),
	(177, '=CGNY'),
	(178, '2th'),
	(179, 'Setup 20'),
	(180, '3 | 8D'),
	(181, '15 | 20'),
	(182, 'KotH(d7,d8,g7,g8,h7,h8,k7,k8)'),
	(183, '=FUW'),
	(184, '2 min'),
	(185, '=EHMOQUV'),
	(186, '=W'),
	(187, 'KotH(f6,f9,g7,g8,h7,h8,i6,i9)'),
	(188, '30 | 30'),
	(189, 'KotH(a8,g1,n10)'),
	(190, '30s | 1D'),
	(191, '=EHKMQV'),
	(192, 'Setup 19'),
	(193, '=BKQR'),
	(194, '=EHKY'),
	(195, '=EHM'),
	(196, '10 | 5'),
	(197, 'KotH(f7,g7,h7,i7)'),
	(198, 'Setup 6'),
	(199, '=BKNQR'),
	(200, '45s | 1'),
	(201, '=AEV'),
	(202, '=C'),
	(203, 'KotH(d14,e14,f14,g14,h14,i14,j14,k14,l14,m14,n14)'),
	(204, '45s | 10D'),
	(205, 'KotH(a1,b1,c1,d1,e1,f1,g1,h1,i1,j1,k1,l1,m1,n1)'),
	(206, 'KotH(k12)'),
	(207, '=BCFMNRSUWY'),
	(208, '1 | 10'),
	(209, '45s | 7'),
	(210, 'Setup 7,12'),
	(211, '6.9 min'),
	(212, 'Setup 60,8'),
	(213, '=BCJTY'),
	(214, '=CGK'),
	(215, '5 | 4D'),
	(216, 'Setup 35,7'),
	(217, '=EHV'),
	(218, 'KotH(b4,d13,k2,m11)'),
	(219, '=CKN'),
	(220, '1 | 25'),
	(221, 'Duck'),
	(222, '=BEHNQR'),
	(223, '30s | 5'),
	(224, '=FIN'),
	(225, '=KNRY'),
	(226, 'Anonymous'),
	(227, 'KotH(g1,h1)'),
	(228, '=DEHVΔΘ'),
	(229, '2 | 8'),
	(230, 'KotH(n10,n11,n4,n5,n6,n7,n8,n9)'),
	(231, '=V'),
	(232, 'Setup 31'),
	(233, '=DEHΘ'),
	(234, 'KotH(j14,l1)'),
	(235, 'KotH(d1,e1,f1,g1,h1,i1,j1,k1)'),
	(236, '=GMQΔ'),
	(237, '=BHNOZ'),
	(238, 'KotH(a6,a7,a8,a9,f1,f14,g1,g14,g7,g8,h1,h14,h7,h8,i1,i14,n6,n7,n8,n9)'),
	(239, 'KotH(g14,h1)'),
	(240, '7s | 7D'),
	(241, '=BEHKNQR'),
	(242, '=EHMΔ'),
	(243, '1.2 | 7'),
	(244, 'KotH(l14,n12)'),
	(245, '=GHM'),
	(246, '3 | 5D'),
	(247, '=GHN'),
	(248, 'KotH(e6,e7,e8,e9,f6,f7,f8,f9,g6,g7,g8,g9,h6,h7,h8,h9,i6,i7,i8,i9,j6,j7,j8,j9,k6,k7,k8,k9,l6,l7,l8,l9,m6,m7,m8,m9,n6,n7,n8,n9)'),
	(249, '=BNQR'),
	(250, 'KotH(a14,b14,d14,e14,g14,h14,j14,k14,m14,n14)'),
	(251, '=DH'),
	(252, 'KotH(g14,h14)'),
	(253, '=GQ'),
	(254, '1 | 3D'),
	(255, '=GHMQRVΔ'),
	(256, 'KotH(b14,c14,d14,f14,g14,h14,i14,j14,l14,m14,n14)'),
	(257, '=FNW'),
	(258, '=KNZ'),
	(259, '15s | 1D'),
	(260, '8-check'),
	(261, '3 | 1'),
	(262, '=BKMNQR'),
	(263, 'KotH(b14,c14,d14,e14,f14,g14,i14,j14,k14,l14,m14,n14)'),
	(264, '=BRU'),
	(265, '1th'),
	(266, 'KotH(d14,e14,g14,h14,j14,k14)'),
	(267, '=LO'),
	(268, 'Setup 14'),
	(269, 'KotH(f9,i6)'),
	(270, '4 | 4'),
	(271, 'KotH(d10,d4,d5,d6,d7,d8,d9,e10,e4,e5,e6,e7,e8,e9,f10,f4,f5,f6,f7,f8,f9,g10,g4,g5,g6,g7,g8,g9,h10,h4,h5,h6,h7,h8,h9,i10,i4,i5,i6,i7,i8,i9,j10,j4,j5,j6,j7,j8,j9)'),
	(272, 'Setup 3,11'),
	(273, 'KotH(k7,k8)'),
	(274, '=BCFNQRW'),
	(275, 'Setup 36,11'),
	(276, 'Setup 39,11'),
	(277, '=BCFGISY'),
	(278, '5 | 10'),
	(279, 'KotH(c8,e10,e8,e9,f10,f8,f9,g10,g11,g5,g6,g7,g8,g9,h12,h6,h7,h8,h9,i12,i6,i7,i8,j8,k8,l10,l11,l12,l8,l9)'),
	(280, 'KotH(e13,j2,m10)'),
	(281, 'Setup 31,4'),
	(282, '3 | 1D'),
	(283, '=CGNΘ'),
	(284, '4 min'),
	(285, '=AMVΔ'),
	(286, 'KotH(f7,f8,f9,g7,g8,g9,h7,h8,h9)'),
	(287, 'KotH(a10,a11,a4,a5,b10,b11,b4,b5,c10,c11,c4,c5,d1,d10,d11,d12,d13,d14,d2,d3,d4,d5,e1,e10,e11,e12,e13,e14,e2,e3,e4,e5,j1,j10,j11,j12,j13,j14,j2,j3,j4,j5,k1,k10,k11,k12,k13,k14,k2,k3,k4,k5,l10,l11,l4,l5,m10,m11,m4,m5,n10,n11,n4,n5)'),
	(288, 'KotH(g8,h8)'),
	(289, 'KotH(m1,m2,n1,n2)'),
	(290, 'KotH(a7,a8,b7,b8,m7,m8,n7,n8)'),
	(291, '=EM'),
	(292, 'Setup 15,4'),
	(293, 'KotH(f8,f9,g8,g9)'),
	(294, '=GNR'),
	(295, '4 | 5'),
	(296, 'Setup 8'),
	(297, 'KotH(j7,j8,k7,k8)'),
	(298, 'KotH(g4,g5,h4,h5,n4)'),
	(299, '=ADEHMR'),
	(300, 'Setup 40,7'),
	(301, '5 | 7'),
	(302, '=BNRX'),
	(303, 'Setup 5,5'),
	(304, '=BCNR'),
	(305, 'KotH(c6)'),
	(306, '=GMVZ'),
	(307, 'KotH(b7,b8,g13,g2,g7,g8,h13,h2,h7,h8,m7,m8)'),
	(308, '=GJKLNTXY'),
	(309, '4 | 7'),
	(310, '=U'),
	(311, '10 | 10'),
	(312, 'KotH(h11,h4)'),
	(313, '=ABEHMNQR'),
	(314, 'KotH(d7,d8,e7,e8,f7,f8,g7,g8,h7,h8,i7,i8,j7,j8,k7,k8)'),
	(315, '=CD'),
	(316, 'KotH(a7,a8,n7,n8)'),
	(317, '=FKNW'),
	(318, '20 min'),
	(319, 'Setup 120'),
	(320, '=AEHLO'),
	(321, '=CIJLNOSTYZ'),
	(322, 'KotH(a11,n4)'),
	(323, '=HLMQVZ'),
	(324, '=BEHRΔ'),
	(325, '=AEHOUVΔ'),
	(326, 'KotH(j7,j8,k7,k8,l7,l8,m7,m8)'),
	(327, '=BGOR'),
	(328, '7 | 7'),
	(329, '=CLY'),
	(330, '2 | 10'),
	(331, '30 | 15'),
	(332, 'KotH(g7)'),
	(333, 'Setup 55');


--
-- Data for Name: PostDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."PostDetails" ("id", "postId", "notes", "gameClassification", "gameplayClassification") VALUES
	(134, 204, 'See #64960435', 'TACTICAL', 'FIRST_NEGATIVE'),
	(135, 205, NULL, 'TACTICAL', 'SECOND_POSITIVE'),
	(141, 213, 'GS: AD''d due to being too similar to existing accepted and declined variants.', 'STRATEGIC', 'FIRST_NEGATIVE'),
	(144, 216, 'GS: AD, extremely bland to play', 'MATERIALISTIC', 'SECOND_POSITIVE'),
	(136, 206, 'GS: Will decline once a 3rd CGA (other than myself and qilp) can verify that the knight-rider line is drawish/winning for white.', 'MATERIALISTIC', 'FIRST_NEGATIVE'),
	(147, 221, NULL, 'DYNAMIC', 'SECOND_POSITIVE'),
	(137, 208, NULL, 'TACTICAL', 'SECOND_POSITIVE'),
	(142, 214, NULL, NULL, 'SECOND_POSITIVE'),
	(148, 223, NULL, NULL, 'SECOND_POSITIVE'),
	(143, 215, NULL, 'TACTICAL', 'SECOND_POSITIVE'),
	(149, 224, NULL, NULL, 'SECOND_POSITIVE'),
	(138, 209, NULL, NULL, 'SECOND_POSITIVE'),
	(132, 201, 'Forced win for Black', 'DYNAMIC', 'FIRST_NEGATIVE'),
	(145, 218, NULL, NULL, 'SECOND_POSITIVE'),
	(150, 225, NULL, NULL, 'SECOND_POSITIVE'),
	(139, 210, NULL, NULL, 'SECOND_POSITIVE'),
	(140, 212, NULL, 'MATERIALISTIC', 'SECOND_POSITIVE'),
	(133, 203, NULL, 'DYNAMIC', 'FIRST_NEGATIVE'),
	(151, 229, 'GS: AD, troll post', NULL, 'SECOND_NEGATIVE'),
	(146, 220, NULL, NULL, 'SECOND_POSITIVE');


--
-- Data for Name: PostOnUserLikes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."PostOnUserLikes" ("postId", "userId") VALUES
	(206, 329781945),
	(218, 353384769),
	(223, 167239707),
	(209, 329781945),
	(225, 160519263),
	(210, 75596324),
	(209, 352656035),
	(209, 160519263),
	(212, 352656035),
	(208, 352656035),
	(216, 353384769),
	(218, 160519263),
	(220, 353384769),
	(218, 362796631),
	(221, 160519263),
	(216, 258358739),
	(206, 50645954);


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Vote; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: _GameRuleToPost; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."_GameRuleToPost" ("A", "B") VALUES
	(137, 201),
	(312, 201),
	(4, 201),
	(124, 201),
	(115, 203),
	(4, 203),
	(10, 203),
	(6, 203),
	(67, 203),
	(184, 203),
	(260, 204),
	(107, 204),
	(42, 204),
	(31, 204),
	(46, 204),
	(278, 204),
	(4, 205),
	(313, 205),
	(31, 205),
	(27, 205),
	(115, 206),
	(8, 206),
	(314, 206),
	(51, 206),
	(4, 206),
	(124, 206),
	(115, 208),
	(24, 208),
	(35, 208),
	(54, 208),
	(79, 208),
	(22, 208),
	(6, 208),
	(26, 208),
	(124, 208),
	(72, 209),
	(4, 209),
	(315, 209),
	(44, 209),
	(316, 210),
	(63, 210),
	(6, 210),
	(11, 210),
	(33, 212),
	(51, 212),
	(4, 212),
	(317, 212),
	(10, 212),
	(278, 212),
	(4, 213),
	(222, 213),
	(22, 213),
	(318, 213),
	(24, 214),
	(35, 214),
	(4, 214),
	(79, 214),
	(16, 214),
	(46, 214),
	(55, 214),
	(124, 214),
	(115, 215),
	(13, 215),
	(4, 215),
	(313, 215),
	(22, 215),
	(319, 215),
	(6, 215),
	(67, 215),
	(27, 215),
	(88, 216),
	(24, 216),
	(9, 216),
	(54, 216),
	(106, 216),
	(49, 216),
	(6, 216),
	(46, 216),
	(124, 216),
	(20, 218),
	(4, 218),
	(92, 218),
	(84, 218),
	(115, 220),
	(13, 220),
	(4, 220),
	(142, 220),
	(22, 220),
	(319, 220),
	(6, 220),
	(67, 220),
	(27, 220),
	(8, 221),
	(4, 221),
	(21, 221),
	(6, 221),
	(29, 221),
	(33, 223),
	(51, 223),
	(54, 223),
	(320, 223),
	(49, 223),
	(67, 223),
	(27, 223),
	(47, 224),
	(29, 224),
	(13, 225),
	(20, 225),
	(321, 225),
	(31, 225),
	(105, 225),
	(137, 229),
	(20, 229),
	(285, 229),
	(124, 229);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
	('64c14b84-4d48-4c6d-87bb-ee98d3695cf8', '5db13f36eb98a5c60a0f3da0cb3a67d77561bd1025bcecae00ad10284ed3d746', '2023-11-25 07:29:24.767304+00', '20231125072906_initial_migration', NULL, NULL, '2023-11-25 07:29:24.31522+00', 1),
	('5f36cf13-3ea5-4874-8570-c3594e0d5513', '5aa97adf4e678503f2a10ab710d025713694b57dfe02d42ccc9a56621387ae69', '2023-11-28 18:37:34.508898+00', '20231126220121_rename_voice_to_vote', NULL, NULL, '2023-11-28 18:37:34.156484+00', 1);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Comment_id_seq"', 1260, true);


--
-- Name: GameRule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."GameRule_id_seq"', 333, true);


--
-- Name: PostDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."PostDetails_id_seq"', 171, true);


--
-- Name: Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Post_id_seq"', 293, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."User_id_seq"', 66, true);


--
-- Name: Voice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Voice_id_seq"', 670, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
