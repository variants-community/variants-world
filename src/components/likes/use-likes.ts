import { getConvexClient } from 'src/lib/convex-client'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'

export const useLikes = (
  likes: { visibleId: number }[],
  visibleUserId: number,
  postId: string,
  userId: string
) => {
  const isLiked = useSignal(likes.some(like => like.visibleId === visibleUserId))
  const likesCount = useSignal(likes.length)
  const convex = getConvexClient()

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    const setupSubscription = async () => {
      const { api } = await import('../../../convex/_generated/api')
      // Subscribe to likes count for realtime updates
      // postId can be either a Convex ID string or a numeric visibleId string
      const parsedPostId = Number(postId)
      const postIdArg = Number.isNaN(parsedPostId) ? postId : parsedPostId
      unsubscribe = convex.onUpdate(
        api.likes.getCount,
        { postId: postIdArg as any },
        (count: number) => {
          if (typeof count === 'number') {
            likesCount.value = count
          }
        }
      )
    }

    setupSubscription()

    return () => {
      unsubscribe?.()
    }
  }, [postId])

  const toogleLike = async () => {
    // for experience, we immediately change state
    // but after will be set correctly
    likesCount.value = isLiked.value ? likesCount.value - 1 : likesCount.value + 1
    isLiked.value = !isLiked.value

    try {
      const { api } = await import('../../../convex/_generated/api')
      const parsedPostId = Number(postId)
      const postIdArg = Number.isNaN(parsedPostId) ? postId : parsedPostId
      const parsedUserId = Number(userId)
      const userIdArg = Number.isNaN(parsedUserId) ? userId : parsedUserId
      if (!isLiked.value) {
        await convex.mutation(api.likes.remove, {
          postId: postIdArg as any,
          userId: userIdArg as any
        })
        isLiked.value = false
      } else {
        await convex.mutation(api.likes.add, {
          postId: postIdArg as any,
          userId: userIdArg as any
        })
        isLiked.value = true
      }
    } catch (error) {
      // Revert on error
      isLiked.value = !isLiked.value
      likesCount.value = isLiked.value ? likesCount.value + 1 : likesCount.value - 1
      console.error('Failed to toggle like:', error)
    }
  }

  return {
    isLiked: isLiked.value,
    likesCount: likesCount.value,
    toogleLike
  }
}
