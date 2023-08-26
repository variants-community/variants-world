import { formatDate } from 'utils/hepers'
import { supabase } from 'db/supabase/supabase'
import type { Comment } from '@prisma/client'
import type { ExtendedComment } from 'components/Comments/index'

type CommentsProps = {
  isUserTester: boolean
  comments: ExtendedComment[]
  onReply: (comment: Comment) => void
}

const CommentsList = (props: CommentsProps) => (
  <div class={'flex flex-col gap-[20px] mb-[40px]'}>
    {props.comments.map(c => (
      <CommentCard
        isUserTester={props.isUserTester}
        key={c.id}
        comment={c}
        reply={() => props.onReply(c)}
        remove={async () => {
          await supabase.from('Comment').delete().eq('id', c.id)
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
    class={'w-full flex flex-row p-[15px] gap-[15px] border border-border-dark border-[1px] rounded-[12px] shadow-dark'}
  >
    <img src="/src/assets/images/user.png" class={'h-[48px]'} />
    <div class={'w-full flex flex-col gap-[8px]'}>
      <div class={'flex flex-row justify-between'}>
        <div>
          <span class={'text-white font-semibold'}>{props.comment.User.name}</span>
        </div>
        <div class={'flex flex-row gap-[12px]'}>
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

      <div class={'flex flex-col gap-[8px]'}>
        {props.comment.parent && (
          <div class={'comment-quoting flex flex-col bg-gray p-[5px] rounded mr-auto'}>
            <span class={'font-bold'}>{props.comment.parent.User.name}:</span>
            <p class={'inline-block'}>{`${props.comment.parent.content}`}</p>
          </div>
        )}

        <p>{props.comment.content}</p>
      </div>
    </div>
  </div>
)
export default CommentsList

{
  /* <div
class={'bg-gray w-full flex flex-row justify-between  p-[5px] '}
>
<div class={'flex flex-row gap-[20px]'}>
  <img src="/src/assets/images/user.png" class={'h-[48px]'} />
  <div class={'bg-green flex flex-col'}>
    <span class={'text-white font-semibold'}>
      {props.comment.User.name}
    </span>
    {props.comment.parent && (
      <p class={'inline-block bg-gray p-[5px] rounded-[3px]'}>
        {`"""${props.comment.parent.content.substring(0, 20)}...`}
      </p>
    )}
    <p>
      {props.comment.content}
    </p>
  </div>
</div>
<div class={'bg-green flex flex-row gap-[10px]'}>
  <span class={'flex'}>{formatDate(props.comment.createdAt)}</span>
  <button class={'flex'} onClick={() => props.reply()}>reply</button>
</div>
</div> */
}
