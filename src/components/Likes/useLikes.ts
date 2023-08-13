import { useEffect, useState } from 'preact/hooks'
import {
  getLikesCountQuery,
  isPostLikedByUserQuery,
  putLikeQuery,
  removeLikeQuery
} from '../../db/supabase/queries'
import { supabase } from '../../db/supabase/supabase'
import type { PostOnUserLikes } from '@prisma/client'

export const useLikes = (
  likes: PostOnUserLikes[],
  userId: number,
  postId: number
) => {
  const [isLiked, setIsLiked] = useState<boolean>(
    likes.find((like) => like.userId === userId) ? true : false
  )
  const [likesCount, setLikesCount] = useState<number>(likes.length)

  const updateLiksCount = async () => {
    const count = await getLikesCountQuery(postId)
    setLikesCount(count)
  }

  useEffect(() => {
    const channel = supabase
      .channel('likes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'PostOnUserLikes',
          filter: `postId=eq.${postId}`
        },
        async () => {
          await updateLiksCount()
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'PostOnUserLikes',
          filter: `postId=eq.${postId}`
        },
        async () => {
          await updateLiksCount()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const toogleLike = async () => {
    // for expirience, we immediately change state
    // but after will be set correctly
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    setIsLiked(!isLiked)

    if (await isPostLikedByUserQuery(postId, userId)) {
      const ok = await removeLikeQuery(postId, userId)
      setIsLiked(ok ? false : true)
    } else {
      const ok = await putLikeQuery(postId, userId)
      setIsLiked(ok)
    }

    await updateLiksCount()
  }

  return {
    isLiked,
    likesCount,
    toogleLike
  }
}
