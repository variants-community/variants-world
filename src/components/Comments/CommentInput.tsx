import { getValueFromEvent } from 'utils/hepers'
import { useState } from 'preact/hooks'
import type { Comment } from '@prisma/client'

type CommentInputProps = {
  onSendComment: (value: string, replyCommentId?: number) => void
  cancelReplyTo: () => void
  replyTo?: Comment
}

const CommentInput = (props: CommentInputProps) => {
  const [commentText, setCommentText] = useState('')

  const sendComment = () => {
    props.onSendComment(commentText, props.replyTo?.id)
    setCommentText('')
  }

  const onInput = (e: Event) => {
    const value = getValueFromEvent<string>(e)
    setCommentText(value)
  }

  return (
    <div
      class={
        'w-11/12 mx-auto lg:mx-0 sm:w-[500px] lg:w-[984px] bg-dark border border-[2px] text-[16px] border-border-dark shadow-light rounded-[12px] bg-dark overflow-hidden'
      }
    >
      {props.replyTo && (
        <div class={'flex flex-row justify-between border-b border-b-border-dark border-b-[2px] p-[8px]'}>
          <div>
            <span class={'font-font-semibold'}>reply to:</span> <p>{props.replyTo.content}</p>
          </div>
          <button onClick={() => props.cancelReplyTo()}>cancel</button>
        </div>
      )}
      <textarea
        id="comment-input"
        value={commentText}
        onInput={onInput}
        placeholder={'Please be nice when you chat'}
        rows={4}
        class={'w-full p-[20px] bg-dark resize-none outline-none'}
      />
      <button
        onClick={sendComment}
        class={
          'block bg-primary border border-[2px] border-border-dark rounded-[10px] px-[50px] py-[9px] text-white ml-auto m-[20px] mt-[24px]'
        }
      >
        Comment
      </button>
    </div>
  )
}

export default CommentInput
