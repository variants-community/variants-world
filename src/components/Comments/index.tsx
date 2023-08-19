import type { Comment, User } from '@prisma/client'
import { useEffect } from 'preact/hooks'
import { scrollTo } from '../../hepers'
import CommentsList from './CommentsList'
import CommentInput from './CommentInput'
import { useComments } from './useComments'
import { useReply } from './useReply'
import { addCommentQuery } from '../../db/supabase/queries'

export type ExtendedComment = Comment & {
  User: User;
  parent?: ExtendedComment | null;
};

type CommentsProps = {
  comments: ExtendedComment[];
  postId: number;
  userId: number;
};

const Comments = (props: CommentsProps) => {
  const { comments } = useComments(props.comments, props.postId)
  const { replyTo, setReplyTo, cancelReplyTo } = useReply()

  useEffect(() => {
    if (replyTo) {
      scrollTo('comment-input')
    }
  }, [replyTo])

  const postComment = async (commentText: string, replyCommentId?: number) => {
    if (commentText.length > 0) {
      await addCommentQuery(
        commentText,
        props.postId,
        props.userId,
        replyCommentId,
      )
      cancelReplyTo()
    }
  }

  return (
    <div className={'sm:mx-[20px] lg:w-auto flex flex-col gap-[30px] mb-[100px]'}>
      <CommentsList comments={comments} onReply={setReplyTo} />
      <CommentInput
        onSendComment={postComment}
        replyTo={replyTo}
        cancelReplyTo={cancelReplyTo}
      />
    </div>
  )
}

export default Comments
