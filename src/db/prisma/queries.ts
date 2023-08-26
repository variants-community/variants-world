import { GameStatus, GameType, UserRole } from '@prisma/client'
import prisma from 'db/prisma/prisma'

export const getPostById = async (postId: number) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId
    },
    include: {
      author: true,
      comments: {
        include: {
          parent: {
            include: {
              User: true
            }
          },
          User: true
        }
      },
      gamerules: true,
      UserLikedPosts: true
    }
  })

  return post
}

export const getPostDetailsById = async (postId: number) => {
  const details = await prisma.postDetails.findFirst({
    where: {
      postId
    },
    include: {
      voices: {
        include: {
          tester: true
        }
      }
    }
  })

  return details
}

export const searchFor = async (query: string) => {
  const words = query.toLocaleLowerCase().split(/(\s+)/)

  const statuses: GameStatus[] = []

  for (const st of words) {
    if (st === 'accepted') statuses.push(GameStatus.ACCEPTED)
    else if (st === 'declined') statuses.push(GameStatus.DECLINED)
    else if (st === 'pending') statuses.push(GameStatus.PENDING_REPLY)
    else if (st === 'review') statuses.push(GameStatus.UNDER_REVIEW)
  }

  const searchText = words.filter(e => e.trim().length > 0).reduce((prev, curr) => `${prev} | ${curr}`)

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { search: searchText, mode: 'insensitive' } },
        { description: { search: searchText, mode: 'insensitive' } },
        { author: { name: { search: searchText, mode: 'insensitive' } } },
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
      author: true,
      comments: {
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
    authorUserId: p.authorUserId
  }))

  return mapped
}

export const getPosts = async (skip: number, take = 5) => {
  const posts = await prisma.post.findMany({
    skip,
    take,
    include: {
      gamerules: true,
      author: true,
      comments: {
        select: {
          _count: true
        }
      },
      UserLikedPosts: true
    },
    orderBy: {
      createdAt: 'desc'
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
    authorUserId: p.authorUserId
  }))

  return mapped
}

export interface PostForCard {
  id: number
  status: GameStatus
  type: GameType
  variantLink: string
  verdict: string
  likes: { userId: number }[]
  title: string
  authorUserId: number
  gamerules: { id: number; name: string }[]
  author: {
    id: number
    name: string
    email: string | null
    role: UserRole
  }
  commentsCount: number
  createdAt: Date
  updatedAt: Date
  description: string
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type PostWithDetailsForCard = ThenArg<ReturnType<typeof getPosts>>[number]

export type PostDetails = NonNullable<ThenArg<ReturnType<typeof getPostDetailsById>>>
