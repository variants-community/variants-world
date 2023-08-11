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

export const getPosts = async (skip: number, take: number = 10) => {
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