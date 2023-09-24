import { formatDate } from 'utils/hepers'
import { supabase } from 'db/supabase/supabase'
import type { Comment } from '@prisma/client'
import type { ExtendedComment } from 'components/comments/index'

type CommentsProps = {
  isUserTester: boolean
  comments: ExtendedComment[]
  onReply: (comment: Comment) => void
}

const CommentsList = (props: CommentsProps) => (
  <div class={'flex flex-col gap-[20px] mb-[40px]'}>
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
        />
      ))}
  </div>
)

type CommentCardProps = {
  isUserTester: boolean
  comment: ExtendedComment
  reply: () => void
  remove: () => void
}

const CommentCard = (props: CommentCardProps) => (
  <div
    class={
      'w-11/12 flex flex-row mx-auto sm:w-125 lg:w-full p-4 gap-4 border-1 border border-border-dark rounded-xl shadow-dark'
    }
  >
    <img src="/src/assets/images/user.png" class={'h-[48px]'} />
    <div class={'w-full flex flex-col gap-2'}>
      <div class={'flex flex-row justify-between'}>
        <div>
          <span class={'text-white font-semibold'}>{props.comment.User.name}</span>
        </div>
        <div class={'flex flex-row gap-3'}>
          <span class={'flex'}>{formatDate(props.comment.createdAt)}</span>
          <button class={'flex'} onClick={() => props.reply()}>
            reply
          </button>
          {props.isUserTester && (
            <button class={'flex'} onClick={() => props.remove()}>
              remove
            </button>
          )}
        </div>
      </div>

      <div class={'flex flex-col gap-2'}>
        {props.comment.parent && (
          <div class={'flex flex-col mr-auto p-2 bg-gray rounded comment-quoting'}>
            <span class={'font-bold'}>{props.comment.parent.User.name}:</span>
            <p class={'inline-block'}>
              {props.comment.parent.hidden ? '[comment deleted]' : props.comment.parent.content}
            </p>
          </div>
        )}

        <p class={'whitespace-break-spaces'}>{props.comment.content}</p>
      </div>
    </div>
  </div>
)
export default CommentsList
