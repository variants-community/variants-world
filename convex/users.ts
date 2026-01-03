import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByVisibleId = query({
  args: { visibleId: v.number() },
  returns: v.union(
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      visibleId: v.number(),
      uuid: v.string(),
      username: v.string(),
      profileUrl: v.optional(v.string()),
      role: v.union(v.literal("TESTER"), v.literal("MEMBER")),
      refreshToken: v.optional(v.string()),
      lockedUntil: v.optional(v.number()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_visible_id", (q) => q.eq("visibleId", args.visibleId))
      .first();
  },
});

export const getByUuid = query({
  args: { uuid: v.string() },
  returns: v.union(
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      visibleId: v.number(),
      uuid: v.string(),
      username: v.string(),
      profileUrl: v.optional(v.string()),
      role: v.union(v.literal("TESTER"), v.literal("MEMBER")),
      refreshToken: v.optional(v.string()),
      lockedUntil: v.optional(v.number()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_uuid", (q) => q.eq("uuid", args.uuid))
      .first();
  },
});

export const getById = query({
  args: { id: v.id("users") },
  returns: v.union(
    v.object({
      _id: v.id("users"),
      _creationTime: v.number(),
      visibleId: v.number(),
      uuid: v.string(),
      username: v.string(),
      profileUrl: v.optional(v.string()),
      role: v.union(v.literal("TESTER"), v.literal("MEMBER")),
      refreshToken: v.optional(v.string()),
      lockedUntil: v.optional(v.number()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getLockedUsers = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("users"),
      visibleId: v.number(),
      lockedUntil: v.number(),
    })
  ),
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users
      .filter((u) => u.lockedUntil !== undefined)
      .map((u) => ({
        _id: u._id,
        visibleId: u.visibleId,
        lockedUntil: u.lockedUntil!,
      }));
  },
});

export const create = mutation({
  args: {
    visibleId: v.number(),
    uuid: v.string(),
    username: v.string(),
    profileUrl: v.optional(v.string()),
    role: v.optional(v.union(v.literal("TESTER"), v.literal("MEMBER"))),
    refreshToken: v.optional(v.string()),
  },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      visibleId: args.visibleId,
      uuid: args.uuid,
      username: args.username,
      profileUrl: args.profileUrl,
      role: args.role ?? "MEMBER",
      refreshToken: args.refreshToken,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    username: v.optional(v.string()),
    profileUrl: v.optional(v.string()),
    role: v.optional(v.union(v.literal("TESTER"), v.literal("MEMBER"))),
    refreshToken: v.optional(v.string()),
    lockedUntil: v.optional(v.number()),
    uuid: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    if (Object.keys(filteredUpdates).length > 0) {
      await ctx.db.patch(id, filteredUpdates);
    }
    return null;
  },
});

export const countByVisibleId = query({
  args: { visibleId: v.number() },
  returns: v.number(),
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .withIndex("by_visible_id", (q) => q.eq("visibleId", args.visibleId))
      .collect();
    return users.length;
  },
});

export const getNextVisibleId = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    if (users.length === 0) return 1;
    const maxId = Math.max(...users.map((u) => u.visibleId));
    return maxId + 1;
  },
});
