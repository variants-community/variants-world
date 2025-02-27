import { edgeCache } from 'utils/cache'
import { prisma } from 'db/prisma/prisma'
import type { GameClassification, GameplayClassification, VoteValue } from '@prisma/client'
import type { UserForCard } from 'db/prisma/types'

export const getStars = async () => {
  const cached = edgeCache.get<number>('stars')
  if (cached !== undefined) return cached
  console.log('Fetching stars...')
  const stars = (await prisma.system.findFirst({ where: { id: 1 }, select: { stars: true } }))?.stars ?? 0
  edgeCache.set('stars', stars, ['stars'])
  return stars
}

export const getPostById = async (postId: number) => {
  const cached = edgeCache.get<Awaited<ReturnType<typeof getPostById>>>(postId) as never
  if (cached) return cached

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
              User: {
                select: {
                  id: true,
                  username: true,
                  role: true,
                  profileUrl: true,
                  lockedUntil: true
                }
              }
            }
          },
          User: {
            select: {
              id: true,
              username: true,
              role: true,
              profileUrl: true,
              lockedUntil: true
            }
          }
        }
      },
      PostDetails: {
        include: {
          votes: {
            include: {
              tester: {
                select: {
                  id: true,
                  username: true,
                  role: true,
                  profileUrl: true
                }
              }
            }
          }
        }
      },
      gamerules: true,
      UserLikedPosts: true
    }
  })

  edgeCache.set(postId, post, [`post-${postId}`])
  return post
}

export const getPostDetailsById = async (postId: number) => {
  const details = await prisma.postDetails.findFirst({
    where: {
      postId
    },
    include: {
      votes: {
        include: {
          tester: {
            select: {
              id: true,
              username: true,
              role: true,
              profileUrl: true
            }
          }
        }
      }
    }
  })

  return details
}

export interface PostDetails {
  id: number
  postId: number
  gameClassification: GameClassification | null
  gameplayClassification: GameplayClassification | null
  notes: string | null
  votes: {
    id: number
    postDetailsId: number
    tester: UserForCard
    testerId: number
    value: VoteValue
  }[]
}
