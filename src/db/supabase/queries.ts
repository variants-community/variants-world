/* eslint-disable prettier/prettier */
import { actions } from 'astro:actions'
import { invalidatePrefetch } from 'utils/hepers'
import { supabase } from 'db/supabase/supabase'

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

  await actions.invalidate(['posts', `post-${postId}`])
  invalidatePrefetch()

  return error == null
}

export const putLikeQuery = async (postId: number, userId: number) => {
  const { error } = await supabase
    .from('PostOnUserLikes')
    .insert({ postId, userId })

  await actions.invalidate(['posts', `post-${postId}`])
  invalidatePrefetch()

  return error == null
}

export const getLikesCountQuery = async (postId: number) => {
  const { data } = await supabase
    .from('PostOnUserLikes')
    .select('*')
    .eq('postId', postId)
  return data ? data.length : 0
}

export const addCommentQuery = async (
  content: string,
  postId: number,
  userId: number,
  replyToCommentId?: number
) => {
  const { error } = await supabase.from('Comment').insert({
    content,
    postId,
    userId,
    // eslint-disable-next-line camelcase
    parent_id: replyToCommentId
  })

  await actions.invalidate(['posts', `post-${postId}`])
  invalidatePrefetch()

  return error == null
}

export const getTotalPostsCount = async () => {
  const { count } = await supabase
    .from('Post')
    .select('*', { count: 'exact', head: true })

  return count ?? 0
}

export const getGameRuleId = async (ruleName: string) => {
  const response = await supabase
    .from('GameRule')
    .select()
    .eq('name', ruleName)
    .single()

  return response.error ? undefined : response.data.id
}

export const addGameRuleAndGetId = async (
  ruleName: string
): Promise<number | undefined> => {
  const response = await supabase
    .from('GameRule')
    .insert({ name: ruleName })
    .select()
    .single()

  return response.error ? undefined : response.data.id
}

export const addGameRuleToPost = async (ruleId: number, postId: number) => {
  const { error } = await supabase
    .from('_GameRuleToPost')
    .insert({ A: ruleId, B: postId })

  return error == null
}

export const removeGameRuleFromPost = async (
  ruleId: number,
  postId: number
) => {
  const { error } = await supabase
    .from('_GameRuleToPost')
    .delete()
    .eq('A', ruleId)
    .eq('B', postId)

  return error == null
}

export const updatePostGameRule = async (
  newRuleId: number,
  oldRuleId: number,
  postId: number
) => {
  const { error } = await supabase
    .from('_GameRuleToPost')
    .update({ A: newRuleId })
    .eq('A', oldRuleId)
    .eq('B', postId)

  return error == null
}
