import { formatDate } from 'utils/hepers'
import { highlightLinks } from 'utils/formatters'
import { getConvexClient } from 'src/lib/convex-client'
import { useMemo, useRef } from 'preact/hooks'
import LockedIcon from 'components/icons/Locked'
import QuoteIcon from 'components/icons/QuoteIcon'
import type { ExtendedComment } from 'components/comments/index'

const invalidateCache = async (tags: string[]) => {
  try {
    await fetch('/_actions/invalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tags)
    })
  } catch (e) {
    console.error('Failed to invalidate cache:', e)
  }
}

type CommentsProps = {
  isUserTester: boolean
  comments: ExtendedComment[]
  postId: string
  onReply: (comment: ExtendedComment) => void
  highlight: (id: string) => void
  highlighted?: string
}

const CommentsList = (props: CommentsProps) => (
  <div class={'flex flex-col gap-[0.4rem] mb-[40px]'}>
    <h2 class={'w-11/12 sm:w-125 lg:w-full mx-auto text-4xl font-bold text-text'}>Discussion</h2>
    {props.comments
      .sort((first, second) => {
        const firstTime = typeof first.createdAt === 'number' ? first.createdAt : first.createdAt.getTime()
        const secondTime = typeof second.createdAt === 'number' ? second.createdAt : second.createdAt.getTime()
        return firstTime - secondTime
      })
      .filter(c => !c.hidden)
      .map(c => (
        <CommentCard
          isUserTester={props.isUserTester}
          key={c.id}
          comment={c}
          reply={() => props.onReply(c)}
          remove={async () => {
            const convex = getConvexClient()
            const { api } = await import('../../../convex/_generated/api')
            await convex.mutation(api.comments.hide, { id: c.id as any })
            await invalidateCache(['posts', `post-${props.postId}`])
          }}
          highlight={props.highlight}
          isHighlighted={!!props.highlighted && props.highlighted === c.id}
        />
      ))}
  </div>
)

type CommentCardProps = {
  isUserTester: boolean
  comment: ExtendedComment
  reply: () => void
  remove: () => void
  highlight: (id: string) => void
  isHighlighted: boolean
}

const CommentCard = (props: CommentCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useMemo(
    () => props.isHighlighted && ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    [props.isHighlighted]
  )

  const commentParts = useMemo(() => highlightLinks(props.comment.content), [props.comment.content])

  return (
    <div
      ref={ref}
      id={`comment-${props.comment.id}`}
      class={`w-11/12 flex bg-border-light mx-auto sm:w-125 lg:w-full p-4 pb-2 gap-4 border-1 border-border-dark rounded-xl
      group filter transition-colors duration-200 ${props.isHighlighted && '!bg-[#7e3024]'} ${props.comment.User.lockedUntil && 'opacity-60'}`}
    >
      <img src={props.comment.User.profileUrl ?? '/assets/images/user.png'} class={'h-12 rounded-md'} />
      <div class={'w-[calc(100%-66px)] flex flex-col gap-2'}>
        <div class={'flex justify-between'}>
          <div class="flex">
            <span class={'text-white font-semibold'}>{props.comment.User.username}</span>
            {props.comment.User.lockedUntil && (
              <span class="mt-0.25 ml-1" data-tooltip="Locked" data-tooltip-position="bottom">
                <LockedIcon />
              </span>
            )}
          </div>
          <div class={'flex gap-3 flex-row-reverse'}>
            <span class="whitespace-nowrap ">{formatDate(props.comment.createdAt)}</span>
            <button
              class={
                'hidden sm:block hover:text-secondary sm:opacity-0 pointer-events-none transform transition-opacity duration-100 sm:group-hover:(opacity-100 pointer-events-auto)'
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
                'hidden sm:block hover:text-secondary sm:opacity-0 pointer-events-none transform transition-opacity duration-100 sm:group-hover:(opacity-100 pointer-events-auto)'
              }
            >
              share
            </button>
            {props.isUserTester && (
              <button
                class={
                  'hidden sm:block hover:text-secondary sm:opacity-0 pointer-events-none transform transition-opacity duration-100 sm:group-hover:(opacity-100 pointer-events-auto)'
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

          <p class={'text-lg whitespace-pre-wrap'}>{commentParts}</p>
        </div>
        <div class="flex ml-auto gap-2 text-secondary">
          <button class={'sm:hidden'} onClick={() => props.reply()}>
            reply
          </button>
          <button
            onClick={() => {
              props.highlight(props.comment.id)
              window.location.hash = `#comment-${props.comment.id}`
            }}
            class={'sm:hidden'}
          >
            share
          </button>
          {props.isUserTester && (
            <button class={'sm:hidden'} onClick={() => props.remove()}>
              remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default CommentsList
