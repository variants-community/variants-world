import type { Comment, User } from '@prisma/client'
import CommentsList from './CommentsList'
import CommentInput from './CommentInput'
import { useEffect, useState } from 'preact/hooks'
import { supabase } from '../db/supabase/supabase'

// export type ExtendedComment =
//   & Comment
//   & ({ User: User } | undefined)
//   & ({ parent: ExtendedComment | null } | null);


export type ExtendedComment = Comment & { User: User, parent?: ExtendedComment | null }

type CommentsProps = {
  comments: ExtendedComment[];
  postId: number;
  userId: number;
};

const Comments = (props: CommentsProps) => {
  const [comments, setComments] = useState(props.comments)
  const [reply, setReply] = useState<Comment | undefined>()

  useEffect(() => {
    const channel = supabase
      .channel('comments-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Comment',
          filter: `postId=eq.${props.postId}`,
        },
        async (payload) => {
          const newComment = payload.new as ExtendedComment
          let parent: ExtendedComment | null = null

          const user = await supabase.from('User').select().eq(
            'id',
            newComment.userId,
          ).single()

          if (newComment.parent_id) {
            const parentComment = await supabase.from('Comment').select().eq(
              'id',
              newComment.parent_id,
            ).single()

            if (parentComment.data) {
              const parentUser = await supabase.from('User').select().eq(
                'id',
                newComment.userId,
              ).single()

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
                  parent_id: parentComment.data.parent_id,
                  postId: parentComment.data.postId,
                  userId: parentComment.data.userId,
                } as ExtendedComment
              }
            }
          }

          if (user.data) {
            setComments([...comments, {
              ...newComment,
              createdAt: new Date(newComment.createdAt),
              User: {
                id: user.data.id,
                email: user.data.email,
                name: user.data.name,
                role: user.data.role,
              },
              parent: parent,
            }])
          }
        },
      ).subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, comments])

  const postComment = async (commentText: string, replyCommentId?: number) => {
    await supabase.from('Comment').insert({
      content: commentText,
      postId: props.postId,
      userId: props.userId,
      parent_id: replyCommentId,
    })
    setReply(undefined)
  }

  const onReply = (comment: Comment) => {
    setReply(comment)
  }

  const cancelReply = () => {
    setReply(undefined)
  }

  return (
    <div className={'flex flex-col gap-[30px] mb-[100px]'}>
      <CommentsList comments={comments} onReply={onReply} />
      <CommentInput
        onSendComment={postComment}
        reply={reply}
        cancelReply={cancelReply}
      />
    </div>
  )
}

export default Comments
