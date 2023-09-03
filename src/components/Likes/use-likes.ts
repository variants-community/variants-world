import { getLikesCountQuery, putLikeQuery, removeLikeQuery } from 'db/supabase/queries'
import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'

export const useLikes = (likes: { userId: number }[], userId: number, postId: number) => {
  const isLiked = useSignal(likes.some(like => like.userId === userId))
  const likesCount = useSignal(likes.length)

  const updateLiksCount = async () => {
    const count = await getLikesCountQuery(postId)
    likesCount.value = count
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
    likesCount.value = isLiked.value ? likesCount.value - 1 : likesCount.value + 1
    isLiked.value = !isLiked.value

    if (!isLiked.value) {
      const ok = await removeLikeQuery(postId, userId)
      isLiked.value = ok ? false : true
    } else {
      const ok = await putLikeQuery(postId, userId)
      isLiked.value = ok
    }
  }

  return {
    isLiked: isLiked.value,
    likesCount: likesCount.value,
    toogleLike
  }
}
