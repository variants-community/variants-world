import type { GameStatus, GameType, UserRole } from '@prisma/client'
import prisma from './prisma'

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
      postId: postId
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
  const words = query.split(/(\s+)/).filter( e => e.trim().length > 0).reduce((prev, curr) => `${prev} | ${curr}`)
  console.log('words: ', words)
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { search: words, mode: 'insensitive'} },
        { description: { search: words, mode: 'insensitive' } },
        { author: { name: { search: words, mode: 'insensitive' } } },
        { gamerules: { some: { name: { search: words, mode: 'insensitive' } } } }
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

  const mapped: PostForCard[] = posts.map((p) => ({
    id: p.id,
    type: p.type,
    status: p.status,
    title: p.title,
    variantLink: p.variantLink,
    verdict: p.verdict ?? '',
    gamerules: p.gamerules,
    commentsCount: p.comments.length,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    description: p.description,
    likes: p.UserLikedPosts.map((l) => ({ userId: l.userId })),
    author: p.author,
    authorUserId: p.authorUserId
  }))

  return mapped
}

export const getPosts = async (skip: number, take: number = 5) => {
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

  const mapped: PostForCard[] = posts.map((p) => ({
    id: p.id,
    type: p.type,
    status: p.status,
    title: p.title,
    variantLink: p.variantLink,
    verdict: p.verdict ?? '',
    gamerules: p.gamerules,
    commentsCount: p.comments.length,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    description: p.description,
    likes: p.UserLikedPosts.map((l) => ({ userId: l.userId })),
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
export type PostWithDetailsForCard = ThenArg<
  ReturnType<typeof getPosts>
>[number]

export type PostDetails = NonNullable<
  ThenArg<ReturnType<typeof getPostDetailsById>>
>
