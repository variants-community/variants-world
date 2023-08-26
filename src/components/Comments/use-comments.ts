import { supabase } from 'db/supabase/supabase'
import { useEffect, useState } from 'preact/hooks'
import type { ExtendedComment } from '.'

export const useComments = (initComments: ExtendedComment[], postId: number) => {
  const [comments, setComments] = useState(initComments)

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
            setComments([
              ...comments,
              {
                ...newComment,
                createdAt: new Date(newComment.createdAt),
                User: {
                  id: user.data.id,
                  email: user.data.email,
                  name: user.data.name,
                  role: user.data.role
                },
                parent
              }
            ])
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
          setComments(prev => prev.filter(c => c.id !== payload.new.id && payload.new.hidden))
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, comments])

  return {
    comments
  }
}
