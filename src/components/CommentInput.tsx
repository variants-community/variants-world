import { useState } from 'preact/hooks'
import { getValueFromEvent } from '../hepers'
import type { Comment } from '@prisma/client'

type CommentInputProps = {
  onSendComment: (value: string, replyCommentId?: number) => void;
  cancelReply: () => void;
  reply?: Comment;
};

const CommentInput = (props: CommentInputProps) => {
  const [commentText, setCommentText] = useState('')

  const onClick = () => {
    props.onSendComment(commentText, props.reply?.id)
    setCommentText('')
    console.log('isEmpty now')
  }

  const onInput = (e: Event) => {
    const value = getValueFromEvent<string>(e)
    setCommentText(value)
  }

  return (
    <div>
      {props.reply && (
        <div>
          <span>reply to: {props.reply.content.substring(0, 35)}...</span>
          <button onClick={() => props.cancelReply()}>X</button>
        </div>
      )}
      <textarea
        value={commentText}
        onInput={onInput}
        placeholder={'Please be nice when you chat'}
        rows={4}
        className={'bg-dark border border-[2px] text-[16px] resize-none border-border-dark shadow-light rounded-[12px] w-full bg-dark p-[20px] outline-none'}
      />
      <button
        onClick={onClick}
        className={'block bg-primary border border-[2px] border-border-dark rounded-[10px] px-[50px] py-[9px] text-white ml-auto mt-[24px]'}
      >
        Comment
      </button>
    </div>
  )
}

export default CommentInput
