import { supabase } from './supabase'

export const isPostLikedByUserQuery = async (
  postId: number,
  userId: number
) => {
  const { data } = await supabase
    .from('PostOnUserLikes')
    .select()
    .eq('postId', postId)
    .eq('userId', userId)
    .single()

  return data != null
}

export const removeLikeQuery = async (postId: number, userId: number) => {
  const { error } = await supabase
    .from('PostOnUserLikes')
    .delete()
    .eq('postId', postId)
    .eq('userId', userId)

  return error == null
}

export const putLikeQuery = async (postId: number, userId: number) => {
  const { error } = await supabase
    .from('PostOnUserLikes')
    .insert({ postId, userId })

  return error == null
}

export const getLikesCountQuery = async (postId: number) => {
  const { data }  = await supabase.from('PostOnUserLikes').select('*').eq(
    'postId',
    postId,
  )
  return data ? data.length : 0
}
