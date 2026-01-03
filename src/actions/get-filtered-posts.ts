import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { edgeCache } from 'utils/cache'
import { ConvexHttpClient } from 'convex/browser'

const convexUrl = import.meta.env.PUBLIC_CONVEX_URL

const getConvexClient = () => {
  if (!convexUrl) throw new Error('PUBLIC_CONVEX_URL not set')
  return new ConvexHttpClient(convexUrl)
}

export const getFilteredPosts = defineAction({
  input: z.object({
    page: z.number(),
    size: z.number(),
    search: z.string(),
    status: z.enum(['UNDER_REVIEW', 'ACCEPTED', 'DECLINED', 'PENDING_REPLY']).optional(),
    postId: z.number().optional()
  }),
  handler: async ({ page, size, search, status, postId }) => {
    const cacheKey = `${page}-${size}-${search}-${status}-${postId}`
    const cached = edgeCache.get<{ posts: unknown[]; page: number; pageEnd?: number }>(cacheKey)
    if (cached) {
      console.error('HIT')
      return cached
    }
    console.error('CACHE MISS')

    const convex = getConvexClient()
    const { api } = await import('../../convex/_generated/api')

    const result = await convex.query(api.posts.getFiltered, {
      page,
      size,
      search,
      status,
      postVisibleId: postId
    })

    console.error('Convex result:', JSON.stringify({ postsCount: result.posts.length, page: result.page, pageEnd: result.pageEnd }))

    edgeCache.set(cacheKey, result, ['posts'])
    return result
  }
})
