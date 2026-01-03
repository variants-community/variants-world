import { getConvexClient } from 'src/lib/convex-client'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { ExtendedComment } from '.'

export const useComments = (initComments: ExtendedComment[], postId: string) => {
  const comments = useSignal<ExtendedComment[]>(initComments)
  const convex = getConvexClient()

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    const setupSubscription = async () => {
      const { api } = await import('../../../convex/_generated/api')
      // Subscribe to comments query for realtime updates
      // postId can be either a Convex ID string or a numeric visibleId string
      // Try to parse as number, if NaN pass as string (Convex ID)
      console.log('useComments postId:', postId, typeof postId)
      const parsedPostId = Number(postId)
      const postIdArg = Number.isNaN(parsedPostId) ? postId : parsedPostId
      console.log('useComments postIdArg:', postIdArg, typeof postIdArg)
      unsubscribe = convex.onUpdate(
        api.comments.getByPost,
        { postId: postIdArg as any },
        (updatedComments: any[]) => {
          console.log('Comments update received:', updatedComments?.length, updatedComments)
          if (updatedComments && Array.isArray(updatedComments)) {
            // Transform Convex comments to ExtendedComment format
            // Note: Convex returns User (capitalized) not user
            const transformed: ExtendedComment[] = updatedComments.map(c => ({
              id: c._id,
              content: c.content,
              createdAt: new Date(c.createdAt),
              postId: c.postId,
              userId: c.userId,
              parent_id: c.parentId,
              hidden: c.hidden,
              User: c.User ? {
                id: c.User.id,
                username: c.User.username,
                role: c.User.role,
                profileUrl: c.User.profileUrl,
                lockedUntil: c.User.lockedUntil ? new Date(c.User.lockedUntil) : null
              } : null,
              parent: c.parent ? {
                id: c.parent._id,
                content: c.parent.content,
                createdAt: new Date(c.parent.createdAt),
                postId: c.parent.postId,
                userId: c.parent.userId,
                parent_id: c.parent.parentId,
                hidden: c.parent.hidden,
                User: c.parent.User ? {
                  id: c.parent.User.id,
                  username: c.parent.User.username,
                  role: c.parent.User.role,
                  profileUrl: c.parent.User.profileUrl,
                  lockedUntil: c.parent.User.lockedUntil ? new Date(c.parent.User.lockedUntil) : null
                } : null
              } : null
            }))

            comments.value = transformed
              .sort((first, second) =>
                first.createdAt > second.createdAt ? -1 : first.createdAt < second.createdAt ? 1 : 0
              )
          }
        }
      )
    }

    setupSubscription()

    return () => {
      unsubscribe?.()
    }
  }, [postId])

  return {
    comments: comments.value
  }
}
