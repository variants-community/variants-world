// import { getValueFromEvent } from 'utils/hepers'
import { useRef } from 'preact/hooks'
import type { Comment } from '@prisma/client'

type CommentInputProps = {
  onSendComment: (value: string, replyCommentId?: number) => void
  cancelReply: () => void
  reply?: Comment
}

const CommentInput = (props: CommentInputProps) => {
  const textarea = useRef<HTMLTextAreaElement>(null)

  const sendComment = () => {
    if (textarea.current) {
      props.onSendComment(textarea.current.value, props.reply?.id)
      textarea.current.value = ''
    }
  }

  return (
    <div className={'w-11/12 mx-auto sm:w-125 lg:(mx-0 w-246)'}>
      <div class={'rounded-xl darkborder bg-dark overflow-hidden shadow-light'}>
        {props.reply && (
          <div class={'flex flex-row justify-between border-b border-b-border-dark border-b-2 p-2'}>
            <div>
              <span class={'font-font-semibold'}>reply to:</span> <p>{props.reply.content}</p>
            </div>
            <button onClick={() => props.cancelReply()}>cancel</button>
          </div>
        )}
        <textarea
          ref={textarea}
          id="comment-input"
          placeholder={'Please be nice when you chat'}
          rows={4}
          class={'w-full p-5 bg-dark resize-none outline-none'}
        />
      </div>
      <button
        onClick={sendComment}
        class={'w-46 h-11 block ml-auto mt-6 bg-primary darkborder rounded-[10px] text-white'}
      >
        Comment
      </button>
    </div>
  )
}

export default CommentInput
