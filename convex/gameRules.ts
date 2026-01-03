import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByName = query({
  args: { name: v.string() },
  returns: v.union(
    v.object({
      _id: v.id("gameRules"),
      _creationTime: v.number(),
      name: v.string(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("gameRules")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();
  },
});

export const getOrCreate = mutation({
  args: { name: v.string() },
  returns: v.id("gameRules"),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("gameRules")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();

    if (existing) return existing._id;

    return await ctx.db.insert("gameRules", { name: args.name });
  },
});

export const addToPost = mutation({
  args: {
    gameRuleId: v.id("gameRules"),
    postId: v.id("posts"),
  },
  returns: v.id("postGameRules"),
  handler: async (ctx, args) => {
    // Check if already exists
    const existing = await ctx.db
      .query("postGameRules")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .filter((q) => q.eq(q.field("gameRuleId"), args.gameRuleId))
      .first();

    if (existing) return existing._id;

    return await ctx.db.insert("postGameRules", {
      postId: args.postId,
      gameRuleId: args.gameRuleId,
    });
  },
});

export const removeFromPost = mutation({
  args: {
    gameRuleId: v.id("gameRules"),
    postId: v.id("posts"),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const link = await ctx.db
      .query("postGameRules")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .filter((q) => q.eq(q.field("gameRuleId"), args.gameRuleId))
      .first();

    if (!link) return false;

    await ctx.db.delete(link._id);
    return true;
  },
});

export const updatePostRule = mutation({
  args: {
    postId: v.id("posts"),
    oldRuleId: v.id("gameRules"),
    newRuleId: v.id("gameRules"),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const link = await ctx.db
      .query("postGameRules")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .filter((q) => q.eq(q.field("gameRuleId"), args.oldRuleId))
      .first();

    if (!link) return false;

    await ctx.db.patch(link._id, { gameRuleId: args.newRuleId });
    return true;
  },
});

export const getByPost = query({
  args: { postId: v.id("posts") },
  returns: v.array(
    v.object({
      _id: v.id("gameRules"),
      name: v.string(),
    })
  ),
  handler: async (ctx, args) => {
    const links = await ctx.db
      .query("postGameRules")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();

    const rules = await Promise.all(
      links.map((link) => ctx.db.get(link.gameRuleId))
    );

    return rules
      .filter((r): r is NonNullable<typeof r> => r !== null)
      .map((r) => ({ _id: r._id, name: r.name }));
  },
});
