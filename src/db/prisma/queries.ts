import { prisma } from 'db/prisma/prisma'
import type { GameClassification, GameplayClassification, VoteValue } from '@prisma/client'
import type { UserForCard } from 'db/prisma/types'

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
              User: {
                select: {
                  id: true,
                  username: true,
                  role: true,
                  profileUrl: true
                }
              }
            }
          },
          User: {
            select: {
              id: true,
              username: true,
              role: true,
              profileUrl: true
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
    uuid: string
    refreshToken: string | null
    postDetailsId: number
    tester: UserForCard
    testerId: number
    value: VoteValue
  }[]
}
