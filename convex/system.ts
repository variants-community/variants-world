import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getStars = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const system = await ctx.db
      .query("system")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .first();
    return system?.stars ?? 0;
  },
});

export const updateStars = mutation({
  args: { stars: v.number() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const system = await ctx.db
      .query("system")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .first();

    if (system) {
      await ctx.db.patch(system._id, { stars: args.stars });
    } else {
      await ctx.db.insert("system", { key: "main", stars: args.stars });
    }
    return null;
  },
});
