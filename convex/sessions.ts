import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByCookie = query({
  args: { cookie: v.string() },
  returns: v.union(
    v.object({
      _id: v.id("sessions"),
      _creationTime: v.number(),
      cookie: v.string(),
      userId: v.id("users"),
      date: v.number(),
      metadata: v.string(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_cookie", (q) => q.eq("cookie", args.cookie))
      .first();
  },
});

export const create = mutation({
  args: {
    cookie: v.string(),
    userId: v.id("users"),
    metadata: v.string(),
  },
  returns: v.id("sessions"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("sessions", {
      cookie: args.cookie,
      userId: args.userId,
      date: Date.now(),
      metadata: args.metadata,
    });
  },
});

export const deleteByCookie = mutation({
  args: { cookie: v.string() },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_cookie", (q) => q.eq("cookie", args.cookie))
      .first();

    if (!session) return false;

    await ctx.db.delete(session._id);
    return true;
  },
});

export const deleteByUserId = mutation({
  args: { userId: v.id("users") },
  returns: v.number(),
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    for (const session of sessions) {
      await ctx.db.delete(session._id);
    }

    return sessions.length;
  },
});
