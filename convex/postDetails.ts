import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const gameClassification = v.union(
  v.literal("MATERIALISTIC"),
  v.literal("TACTICAL"),
  v.literal("DYNAMIC"),
  v.literal("POSITIONAL"),
  v.literal("STRATEGIC"),
  v.literal("FORTUNE")
);

const gameplayClassification = v.union(
  v.literal("FIRST_POSITIVE"),
  v.literal("FIRST_NEGATIVE"),
  v.literal("SECOND_POSITIVE"),
  v.literal("SECOND_NEGATIVE")
);

export const getByPostId = query({
  args: { postId: v.union(v.id("posts"), v.number()) },
  returns: v.union(v.any(), v.null()),
  handler: async (ctx, args) => {
    // Support both Convex ID and visibleId
    let postDocId = args.postId;
    if (typeof args.postId === "number") {
      const post = await ctx.db
        .query("posts")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.postId as number))
        .first();
      if (!post) return null;
      postDocId = post._id;
    }
    const details = await ctx.db
      .query("postDetails")
      .withIndex("by_post", (q) => q.eq("postId", postDocId as any))
      .first();

    if (!details) return null;

    const votes = await ctx.db
      .query("votes")
      .withIndex("by_post_details", (q) => q.eq("postDetailsId", details._id))
      .collect();

    const votesWithTesters = await Promise.all(
      votes.map(async (vote) => {
        const tester = await ctx.db.get(vote.testerId);
        return {
          ...vote,
          tester: tester
            ? {
                id: tester.visibleId,
                _id: tester._id,
                username: tester.username,
                role: tester.role,
                profileUrl: tester.profileUrl,
              }
            : null,
        };
      })
    );

    return {
      ...details,
      votes: votesWithTesters,
    };
  },
});

export const update = mutation({
  args: {
    postId: v.union(v.id("posts"), v.number()),
    notes: v.optional(v.string()),
    gameClassification: v.optional(v.union(gameClassification, v.null())),
    gameplayClassification: v.optional(
      v.union(gameplayClassification, v.null())
    ),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Support both Convex ID and visibleId
    let postDocId = args.postId;
    if (typeof args.postId === "number") {
      const post = await ctx.db
        .query("posts")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.postId as number))
        .first();
      if (!post) return null;
      postDocId = post._id;
    }
    const details = await ctx.db
      .query("postDetails")
      .withIndex("by_post", (q) => q.eq("postId", postDocId as any))
      .first();

    if (!details) return null;

    const updates: Record<string, unknown> = {};
    if (args.notes !== undefined) updates.notes = args.notes;
    if (args.gameClassification !== undefined)
      updates.gameClassification = args.gameClassification ?? undefined;
    if (args.gameplayClassification !== undefined)
      updates.gameplayClassification = args.gameplayClassification ?? undefined;

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(details._id, updates);
    }

    return null;
  },
});
