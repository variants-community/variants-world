import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

const gameStatus = v.union(
  v.literal("ACCEPTED"),
  v.literal("DECLINED"),
  v.literal("PENDING_REPLY"),
  v.literal("UNDER_REVIEW")
);

const gameType = v.union(v.literal("NCV"), v.literal("WOF"));

export const getByVisibleId = query({
  args: { visibleId: v.number() },
  returns: v.union(v.any(), v.null()),
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_visible_id", (q) => q.eq("visibleId", args.visibleId))
      .first();

    if (!post) return null;

    const author = await ctx.db.get(post.authorId);
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", post._id))
      .filter((q) => q.eq(q.field("hidden"), false))
      .collect();

    const postDetails = await ctx.db
      .query("postDetails")
      .withIndex("by_post", (q) => q.eq("postId", post._id))
      .first();

    const gameRuleLinks = await ctx.db
      .query("postGameRules")
      .withIndex("by_post", (q) => q.eq("postId", post._id))
      .collect();

    const gameRules = await Promise.all(
      gameRuleLinks.map((link) => ctx.db.get(link.gameRuleId))
    );

    const rawLikes = await ctx.db
      .query("postLikes")
      .withIndex("by_post", (q) => q.eq("postId", post._id))
      .collect();
    
    // Enrich likes with user visibleId for frontend compatibility
    const likes = await Promise.all(
      rawLikes.map(async (like) => {
        const user = await ctx.db.get(like.userId);
        return {
          ...like,
          userId: user?.visibleId ?? 0, // Frontend expects userId as visibleId number
        };
      })
    );

    // Get votes if postDetails exists
    let votes: Array<{
      _id: Id<"votes">;
      value: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
      testerId: Id<"users">;
      postDetailsId: Id<"postDetails">;
      tester: {
        _id: Id<"users">;
        visibleId: number;
        username: string;
        role: "TESTER" | "MEMBER";
        profileUrl?: string;
      } | null;
    }> = [];
    if (postDetails) {
      const rawVotes = await ctx.db
        .query("votes")
        .withIndex("by_post_details", (q) =>
          q.eq("postDetailsId", postDetails._id)
        )
        .collect();
      votes = await Promise.all(
        rawVotes.map(async (vote) => {
          const tester = await ctx.db.get(vote.testerId);
          return {
            ...vote,
            tester: tester
              ? {
                  _id: tester._id,
                  visibleId: tester.visibleId,
                  username: tester.username,
                  role: tester.role,
                  profileUrl: tester.profileUrl,
                }
              : null,
          };
        })
      );
    }

    // Get comment users
    const commentsWithUsers = await Promise.all(
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
                    _id: parentUser._id,
                    visibleId: parentUser.visibleId,
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
          id: comment._id, // For backwards compatibility with frontend expecting id
          User: user
            ? {
                _id: user._id,
                id: user.visibleId, // For backwards compatibility
                visibleId: user.visibleId,
                username: user.username,
                role: user.role,
                profileUrl: user.profileUrl,
                lockedUntil: user.lockedUntil,
              }
            : null,
          parent: parent ? { ...parent, id: parent._id } : null,
        };
      })
    );

    return {
      ...post,
      id: post.visibleId, // For backwards compatibility with frontend expecting numeric id
      author: author
        ? {
            _id: author._id,
            id: author.visibleId, // For backwards compatibility
            visibleId: author.visibleId,
            username: author.username,
            role: author.role,
            profileUrl: author.profileUrl,
            lockedUntil: author.lockedUntil,
          }
        : null,
      comments: commentsWithUsers,
      PostDetails: postDetails
        ? {
            ...postDetails,
            votes,
          }
        : null,
      gamerules: gameRules.filter(Boolean),
      UserLikedPosts: likes,
    };
  },
});

export const getById = query({
  args: { id: v.union(v.id("posts"), v.number()) },
  returns: v.union(v.any(), v.null()),
  handler: async (ctx, args) => {
    // Support both Convex ID and visibleId
    if (typeof args.id === "number") {
      const post = await ctx.db
        .query("posts")
        .withIndex("by_visible_id", (q) => q.eq("visibleId", args.id as number))
        .first();
      return post;
    }
    return await ctx.db.get(args.id);
  },
});

