import { getConvexClient } from 'src/lib/convex-client'
import { useEffect } from 'preact/hooks'
import type { GameStatus } from 'db/convex/types'

type PostResolution = {
  verdict: string | null
  status: GameStatus
}

export const usePostStatus = (postId: string, updateData: (data: PostResolution) => void) => {
  const convex = getConvexClient()

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    const setupSubscription = async () => {
      const { api } = await import('../../../convex/_generated/api')
      // postId can be either a Convex ID string or a numeric visibleId string
      const parsedPostId = Number(postId)
      const postIdArg = Number.isNaN(parsedPostId) ? postId : parsedPostId
      unsubscribe = convex.onUpdate(
        api.posts.getById,
        { id: postIdArg as any },
        (post: any) => {
          if (post) {
            updateData({
              status: post.status,
              verdict: post.verdict
            })
          }
        }
      )
    }

    setupSubscription()

    return () => {
      unsubscribe?.()
    }
  }, [postId])
}
