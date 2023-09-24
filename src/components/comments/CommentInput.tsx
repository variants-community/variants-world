import { useCtrlEnterToSend } from 'components/comments/use-ctrl-enter-to-send'
import type { Comment } from '@prisma/client'
import type { Ref } from 'preact/hooks'

type CommentInputProps = {
  onSendComment: (replyCommentId?: number) => void
  cancelReply: () => void
  reply?: Comment
  textarea: Ref<HTMLTextAreaElement>
}

const CommentInput = (props: CommentInputProps) => {
  useCtrlEnterToSend(props.textarea, async () => props.onSendComment(props.reply?.id))

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
          ref={props.textarea}
          id="comment-input"
          placeholder={'Please be nice when you chat'}
          rows={4}
          class={'w-full p-5 bg-dark resize-none outline-none'}
        />
      </div>
      <button
        onClick={() => props.onSendComment(props.reply?.id)}
        class={'w-46 h-11 block ml-auto mt-6 bg-primary darkborder rounded-[10px] text-white'}
      >
        Comment
      </button>
    </div>
  )
}

export default CommentInput