export const getFiltered = query({
  args: {
    page: v.number(),
    size: v.number(),
    search: v.string(),
    status: v.optional(gameStatus),
    postVisibleId: v.optional(v.number()),
  },
  returns: v.object({
    posts: v.array(v.any()),
    page: v.number(),
    pageEnd: v.optional(v.number()),
  }),
  handler: async (ctx, args) => {
    let { page } = args;
    const { size, search, status, postVisibleId } = args;

    console.log("getFiltered args:", { page, size, search, status, postVisibleId });

    let allPosts = await ctx.db
      .query("posts")
      .withIndex("by_created_at")
      .order("desc")
      .collect();

    console.log("Total posts in DB:", allPosts.length);

    // Filter by status if provided
    if (status) {
      allPosts = allPosts.filter((p) => p.status === status);
    }

    // Filter by search text
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      const searchTerms = searchLower.split(/\s+/).filter((t) => t.length > 0);

      allPosts = allPosts.filter((post) => {
        const titleMatch = searchTerms.some((term) =>
          post.title.toLowerCase().includes(term)
        );
        const descMatch = searchTerms.some((term) =>
          post.description.toLowerCase().includes(term)
        );
        const verdictMatch =
          post.verdict &&
          searchTerms.some((term) => post.verdict!.toLowerCase().includes(term));
        return titleMatch || descMatch || verdictMatch;
      });
    }

    // Handle postVisibleId for pagination
    let pageEnd: number | undefined = undefined;
    if (postVisibleId) {
      const targetPost = allPosts.find((p) => p.visibleId === postVisibleId);
      if (targetPost) {
        const index = allPosts.indexOf(targetPost);
        page = Math.floor(index / size) + 1;
        if (index % size > size / 2) pageEnd = page + 1;
      }
    }

    // Paginate
    const skip = size * (page - 1);
    const take = pageEnd ? size * 2 : size;
    const paginatedPosts = allPosts.slice(skip, skip + take);

    console.log("Pagination:", { skip, take, paginatedPostsCount: paginatedPosts.length, allPostsAfterFilter: allPosts.length });

    // Enrich with related data
    const enrichedPosts = await Promise.all(
      paginatedPosts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        const comments = await ctx.db
          .query("comments")
          .withIndex("by_post", (q) => q.eq("postId", post._id))
          .filter((q) => q.eq(q.field("hidden"), false))
          .collect();

        const gameRuleLinks = await ctx.db
          .query("postGameRules")
          .withIndex("by_post", (q) => q.eq("postId", post._id))
          .collect();

        const gameRules = await Promise.all(
          gameRuleLinks.map((link) => ctx.db.get(link.gameRuleId))
        );

        const likes = await ctx.db
          .query("postLikes")
          .withIndex("by_post", (q) => q.eq("postId", post._id))
          .collect();

        return {
          id: post.visibleId,
          visibleId: post.visibleId,
          _id: post._id,
          type: post.type,
          status: post.status,
          title: post.title,
          variantLink: post.variantLink,
          verdict: post.verdict ?? "",
          gamerules: gameRules.filter(Boolean),
          commentsCount: comments.length,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          description: post.description,
          likes: likes.map((l) => ({ userId: l.userId })),
          author: author
            ? {
                id: author.visibleId,
                _id: author._id,
                username: author.username,
                role: author.role,
                profileUrl: author.profileUrl,
                lockedUntil: author.lockedUntil,
              }
            : null,
          authorUserId: post.authorId,
          fen: post.fen,
        };
      })
    );

    return { posts: enrichedPosts, page, pageEnd };
  },
});

export const create = mutation({
  args: {
    visibleId: v.number(),
    gameNr: v.number(),
    gameNrs: v.array(v.number()),
    fen: v.string(),
    title: v.string(),
    description: v.string(),
    type: gameType,
    status: gameStatus,
    authorId: v.id("users"),
    variantLink: v.string(),
    verdict: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  },
  returns: v.id("posts"),
  handler: async (ctx, args) => {
    const now = Date.now();
    const postId = await ctx.db.insert("posts", {
      visibleId: args.visibleId,
      gameNr: args.gameNr,
      gameNrs: args.gameNrs,
      fen: args.fen,
      title: args.title,
      description: args.description,
      createdAt: args.createdAt ?? now,
      updatedAt: args.updatedAt ?? now,
      type: args.type,
      status: args.status,
      authorId: args.authorId,
      variantLink: args.variantLink,
      verdict: args.verdict,
    });

    // Create post details
    await ctx.db.insert("postDetails", {
      postId,
    });

    return postId;
  },
});

export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    type: v.optional(gameType),
    status: v.optional(gameStatus),
    verdict: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { id, createdAt, updatedAt, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    const patchData: Record<string, unknown> = { ...filteredUpdates };
    if (createdAt !== undefined) patchData.createdAt = createdAt;
    if (updatedAt !== undefined) patchData.updatedAt = updatedAt;
    else if (Object.keys(filteredUpdates).length > 0) patchData.updatedAt = Date.now();
    
    if (Object.keys(patchData).length > 0) {
      await ctx.db.patch(id, patchData);
    }
    return null;
  },
});

export const countByTitle = query({
  args: { title: v.string() },
  returns: v.number(),
  handler: async (ctx, args) => {
    const posts = await ctx.db.query("posts").collect();
    return posts.filter((p) => p.title === args.title).length;
  },
});

export const countByGameNr = query({
  args: { gameNr: v.number() },
  returns: v.number(),
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_game_nr", (q) => q.eq("gameNr", args.gameNr))
      .collect();
    return posts.length;
  },
});

export const getNextVisibleId = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    if (posts.length === 0) return 1;
    const maxId = Math.max(...posts.map((p) => p.visibleId));
    return maxId + 1;
  },
});

export const getTotalCount = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    return posts.length;
  },
});
