import { addCommentQuery } from 'db/supabase/queries'
import { convertUTCDateToLocalDate } from 'utils/hepers'
import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { ExtendedComment } from '.'
import type { Ref } from 'preact/hooks'

export const useComments = (
  textarea: Ref<HTMLTextAreaElement>,
  initComments: ExtendedComment[],
  postId: number,
  userId: number
) => {
  const comments = useSignal(initComments)

  useEffect(() => {
    const channel = supabase
      .channel('comments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Comment',
          filter: `postId=eq.${postId}`
        },
        async payload => {
          const newComment = payload.new as ExtendedComment
          let parent: ExtendedComment | null = null

          const user = await supabase.from('User').select().eq('id', newComment.userId).single()

          if (newComment.parent_id) {
            const parentComment = await supabase.from('Comment').select().eq('id', newComment.parent_id).single()

            if (parentComment.data) {
              const parentUser = await supabase.from('User').select().eq('id', newComment.userId).single()

              if (parentUser.data) {
                parent = {
                  User: {
                    email: parentUser.data.email,
                    id: parentUser.data.id,
                    name: parentUser.data.name,
                    role: parentUser.data.role
                  },
                  content: parentComment.data.content,
                  createdAt: new Date(parentComment.data.createdAt),
                  id: parentComment.data.id,
                  // eslint-disable-next-line camelcase
                  parent_id: parentComment.data.parent_id,
                  postId: parentComment.data.postId,
                  userId: parentComment.data.userId
                } as ExtendedComment
              }
            }
          }

          if (user.data) {
            comments.value = [
              ...comments.value,
              {
                ...newComment,
                createdAt: convertUTCDateToLocalDate(newComment.createdAt),
                User: {
                  id: user.data.id,
                  email: user.data.email,
                  name: user.data.name,
                  role: user.data.role
                },
                parent
              }
            ]
              .sort((first, second) =>
                first.createdAt > second.createdAt ? -1 : first.createdAt < second.createdAt ? 1 : 0
              )
              .filter(c => !c.hidden)
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Comment',
          filter: `postId=eq.${postId}`
        },
        async payload => {
          comments.value = comments.value.filter(c => c.id !== payload.new.id && payload.new.hidden)
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, comments])

  const postComment = async (replyCommentId?: number) => {
    if (textarea.current) {
      const commentText = textarea.current.value

      if (commentText.length > 0) {
        await addCommentQuery(commentText, postId, userId, replyCommentId)
        textarea.current.value = ''
      }
    }
  }

  return {
    comments: comments.value,
    postComment
  }
}
