import type { Comment } from '@prisma/client'
import type { ExtendedComment } from './index'
import { formatDate } from '../../hepers'

type CommentsProps = {
  comments: ExtendedComment[];
  onReply: (comment: Comment) => void;
};

const CommentsList = (props: CommentsProps) => (
  <div className={'flex flex-col gap-[20px] mb-[40px]'}>
    {props.comments.map((c) => (
      <CommentCard
        key={c.id}
        comment={c}
        reply={() => props.onReply(c)}
      />
    ))}
  </div>
)

type CommentCardProps = {
  comment: ExtendedComment;
  reply: () => void;
};

const CommentCard = (props: CommentCardProps) => (
  <div
    className={'w-full flex flex-row p-[15px] gap-[15px] border border-border-dark border-[1px] rounded-[12px] shadow-dark'}
  >
    <img src="/src/assets/images/user.png" className={'h-[48px]'} />
    <div className={'w-full flex flex-col gap-[8px]'}>
      <div className={'flex flex-row justify-between'}>
        <div>
          <span className={'text-white font-semibold'}>
            {props.comment.User.name}
          </span>
        </div>
        <div className={'flex flex-row gap-[12px]'}>
          <span className={'flex'}>{formatDate(props.comment.createdAt)}</span>
          <button className={'flex'} onClick={() => props.reply()}>
            reply
          </button>
        </div>
      </div>

      <div className={'flex flex-col gap-[8px]'}>
        {props.comment.parent && (
          <div
            className={'comment-quoting flex flex-col bg-gray p-[5px] rounded mr-auto'}
          >
            <span className={'font-bold'}>{props.comment.parent.User.name}:</span>
            <p className={'inline-block'}>
              {`${props.comment.parent.content}`}
            </p>
          </div>
        )}

        <p>
          {props.comment.content}
        </p>
      </div>
    </div>
  </div>
)
export default CommentsList

{
  /* <div
className={'bg-gray w-full flex flex-row justify-between  p-[5px] '}
>
<div className={'flex flex-row gap-[20px]'}>
  <img src="/src/assets/images/user.png" className={'h-[48px]'} />
  <div className={'bg-green flex flex-col'}>
    <span className={'text-white font-semibold'}>
      {props.comment.User.name}
    </span>
    {props.comment.parent && (
      <p className={'inline-block bg-gray p-[5px] rounded-[3px]'}>
        {`"""${props.comment.parent.content.substring(0, 20)}...`}
      </p>
    )}
    <p>
      {props.comment.content}
    </p>
  </div>
</div>
<div className={'bg-green flex flex-row gap-[10px]'}>
  <span className={'flex'}>{formatDate(props.comment.createdAt)}</span>
  <button className={'flex'} onClick={() => props.reply()}>reply</button>
</div>
</div> */
}
