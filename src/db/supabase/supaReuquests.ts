import { supabase } from './supabase'

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3
  const from = page ? page * limit : 0
  const to = page ? from + size - 1 : size - 1

  return { from, to }
}

export const getPostsByPage = async (page: number) => {
  const { from, to } = getPagination(page, 10)
  const { data, count, error } = await supabase
    .from('Post')
    .select(`
    *,
    author ( * )
    `)
    .order('createdAt', { ascending: true })
    .range(from, to)
  error && console.log('[getPostsByPage]: ', error.message)
  return {
    data,
    count,
    page
  }
}

// export const getPostById2 = async (postId: number) => {
//   const { data, error, status, statusText } = await supabase
//     .from('Post')
//     .select('*')
//     .eq('id', '1')
//     .maybeSingle()

//   console.log('supabase acepted: ', data)
//   console.log('error: ', error)
//   console.log('status: ', status)
//   console.log('statusText: ', statusText)
// }

// await getPostById2(1)

// export const getPostById = async (postId: number) => {
//   const post = await prisma.post.findFirst({
//     where: {
//       id: postId
//     },
//     include: {
//       author: true,
//       comments: true,
//       gamerules: true,
//       voices: true,
//       likes: {
//         select: {
//           _count: true
//         }
//       }
//     }
//   })

//   return post
// }
