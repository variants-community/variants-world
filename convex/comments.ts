import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByPost = query({
  args: { postId: v.union(v.id("posts"), v.number()) },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    console.log("getByPost called with:", args.postId, typeof args.postId);
    // Support both Convex ID and visibleId
    let postDocId = args.postId;
    if (typeof args.postId === "number") {
      const post = await ctx.db
        .query("posts")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.postId as number))
        .first();
      console.log("Found post by visibleId:", post?._id, post?.title);
      if (!post) return [];
      postDocId = post._id;
    }
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", postDocId as any))
      .filter((q) => q.eq(q.field("hidden"), false))
      .collect();
    console.log("Found comments:", comments.length);

    return await Promise.all(
      comments.map(async (comment) => {
        const user = await ctx.db.get(comment.userId);
        let parent = null;
        if (comment.parentId) {
          const parentComment = await ctx.db.get(comment.parentId);
          if (parentComment) {
            const parentUser = await ctx.db.get(parentComment.userId);
            parent = {
              ...parentComment,
              User: parentUser
                ? {
                    id: parentUser.visibleId,
                    _id: parentUser._id,
                    username: parentUser.username,
                    role: parentUser.role,
                    profileUrl: parentUser.profileUrl,
                    lockedUntil: parentUser.lockedUntil,
                  }
                : null,
            };
          }
        }
        return {
          ...comment,
          User: user
            ? {
                id: user.visibleId,
                _id: user._id,
                username: user.username,
                role: user.role,
                profileUrl: user.profileUrl,
                lockedUntil: user.lockedUntil,
              }
            : null,
          parent,
        };
      })
    );
  },
});

export const add = mutation({
  args: {
    content: v.string(),
    postId: v.union(v.id("posts"), v.number()),
    userId: v.union(v.id("users"), v.number()),
    parentId: v.optional(v.id("comments")),
  },
  returns: v.id("comments"),
  handler: async (ctx, args) => {
    // Support both Convex ID and visibleId for postId
    let postDocId = args.postId;
    if (typeof args.postId === "number") {
      const post = await ctx.db
        .query("posts")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.postId as number))
        .first();
      if (!post) throw new Error("Post not found");
      postDocId = post._id;
    }
    // Support both Convex ID and visibleId for userId
    let userDocId = args.userId;
    if (typeof args.userId === "number") {
      const user = await ctx.db
        .query("users")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.userId as number))
        .first();
      if (!user) throw new Error("User not found");
      userDocId = user._id;
    }
    return await ctx.db.insert("comments", {
      content: args.content,
      createdAt: Date.now(),
      postId: postDocId as any,
      userId: userDocId as any,
      parentId: args.parentId,
      hidden: false,
    });
  },
});

export const hide = mutation({
  args: { id: v.id("comments") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { hidden: true });
    return null;
  },
});

export const unhide = mutation({
  args: { id: v.id("comments") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { hidden: false });
    return null;
  },
});
