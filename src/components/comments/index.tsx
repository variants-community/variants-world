import { type Ref, useEffect, useRef } from 'preact/hooks'
import { getConvexClient } from 'src/lib/convex-client'
import { useComments } from 'components/comments/use-comments'
import { useSignal } from '@preact/signals'
import CommentInput from 'components/comments/CommentInput'
import CommentsList from 'components/comments/CommentsList'
import type { UserRole } from 'db/convex/types'

export type ExtendedComment = {
  id: string
  content: string
  createdAt: Date
  postId: string
  userId: string
  parent_id?: string
  hidden: boolean
  User: {
    id: number
    username: string
    role: UserRole
    profileUrl?: string | null
    lockedUntil?: Date | null
  } | null
  parent?: ExtendedComment | null
}

type CommentsProps = {
  isUserTester: boolean
  comments: ExtendedComment[]
  postId: string
  userId: string
}

const Comments = (props: CommentsProps) => {
  const timer = useRef<number>()
  const anchor = useRef<HTMLDivElement>()
  const comment = useSignal('')
  const reply = useSignal<ExtendedComment | undefined>(undefined)
  const highlighted = useSignal<string | undefined>(undefined)

  useEffect(() => {
    const onhashchange = () => {
      const match = self.location.hash.match(/^#comment-(.+)$/)
      if (match) highlight(match[1])
    }
    onhashchange()
    addEventListener('hashchange', onhashchange)
    return () => {
      removeEventListener('hashchange', onhashchange)
    }
  }, [])

  const onReply = (sourceComment?: ExtendedComment) => {
    reply.value = sourceComment
    setTimeout(() => {
      anchor.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    })
  }

  const postComment = async () => {
    if (comment.value) {
      const convex = getConvexClient()
      const { api } = await import('../../../convex/_generated/api')
      await convex.mutation(api.comments.add, {
        content: comment.value,
        postId: props.postId as any,
        userId: props.userId as any,
        parentId: reply.value?.id as any
      })
      comment.value = ''
      reply.value = undefined
    }
  }

  const highlight = (id: string) => {
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
