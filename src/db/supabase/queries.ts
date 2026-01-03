// Re-export from Convex for backwards compatibility
// These functions now use Convex instead of Supabase

import { ConvexHttpClient } from 'convex/browser'

const convexUrl = import.meta.env.PUBLIC_CONVEX_URL

const getConvexClient = () => {
  if (!convexUrl) throw new Error('PUBLIC_CONVEX_URL not set')
  return new ConvexHttpClient(convexUrl)
}

// Note: These functions now require Convex IDs (strings) instead of numeric IDs
// The calling code needs to be updated to pass the correct ID types

export const isPostLikedByUserQuery = async (
  postId: string,
  userId: string
): Promise<boolean> => {
  const convex = getConvexClient()
  const { api } = await import('../../../convex/_generated/api')
  return await convex.query(api.likes.isLikedByUser, { 
    postId: postId as any, 
    userId: userId as any 
  })
}

export const removeLikeQuery = async (postId: string, userId: string): Promise<boolean> => {
  const convex = getConvexClient()
  const { api } = await import('../../../convex/_generated/api')
  return await convex.mutation(api.likes.remove, { 
    postId: postId as any, 
    userId: userId as any 
  })
}

export const putLikeQuery = async (postId: string, userId: string): Promise<boolean> => {
  const convex = getConvexClient()
  const { api } = await import('../../../convex/_generated/api')
  const result = await convex.mutation(api.likes.add, { 
    postId: postId as any, 
    userId: userId as any 
  })
  return result !== null
}

export const getLikesCountQuery = async (postId: string): Promise<number> => {
  const convex = getConvexClient()
  const { api } = await import('../../../convex/_generated/api')
  return await convex.query(api.likes.getCount, { postId: postId as any })
}

export const addCommentQuery = async (
  content: string,
  postId: string,
  userId: string,
  replyToCommentId?: string
): Promise<boolean> => {
  const convex = getConvexClient()
  const { api } = await import('../../../convex/_generated/api')
  try {
    await convex.mutation(api.comments.add, {
      content,
      postId: postId as any,
      userId: userId as any,
      parentId: replyToCommentId as any
    })
    return true
  } catch {
    return false
  }
}

export const getTotalPostsCount = async (): Promise<number> => {
  const convex = getConvexClient()
  const { api } = await import('../../../convex/_generated/api')
  return await convex.query(api.posts.getTotalCount, {})
}

export const getGameRuleId = async (ruleName: string): Promise<string | undefined> => {
  const convex = getConvexClient()
  const { api } = await import('../../../convex/_generated/api')
  const rule = await convex.query(api.gameRules.getByName, { name: ruleName })
  return rule?._id
}

export const addGameRuleAndGetId = async (ruleName: string): Promise<string | undefined> => {
  const convex = getConvexClient()
  const { api } = await import('../../../convex/_generated/api')
  return await convex.mutation(api.gameRules.getOrCreate, { name: ruleName })
}

export const addGameRuleToPost = async (ruleId: string, postId: string): Promise<boolean> => {
  const convex = getConvexClient()
  const { api } = await import('../../../convex/_generated/api')
  try {
    await convex.mutation(api.gameRules.addToPost, { 
      gameRuleId: ruleId as any, 
      postId: postId as any 
    })
    return true
  } catch {
    return false
  }
}

export const removeGameRuleFromPost = async (ruleId: string, postId: string): Promise<boolean> => {
  const convex = getConvexClient()
  const { api } = await import('../../../convex/_generated/api')
  return await convex.mutation(api.gameRules.removeFromPost, { 
    gameRuleId: ruleId as any, 
    postId: postId as any 
  })
}

export const updatePostGameRule = async (
  newRuleId: string,
  oldRuleId: string,
  postId: string
): Promise<boolean> => {
  const convex = getConvexClient()
  const { api } = await import('../../../convex/_generated/api')
  return await convex.mutation(api.gameRules.updatePostRule, { 
    newRuleId: newRuleId as any, 
    oldRuleId: oldRuleId as any, 
    postId: postId as any 
  })
}
