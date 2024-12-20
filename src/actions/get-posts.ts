import { DEFAULT_SWR, DEFAULT_TTL } from 'src/config'
import { defineAction } from 'astro:actions'
import { prisma } from 'db/prisma/prisma'
import { z } from 'astro:schema'
import type { PostForCard } from 'db/prisma/types'

export const getPosts = defineAction({
  input: z.object({ skip: z.number(), limit: z.number() }),
  handler: async ({ skip, limit }) => {
    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      include: {
        gamerules: true,
        author: true,
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

    return mapped
  }
})
