import { mapRuleVariantsToString } from 'utils/game-rules-mapper'
import { prisma } from 'db/prisma/prisma'
import type { CGABotGameDetails } from 'cgabot'
import type {
  GameClassification,
  GameStatus,
  GameType,
  GameplayClassification,
  UserRole,
  VoteValue
} from '@prisma/client'

export const doesUserExist = async (userId: number) => (await prisma.user.count({ where: { id: userId } })) === 1

export const doesPostWithTitleExist = async (title: string) => (await prisma.post.count({ where: { title } })) === 0

export interface CreatePostDetails {
  userId: number
  gameNr: string
  approveIds: string[]
  data: {
    description: string
    title: string
    type: 'NCV' | 'WOF'
  }
}

export const createPost = async (mainGame: CGABotGameDetails, postDetailsDTO: CreatePostDetails) => {
  const rules = mapRuleVariantsToString(mainGame.q.ruleVariants).map(rule => ({ name: rule }))
  const post = await prisma.post.create({
    data: {
      gameNr: mainGame.gameNr,
      fen: mainGame.q.startFen,
      title: postDetailsDTO.data.title,
      authorUserId: postDetailsDTO.userId,
      description: postDetailsDTO.data.description,
      status: 'UNDER_REVIEW',
      variantLink: postDetailsDTO.data.title,
      type: (postDetailsDTO.data.type as GameType) ?? 'NCV',
      PostDetails: { create: {} },
      gamerules: {
        connectOrCreate: [...rules, { name: mainGame.q.timeControl }].map(rule => ({
          where: { name: rule.name },
          create: { name: rule.name }
        }))
      }
    },
    select: { id: true }
  })

  return post.id
}

export const getPostById = async (postId: number) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId
    },
    include: {
      author: true,
      comments: {
        where: { hidden: false },
        include: {
          parent: {
            include: {
              User: true
            }
          },
          User: true
        }
      },
      PostDetails: {
        include: {
          voices: {
            include: {
              tester: true
            }
          }
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

export const getPosts = async (skip: number, take = 5) => {
  const posts = await prisma.post.findMany({
    skip,
    take,
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

export const getUserRole = async (id: number) => {
  return (await prisma.user.findFirstOrThrow({ where: { id }, select: { role: true } }))?.role
}

export interface User {
  id: number
  username: string
  role: UserRole
  profileUrl: string | null
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
  author: User
  commentsCount: number
  createdAt: Date
  updatedAt: Date
  description: string
  fen: string
}

export interface PostDetails {
  id: number
  postId: number
  gameClassification: GameClassification | null
  gameplayClassification: GameplayClassification | null
  notes: string | null
  voices: {
    id: number
    postDetailsId: number
    tester: User
    testerId: number
    value: VoteValue
  }[]
}
