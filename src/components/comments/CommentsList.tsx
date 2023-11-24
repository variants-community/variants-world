import { type Ref, useMemo, useRef } from 'preact/hooks'
import { formatDate } from 'utils/hepers'
import { supabase } from 'db/supabase/supabase'
import QuoteIcon from 'components/icons/QuoteIcon'
import type { Comment } from '@prisma/client'
import type { ExtendedComment } from 'components/comments/index'

type CommentsProps = {
  isUserTester: boolean
  comments: ExtendedComment[]
  onReply: (comment: Comment) => void
  highlight: (id: number) => void
  highlighted?: number
}

const CommentsList = (props: CommentsProps) => (
  <div class={'flex flex-col gap-[20px] mb-[40px]'}>
    <h2 class={'w-11/12 sm:w-125 lg:w-full mx-auto text-4xl font-bold text-text'}>Discussion</h2>
    {props.comments
      .sort((first, second) => first.createdAt.getTime() - second.createdAt.getTime())
      .filter(c => !c.hidden)
      .map(c => (
        <CommentCard
          isUserTester={props.isUserTester}
          key={c.id}
          comment={c}
          reply={() => props.onReply(c)}
          remove={async () => {
            await supabase.from('Comment').update({ hidden: true }).eq('id', c.id)
          }}
          highlight={props.highlight}
          isHighlighted={props.highlighted === c.id}
        />
      ))}
  </div>
)

type CommentCardProps = {
  isUserTester: boolean
  comment: ExtendedComment
  reply: () => void
  remove: () => void
  highlight: (id: number) => void
  isHighlighted: boolean
}

const CommentCard = (props: CommentCardProps) => {
  const ref = useRef<HTMLDivElement>()

  useMemo(
    () => props.isHighlighted && ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    [props.isHighlighted]
  )

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      id={`comment-${props.comment.id}`}
      class={`w-11/12 flex bg-border-light mx-auto sm:w-125 lg:w-full p-4 gap-4 border-1 border-border-dark rounded-xl
      group filter transition-colors duration-200 ${props.isHighlighted && '!bg-[#7e3024]'}`}
    >
      <img src="/assets/images/user.png" class={'h-[48px]'} />
      <div class={'w-[calc(100%-66px)] flex flex-col gap-2'}>
        <div class={'flex justify-between'}>
          <div>
            <span class={'text-white font-semibold'}>{props.comment.User.username}</span>
          </div>
          <div class={'flex gap-3 flex-row-reverse'}>
            <span>{formatDate(props.comment.createdAt)}</span>
            <button
              class={
                'hover:text-secondary opacity-0 pointer-events-none transform transition-opacity duration-100 group-hover:(opacity-100 pointer-events-auto)'
              }
              onClick={() => props.reply()}
            >
              reply
            </button>
            <button
              onClick={() => {
                props.highlight(props.comment.id)
                window.location.hash = `#comment-${props.comment.id}`
              }}
              class={
                'hover:text-secondary opacity-0 pointer-events-none transform transition-opacity duration-100 group-hover:(opacity-100 pointer-events-auto)'
              }
            >
              share
            </button>
            {props.isUserTester && (
              <button
                class={
                  'hover:text-secondary opacity-0 pointer-events-none transform transition-opacity duration-100 group-hover:(opacity-100 pointer-events-auto)'
                }
                onClick={() => props.remove()}
              >
                remove
              </button>
            )}
          </div>
        </div>

        <div class={'flex flex-col gap-2 text-text-light'}>
          {props.comment.parent && (
            <div
              onClick={() => props.comment.parent && props.highlight(props.comment.parent.id)}
              class={`flex flex-row gap-1.5 items-center px-4 py-2 bg-gray rounded comment-quoting cursor-pointer 
              transition-colors duration-200 ${props.isHighlighted && '!bg-[#6f261b]'}`}
            >
              <QuoteIcon class={'min-w-4 w-4 h-3'} />
              <span class={'font-bold'}>{props.comment.parent.User.username}:</span>
              <span class={'whitespace-nowrap overflow-hidden overflow-ellipsis'}>
                {props.comment.parent.hidden ? <i>{'[comment deleted]'}&nbsp;</i> : props.comment.parent.content}
              </span>
            </div>
          )}

          <p class={'text-lg whitespace-pre-wrap'}>{props.comment.content}</p>
        </div>
      </div>
    </div>
  )
}
export default CommentsList
