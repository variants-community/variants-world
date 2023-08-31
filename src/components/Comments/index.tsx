import { useComments } from 'components/Comments/use-comments'
import { useRef } from 'preact/hooks'
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
  const textarea = useRef<HTMLTextAreaElement>(null)

  const { comments, postComment } = useComments(textarea, props.comments, props.postId, props.userId)
  const { reply, onChangeReply, cancelReplyTo } = useReply(textarea)

  return (
    <div class={'flex flex-col gap-8 mb-25 sm:mx-5 lg:(mx-auto w-auto)'}>
      <CommentsList isUserTester={props.isUserTester} comments={comments} onReply={onChangeReply} />
      <CommentInput textarea={textarea} onSendComment={postComment} reply={reply} cancelReply={cancelReplyTo} />
    </div>
  )
}

export default Comments
