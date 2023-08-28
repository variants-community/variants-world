import { addCommentQuery } from 'db/supabase/queries'
import { scrollToElement } from 'utils/hepers'
import { useComments } from 'components/Comments/use-comments'
import { useEffect } from 'preact/hooks'
import { useReply } from 'components/Comments/use-reply'
import CommentInput from 'components/Comments/CommentInput'
import CommentsList from 'components/Comments/CommentsList'
import type { Comment, User } from '@prisma/client'

export type ExtendedComment = Comment & {
  User: User
  parent?: ExtendedComment | null
}

type CommentsProps = {
  isUserTester: boolean
  comments: ExtendedComment[]
  postId: number
  userId: number
}

const Comments = (props: CommentsProps) => {
  const { comments } = useComments(props.comments, props.postId)
  const { replyTo, setReplyTo, cancelReplyTo } = useReply()

  useEffect(() => {
    if (replyTo) {
      scrollToElement('comment-input')
    }
  }, [replyTo])

  const postComment = async (commentText: string, replyCommentId?: number) => {
    if (commentText.length > 0) {
      await addCommentQuery(commentText, props.postId, props.userId, replyCommentId)
      cancelReplyTo()
    }
  }

  return (
    <div class={'flex flex-col gap-8 mb-25 sm:mx-5 lg:(mx-auto w-auto)'}>
      <CommentsList isUserTester={props.isUserTester} comments={comments} onReply={setReplyTo} />
      <CommentInput onSendComment={postComment} replyTo={replyTo} cancelReplyTo={cancelReplyTo} />
    </div>
  )
}

export default Comments
