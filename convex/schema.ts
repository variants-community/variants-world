import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Enums as union types
const voteValue = v.union(
  v.literal("POSITIVE"),
  v.literal("NEGATIVE"),
  v.literal("NEUTRAL")
);

const gameplayClassification = v.union(
  v.literal("FIRST_POSITIVE"),
  v.literal("FIRST_NEGATIVE"),
  v.literal("SECOND_POSITIVE"),
  v.literal("SECOND_NEGATIVE")
);

const gameType = v.union(v.literal("NCV"), v.literal("WOF"));

const gameClassification = v.union(
  v.literal("MATERIALISTIC"),
  v.literal("TACTICAL"),
  v.literal("DYNAMIC"),
  v.literal("POSITIONAL"),
  v.literal("STRATEGIC"),
  v.literal("FORTUNE")
);

const gameStatus = v.union(
  v.literal("ACCEPTED"),
  v.literal("DECLINED"),
  v.literal("PENDING_REPLY"),
  v.literal("UNDER_REVIEW")
);

const userRole = v.union(v.literal("TESTER"), v.literal("MEMBER"));

export default defineSchema({
  // Users table
  users: defineTable({
    visibleId: v.number(), // Original auto-increment ID for external references
    uuid: v.string(),
    username: v.string(),
    profileUrl: v.optional(v.string()),
    role: userRole,
    refreshToken: v.optional(v.string()),
    lockedUntil: v.optional(v.number()), // Timestamp
  })
    .index("by_visible_id", ["visibleId"])
    .index("by_uuid", ["uuid"])
    .index("by_username", ["username"]),

  // Sessions table
  sessions: defineTable({
    cookie: v.string(),
    userId: v.id("users"),
    date: v.number(), // Timestamp
    metadata: v.string(),
  }).index("by_cookie", ["cookie"]),

  // Posts table
  posts: defineTable({
    visibleId: v.number(), // Original auto-increment ID
    gameNr: v.number(),
    gameNrs: v.array(v.number()),
    fen: v.string(),
    title: v.string(),
    description: v.string(),
    createdAt: v.number(), // Timestamp
    updatedAt: v.number(), // Timestamp
    type: gameType,
    status: gameStatus,
    verdict: v.optional(v.string()),
    authorId: v.id("users"),
    variantLink: v.string(),
  })
    .index("by_visible_id", ["visibleId"])
    .index("by_game_nr", ["gameNr"])
    .index("by_variant_link", ["variantLink"])
    .index("by_author", ["authorId"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"])
    .searchIndex("search_title", { searchField: "title" })
    .searchIndex("search_description", { searchField: "description" }),

  // Post details table (one-to-one with posts)
  postDetails: defineTable({
    postId: v.id("posts"),
    notes: v.optional(v.string()),
    gameClassification: v.optional(gameClassification),
    gameplayClassification: v.optional(gameplayClassification),
  }).index("by_post", ["postId"]),

  // Comments table
  comments: defineTable({
    content: v.string(),
    createdAt: v.number(), // Timestamp
    postId: v.id("posts"),
    userId: v.id("users"),
    parentId: v.optional(v.id("comments")),
    hidden: v.boolean(),
  })
    .index("by_post", ["postId"])
    .index("by_user", ["userId"])
    .index("by_parent", ["parentId"]),

  // Votes table
  votes: defineTable({
    value: voteValue,
    testerId: v.id("users"),
    postDetailsId: v.id("postDetails"),
  })
    .index("by_tester", ["testerId"])
    .index("by_post_details", ["postDetailsId"])
    .index("by_tester_and_post_details", ["testerId", "postDetailsId"]),

  // Game rules table
  gameRules: defineTable({
    name: v.string(),
  }).index("by_name", ["name"]),

  // Many-to-many: Posts <-> GameRules
  postGameRules: defineTable({
    postId: v.id("posts"),
    gameRuleId: v.id("gameRules"),
  })
    .index("by_post", ["postId"])
    .index("by_game_rule", ["gameRuleId"]),

  // Many-to-many: Posts <-> Users (likes)
  postLikes: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
  })
    .index("by_post", ["postId"])
    .index("by_user", ["userId"])
    .index("by_post_and_user", ["postId", "userId"]),

  // System table
  system: defineTable({
    key: v.string(),
    stars: v.number(),
  }).index("by_key", ["key"]),
});
