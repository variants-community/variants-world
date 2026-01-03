import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const voteValue = v.union(
  v.literal("POSITIVE"),
  v.literal("NEGATIVE"),
  v.literal("NEUTRAL")
);

export const getByPostDetails = query({
  args: { postDetailsId: v.id("postDetails") },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const votes = await ctx.db
      .query("votes")
      .withIndex("by_post_details", (q) =>
        q.eq("postDetailsId", args.postDetailsId)
      )
      .collect();

    return await Promise.all(
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
  },
});

export const upsert = mutation({
  args: {
    value: voteValue,
    testerId: v.id("users"),
    postDetailsId: v.id("postDetails"),
  },
  returns: v.id("votes"),
  handler: async (ctx, args) => {
    // Check if vote exists
    const existing = await ctx.db
      .query("votes")
      .withIndex("by_tester_and_post_details", (q) =>
        q.eq("testerId", args.testerId).eq("postDetailsId", args.postDetailsId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value });
      return existing._id;
    }

    return await ctx.db.insert("votes", {
      value: args.value,
      testerId: args.testerId,
      postDetailsId: args.postDetailsId,
    });
  },
});

export const remove = mutation({
  args: {
    testerId: v.id("users"),
    postDetailsId: v.id("postDetails"),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const vote = await ctx.db
      .query("votes")
      .withIndex("by_tester_and_post_details", (q) =>
        q.eq("testerId", args.testerId).eq("postDetailsId", args.postDetailsId)
      )
      .first();

    if (!vote) return false;

    await ctx.db.delete(vote._id);
    return true;
  },
});
