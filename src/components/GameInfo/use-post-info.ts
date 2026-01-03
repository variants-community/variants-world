import { getConvexClient } from 'src/lib/convex-client'
import { useEffect } from 'preact/hooks'
import type { GameType } from 'db/convex/types'

type PostInfo = {
  type: GameType
  title: string
  description: string
}

export const usePostInfo = (postId: string, updateData: (data: PostInfo) => void) => {
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
              type: post.type,
              title: post.title,
              description: post.description
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
