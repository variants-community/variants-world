import { DEFAULT_SWR, DEFAULT_TTL } from 'src/config'
import { defineAction } from 'astro:actions'
import { edgeCache } from 'utils/cache'
import { prisma } from 'db/prisma/prisma'
import { z } from 'astro:schema'
import type { GameStatus, PostForCard, Prisma } from 'db/prisma/types'

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
    const cached = edgeCache.get<{ posts: PostForCard[]; page: number; pageEnd?: number }>(cacheKey)
    if (cached) {
      console.error('CACHE HIT')
      return cached
    }
    console.error('CACHE MISS')
    const words = replaceAll(replaceAll(search.toLocaleLowerCase(), ':', ''), '|', '').split(/(\s+)/)

    const statuses: GameStatus[] = []

    for (const st of words) {
      if (st === 'accepted') statuses.push('ACCEPTED')
      else if (st === 'declined') statuses.push('DECLINED')
      else if (st === 'pending') statuses.push('PENDING_REPLY')
      else if (st === 'review') statuses.push('UNDER_REVIEW')
    }

    const searchText = words.filter(e => e.trim().length > 0).join('|')
    // if (!searchText && !status) return []

    const where = {
      AND: [
        searchText
          ? {
              OR: [
                { title: { search: searchText, mode: 'insensitive' } },
                { description: { search: searchText, mode: 'insensitive' } },
                { author: { username: { search: searchText, mode: 'insensitive' } } },
                {
                  gamerules: {
                    some: { name: { search: searchText, mode: 'insensitive' } }
                  }
                },
                {
                  comments: {
                    some: { content: { search: searchText, mode: 'insensitive' } }
                  }
                },
                { verdict: { search: searchText } }
              ]
            }
          : {},
        status ? { status } : {}
      ]
    } satisfies Prisma.PostWhereInput

    let pageEnd: number | undefined = undefined
    if (postId) {
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { createdAt: true }
      })
      if (post) {
        const count = await prisma.post.count({
          where: {
            AND: [...where.AND, { createdAt: { gt: post.createdAt } }]
          }
        })
        page = Math.trunc(count / size) + 1
        if (count % size > size / 2) pageEnd = page + 1
        console.log({ newPage: page })
      }
    }

    const posts = await prisma.post.findMany({
      skip: size * (page - 1),
      take: pageEnd ? size * 2 : size,
      where,
      include: {
        gamerules: true,
        author: {
          select: {
            id: true,
            username: true,
            role: true,
            profileUrl: true
          }
        },
        comments: {
          where: {
            hidden: false
          },
          select: {
            _count: true
          }
        },
        UserLikedPosts: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      cacheStrategy: {
        ttl: DEFAULT_TTL,
        swr: DEFAULT_SWR
      }
    })

    const mapped: PostForCard[] = posts.map(p => ({
      id: p.id,
      type: p.type,
      status: p.status,
      title: p.title,
      variantLink: p.variantLink,
      verdict: p.verdict ?? '',
      gamerules: p.gamerules,
      commentsCount: p.comments.length,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt),
      description: p.description,
      likes: p.UserLikedPosts.map(l => ({ userId: l.userId })),
      author: p.author,
      authorUserId: p.authorUserId,
      fen: p.fen
    }))

    edgeCache.set(cacheKey, { posts: mapped, page }, ['posts'])
    return { posts: mapped, page, pageEnd }
  }
})

// inplace solution for 'searchFor'
const replaceAll = (target: string, toBeReplaced: string, replacement: string, ignore?: boolean) => {
  return target.replace(
    // eslint-disable-next-line no-useless-escape
    new RegExp(toBeReplaced.replace(/([\/\,\!\\\^\$\{\}\[\]\(\).\*\+\?\|\<\>\-\&])/g, '\\$&'), ignore ? 'gi' : 'g'),
    typeof replacement == 'string' ? replacement.replace(/\$/g, '$$$$') : replacement
  )
}
