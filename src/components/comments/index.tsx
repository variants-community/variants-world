import { type Ref, useEffect, useRef } from 'preact/hooks'
import { addCommentQuery } from 'db/supabase/queries'
import { useComments } from 'components/comments/use-comments'
import { useSignal } from '@preact/signals'
import CommentInput from 'components/comments/CommentInput'
import CommentsList from 'components/comments/CommentsList'
import type { Comment, User } from '@prisma/client'

export type ExtendedComment = Comment & {
  User: Pick<User, 'id' | 'username' | 'role' | 'profileUrl' | 'lockedUntil'>
  parent?: ExtendedComment | null
}

type CommentsProps = {
  isUserTester: boolean
  comments: ExtendedComment[]
  postId: number
  userId: number
}

const Comments = (props: CommentsProps) => {
  const timer = useRef<number>()
  const anchor = useRef<HTMLDivElement>()
  const comment = useSignal('')
  const reply = useSignal<Comment | undefined>(undefined)
  const highlighted = useSignal<number | undefined>(undefined)

  useEffect(() => {
    const onhashchange = () => {
      const match = self.location.hash.match(/^#comment-(\d+)$/)
      if (match) highlight(Number(match[1]))
    }
    onhashchange()
    addEventListener('hashchange', onhashchange)
    return () => {
      removeEventListener('hashchange', onhashchange)
    }
  }, [])

  const onReply = (sourceComment?: Comment) => {
    reply.value = sourceComment
    setTimeout(() => {
      anchor.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    })
  }

  const postComment = async () => {
    if (comment.value) {
      await addCommentQuery(comment.value, props.postId, props.userId, reply.value?.id)
      comment.value = ''
      reply.value = undefined
    }
  }

  const highlight = (id: number) => {
    self.clearTimeout(timer.current)
    highlighted.value = undefined
    timer.current = self.setTimeout(() => (highlighted.value = id))
    timer.current = self.setTimeout(() => (highlighted.value = undefined), 800)
  }

  const { comments } = useComments(props.comments, props.postId)

  return (
    <div class={'flex flex-col gap-8 sm:mx-5 lg:(mx-auto w-auto)'}>
      <CommentsList
        isUserTester={props.isUserTester}
        comments={comments}
        onReply={onReply}
        highlighted={highlighted.value}
        highlight={highlight}
      />
      <CommentInput
        comment={comment}
        postComment={postComment}
        reply={reply.value}
        cancelReply={() => (reply.value = undefined)}
      />
      <div
        ref={anchor as Ref<HTMLDivElement>}
        class={`pb-25 transition-margin ease-expo duration-100 ${reply.value ? 'pt-16 mt-[-4rem]' : 'pt-0'}`}
      />
    </div>
  )
}

export default Comments
