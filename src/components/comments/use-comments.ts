import { convertUTCDateToLocalDate } from 'utils/hepers'
import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { ExtendedComment } from '.'

export const useComments = (initComments: ExtendedComment[], postId: number) => {
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
                    id: parentUser.data.id,
                    username: parentUser.data.username,
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
              // URGENT TODO
              ...comments.value,
              {
                ...newComment,
                createdAt: convertUTCDateToLocalDate(newComment.createdAt),
                User: {
                  id: user.data.id,
                  username: user.data.username,
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

  return {
    comments: comments.value
  }
}
