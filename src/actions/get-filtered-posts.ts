import { defineAction, z } from 'astro:actions'
import { prisma } from 'db/prisma/prisma'
import type { GameStatus, PostForCard } from 'db/prisma/types'

export const getFilteredPosts = defineAction({
  input: z.object({ query: z.string() }),
  handler: async ({ query }) => {
    const words = replaceAll(replaceAll(query.toLocaleLowerCase(), ':', ''), '|', '').split(/(\s+)/)

    const statuses: GameStatus[] = []

    for (const st of words) {
      if (st === 'accepted') statuses.push('ACCEPTED')
      else if (st === 'declined') statuses.push('DECLINED')
      else if (st === 'pending') statuses.push('PENDING_REPLY')
      else if (st === 'review') statuses.push('UNDER_REVIEW')
    }

    const searchText = words.filter(e => e.trim().length > 0).join('|')
    if (!searchText) return []

    const posts = await prisma.post.findMany({
      where: {
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
          { verdict: { search: searchText } },
          { status: { in: statuses } }
        ]
      },
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
        createdAt: 'asc'
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

// inplace solution for 'searchFor'
const replaceAll = (target: string, toBeReplaced: string, replacement: string, ignore?: boolean) => {
  return target.replace(
    // eslint-disable-next-line no-useless-escape
    new RegExp(toBeReplaced.replace(/([\/\,\!\\\^\$\{\}\[\]\(\).\*\+\?\|\<\>\-\&])/g, '\\$&'), ignore ? 'gi' : 'g'),
    typeof replacement == 'string' ? replacement.replace(/\$/g, '$$$$') : replacement
  )
}
