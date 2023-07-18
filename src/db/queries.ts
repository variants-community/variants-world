import prisma from './prisma'


export const getPosts = async (skip: number, take: number = 10) => {
  const posts = await prisma.post.findMany({
    skip,
    take,
    include: {
     gamerules: true,
     author: {
      include: {
        likedPosts: true
      }
     },
     comments: true,
     likes: true
     
    },
    orderBy: {
     createdAt: 'asc'
    }
  })
  return posts 
}
// type ArrayElement<ArrayType extends readonly unknown[]> = 
//   ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type PostWithDetails = ThenArg<ReturnType<typeof getPosts>>[number];
// type ArrayElementType<ArrayType extends Array> = ArrayType[number];

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
// export type PostWithDetails = ArrayElementType<ThenArg<ReturnType<typeof getPosts>>>
