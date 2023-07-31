// import type { GameClassification, GameplayClassification } from '@prisma/client'
import prisma from './prisma'

export const getPostById = async (postId: number) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId
    },
    include: {
      author: true,
      comments: true,
      gamerules: { 
        include: {
          ruleType: true
        }
      },

      likes: {
        select: {
          _count: true,
          id: true
        }
      }
    }
  })

  return post
}

export const getPostDetailsById = async (postId: number) => {
  const details = await prisma.postDetails.findFirst({
    where: {
      id: postId
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

// export const getGameClassification = async (id: number) => {
//   const post = await prisma.post.findFirst({
//     where: { id },
//     select: {
//       gameClassification: true,
//     }
//   })
//   return post
// }

// export const setGameClassification = async (id: number, classification: GameClassification) => {
//   const updated = await prisma.post.update({
//     where: { id },
//     data: {
//       gameClassification: classification
//     }
//   })
//   return updated
// }

// export const getGameplayClassification = async (id: number) => {
//   const post = await prisma.post.findFirst({
//     where: { id },
//     select: {
//       gameplayClassification: true,
//     }
//   })
//   return post
// }

// export const setGameplayClassification = async (id: number, classification: GameplayClassification) => {
//   const updated = await prisma.post.update({
//     where: { id },
//     data: {
//       gameplayClassification: classification
//     }
//   })
//   return updated
// }

export const getPosts = async (skip: number, take: number = 10) => {
  const posts = await prisma.post.findMany({
    skip,
    take,
    include: {
      gamerules: {
        include: {
          ruleType: true
        }
      },
      author: {
        include: {
          likedPosts: {
            select: {
              id: true
            }
          }
        }
      },
      comments: {
        select: {
          _count: true
        }
      },
      likes: {
        select: {
          _count: true
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
  return posts
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type PostWithDetailsForCard = ThenArg<
  ReturnType<typeof getPosts>
>[number]

// export type PostWithGameClassification = ThenArg<
//   ReturnType<typeof getGameClassification>
// >

// export type PostWithGameplayClassification = ThenArg<
//   ReturnType<typeof getGameplayClassification>
// >

// type MyType = { id: number; name: string; email: string } | null;

export type PostDetails = NonNullable<ThenArg<ReturnType<typeof getPostDetailsById>>>