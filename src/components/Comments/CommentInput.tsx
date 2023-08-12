import { useState } from 'preact/hooks'
import { getValueFromEvent } from '../../hepers'
import type { Comment } from '@prisma/client'

type CommentInputProps = {
  onSendComment: (value: string, replyCommentId?: number) => void;
  cancelReplyTo: () => void;
  replyTo?: Comment;
};

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
      className={'bg-dark border border-[2px] text-[16px] border-border-dark shadow-light rounded-[12px] w-full bg-dark overflow-hidden'}
    >
      {props.replyTo && (
        <div
          className={'flex flex-row justify-between border-b border-b-border-dark border-b-[2px] p-[8px]'}
        >
          <div>
            <span className={'font-font-semibold'}>reply to:</span>{' '}
            <p>{props.replyTo.content}</p>
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
        className={'w-full p-[20px] bg-dark resize-none outline-none'}
      />
      <button
        onClick={sendComment}
        className={'block bg-primary border border-[2px] border-border-dark rounded-[10px] px-[50px] py-[9px] text-white ml-auto m-[20px] mt-[24px]'}
      >
        Comment
      </button>
    </div>
  )
}

export default CommentInput
