import { getValueFromEvent } from 'utils/hepers'
import { useEffect, useRef } from 'preact/hooks'
import type { Comment } from '@prisma/client'
import type { Signal } from '@preact/signals'

type CommentInputProps = {
  comment: Signal<string>
  postComment: () => void
  cancelReply: () => void
  reply?: Comment
}

const CommentInput = (props: CommentInputProps) => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const onKeyDown = (e: KeyboardEvent) => {
    switch (true) {
      case e.key === 'Enter' && !e.altKey && (e.metaKey || e.ctrlKey) && !e.shiftKey:
        props.postComment()
        break
      case e.key === 'Escape' && !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey:
        if (props.reply) props.cancelReply()
        else ref.current?.blur()
        break
    }
  }

  useEffect(() => {
    props.reply && ref.current?.focus()
  }, [props.reply?.id])

  return (
    <div className={'w-11/12 mx-auto sm:w-125 lg:(mx-0 w-246)'}>
      <div class={'relative'}>
        {props.reply && (
          <div
            class={
              'absolute top-0 flex w-full bg-border-light justify-between darkborder border-b border-border-dark border-b-2 py-2 px-4 rounded-t-xl'
            }
          >
            <div class={'w-[95%]'}>
              <span class={'font-font-semibold'}>reply to:</span>
              <p class={'whitespace-nowrap overflow-ellipsis overflow-hidden'}>{props.reply.content}</p>
            </div>
            <button onClick={() => props.cancelReply()}>cancel</button>
          </div>
        )}
        <textarea
          ref={ref}
          value={props.comment.value}
          onInput={e => (props.comment.value = getValueFromEvent(e))}
          onKeyDown={onKeyDown}
          id="comment-input"
          placeholder={'Please be nice when you chat'}
          rows={4}
          class={`w-full p-5 bg-dark resize-none darkborder rounded-xl outline-none transition-comments-input text-lg
          placeholder-text shadow-lightSmall focus:(text-text-light placeholder-text-light shadow-lightSmallHover)
           ${props.reply && 'pt-21'}`}
        />
      </div>
      <button
        onClick={() => props.postComment()}
        class={`w-46 h-11 block ml-auto mt-6 bg-primary darkborder rounded-[10px] text-white
        transition duration-100 ${!props.comment.value && 'filter grayscale-20 opacity-70 pointer-events-none'}`}
      >
        Comment
      </button>
    </div>
  )
}

export default CommentInput
