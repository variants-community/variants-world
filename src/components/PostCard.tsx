import PostTags from './PostTags'
import PostTitle from './PostTitle'
import PostUser from './PostUser'
import CommentIcon from './icons/CommentIcon'
import StatusIcon from './icons/StatusIcon'
import type { PostWithDetailsForCard } from '../db/prisma/queries'
import type { GameStatus } from '@prisma/client'
import Likes from './Likes'

type PostCardProps = {
  post: PostWithDetailsForCard;
  userId: number;
};

const PostCard = (props: PostCardProps) => {
  return (
    <div
      className={'flex flex-row rounded-[12px] overflow-hidden bg-border-light border border-[2px] border-border-dark'}
    >
      <img
        src="/src/assets/images/game.png"
        alt={props.post.title}
        className={'w-[220px] h-[220px]'}
      />
      <div className={'w-full flex flex-col justify-between p-[20px] '}>
        <div className={'flex flex-col gap-[10px]'}>
          <PostTitle
            linkTo={`/posts/${props.post.id}`}
            type={props.post.type}
            title={props.post.title}
          />
          <PostTags
            rules={props.post.gamerules.map((rule) => rule.name)}
            className="text-text bg-dark border border-[0.4px] border-border-dark"
            iconsClassName="fill-text"
          />
        </div>
        <div className={'flex flex-row justify-between'}>
          <PostUser user={props.post.author.name} />
          <div
            className={'w-[150px] flex flex-row justify-end text-[22px] gap-[15px]'}
          >
            <div className={''}>
              <Status status={props.post.status} />
            </div>
            <div className={'w-min-[70px]'}>
              <Comments count={props.post.comments.length} />
            </div>
            <div className={'w-min-[70px]'}>
              <Likes
                likes={props.post.likes}
                postId={props.post.id}
                userId={props.userId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Status = ({ status }: { status: GameStatus }) => (
  <div className={'w-auto'}>
    {status === 'ACCEPTED'
      ? <StatusIcon className="fill-green" />
      : status === 'DECLINED'
      ? <StatusIcon className="fill-red" />
      : status === 'PENDING_REPLY'
      ? <StatusIcon className="fill-blue" />
      : <StatusIcon className="fill-yellow" />}
  </div>
)

const Comments = ({ count }: { count: number }) => (
  <div className={'flex flex-row justify-end items-center gap-[8px]'}>
    <span>{count}</span>
    <CommentIcon />
  </div>
)

export default PostCard
