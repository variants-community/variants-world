import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const isLikedByUser = query({
  args: {
    postId: v.union(v.id("posts"), v.number()),
    userId: v.union(v.id("users"), v.number()),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    // Support both Convex ID and visibleId for postId
    let postDocId = args.postId;
    if (typeof args.postId === "number") {
      const post = await ctx.db
        .query("posts")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.postId as number))
        .first();
      if (!post) return false;
      postDocId = post._id;
    }
    // Support both Convex ID and visibleId for userId
    let userDocId = args.userId;
    if (typeof args.userId === "number") {
      const user = await ctx.db
        .query("users")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.userId as number))
        .first();
      if (!user) return false;
      userDocId = user._id;
    }
    const like = await ctx.db
      .query("postLikes")
      .withIndex("by_post_and_user", (q) =>
        q.eq("postId", postDocId as any).eq("userId", userDocId as any)
      )
      .first();
    return like !== null;
  },
});

export const getCount = query({
  args: { postId: v.union(v.id("posts"), v.number()) },
  returns: v.number(),
  handler: async (ctx, args) => {
    // Support both Convex ID and visibleId
    let postDocId = args.postId;
    if (typeof args.postId === "number") {
      const post = await ctx.db
        .query("posts")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.postId as number))
        .first();
      if (!post) return 0;
      postDocId = post._id;
    }
    const likes = await ctx.db
      .query("postLikes")
      .withIndex("by_post", (q) => q.eq("postId", postDocId as any))
      .collect();
    return likes.length;
  },
});

export const getByPost = query({
  args: { postId: v.union(v.id("posts"), v.number()) },
  returns: v.array(
    v.object({
      _id: v.id("postLikes"),
      postId: v.id("posts"),
      userId: v.id("users"),
      visibleUserId: v.optional(v.number()),
    })
  ),
  handler: async (ctx, args) => {
    // Support both Convex ID and visibleId
    let postDocId = args.postId;
    if (typeof args.postId === "number") {
      const post = await ctx.db
        .query("posts")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.postId as number))
        .first();
      if (!post) return [];
      postDocId = post._id;
    }
    const likes = await ctx.db
      .query("postLikes")
      .withIndex("by_post", (q) => q.eq("postId", postDocId as any))
      .collect();
    // Add visibleUserId for each like
    return await Promise.all(
      likes.map(async (like) => {
        const user = await ctx.db.get(like.userId);
        return {
          ...like,
          visibleUserId: user?.visibleId,
        };
      })
    );
  },
});

export const add = mutation({
  args: {
    postId: v.union(v.id("posts"), v.number()),
    userId: v.union(v.id("users"), v.number()),
  },
  returns: v.union(v.id("postLikes"), v.null()),
  handler: async (ctx, args) => {
    // Support both Convex ID and visibleId for postId
    let postDocId = args.postId;
    if (typeof args.postId === "number") {
      const post = await ctx.db
        .query("posts")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.postId as number))
        .first();
      if (!post) return null;
      postDocId = post._id;
    }
    // Support both Convex ID and visibleId for userId
    let userDocId = args.userId;
    if (typeof args.userId === "number") {
      const user = await ctx.db
        .query("users")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.userId as number))
        .first();
      if (!user) return null;
      userDocId = user._id;
    }
    // Check if already liked
    const existing = await ctx.db
      .query("postLikes")
      .withIndex("by_post_and_user", (q) =>
        q.eq("postId", postDocId as any).eq("userId", userDocId as any)
      )
      .first();

    if (existing) return null;

    return await ctx.db.insert("postLikes", {
      postId: postDocId as any,
      userId: userDocId as any,
    });
  },
});

export const remove = mutation({
  args: {
    postId: v.union(v.id("posts"), v.number()),
    userId: v.union(v.id("users"), v.number()),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    // Support both Convex ID and visibleId for postId
    let postDocId = args.postId;
    if (typeof args.postId === "number") {
      const post = await ctx.db
        .query("posts")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.postId as number))
        .first();
      if (!post) return false;
      postDocId = post._id;
    }
    // Support both Convex ID and visibleId for userId
    let userDocId = args.userId;
    if (typeof args.userId === "number") {
      const user = await ctx.db
        .query("users")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.userId as number))
        .first();
      if (!user) return false;
      userDocId = user._id;
    }
    const like = await ctx.db
      .query("postLikes")
      .withIndex("by_post_and_user", (q) =>
        q.eq("postId", postDocId as any).eq("userId", userDocId as any)
      )
      .first();

    if (!like) return false;

    await ctx.db.delete(like._id);
    return true;
  },
});
