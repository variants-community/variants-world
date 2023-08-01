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
          _count: true,
          id: true
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

export type PostDetails = NonNullable<ThenArg<ReturnType<typeof getPostDetailsById>>>