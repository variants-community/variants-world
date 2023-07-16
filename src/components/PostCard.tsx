import PostTags from './PostTags'
import PostTitle from './PostTitle'
import PostUser from './PostUser'
import CommentIcon from './icons/CommentIcon'
import LikeIcon from './icons/LikeIcon'
import StatusIcon from './icons/StatusIcon'

type PostCardProps = {
  type: string;
  title: string;
  status: GameStatus;
  // rules: string[];
  user: string;
  likesCount: number;
  isLiked: boolean
  commentsCount: number;
  // createdAt: Date
  // description: string
  // variantLink: string
};

const PostCard = (props: PostCardProps) => {
  return (
    <div
      className={'flex flex-row rounded-[12px] overflow-hidden bg-border-light border border-[2px] border-border-dark'}
    >
      <img
        src="/src/assets/images/game.png"
        alt={props.title}
        className={'w-[220px] h-[220px]'}
      />
      <div className={'w-full flex flex-col justify-between p-[20px] '}>
        <div className={'flex flex-col gap-[10px]'}>
          <PostTitle linkTo='/post' type={props.type} title={props.title} />
          <PostTags
            rules={['3min', 'Points', '5-check', '8th=QBRN']}
            className="text-text bg-dark border border-[0.4px] border-border-dark"
            iconsClassName="fill-text"
          />
        </div>
        <div className={'flex flex-row justify-between'}>
          <PostUser user={props.user} />
          <div className={'w-[150px] flex flex-row justify-between text-[22px]'}>
            <Status status={props.status} />
            <Comments count={props.commentsCount} />
            <Likes count={props.likesCount} isLiked={props.isLiked} />
          </div>
        </div>
      </div>
    </div>
  )
}

export enum GameStatus {
  ACCEPTED,
  DECLINED,
  PENDING_REPLY,
  UNDER_REVIEW,
}

const Status = ({ status }: { status: GameStatus }) => (
  <div>
    {status === GameStatus.ACCEPTED
      ? <StatusIcon className="fill-green" />
      : status === GameStatus.DECLINED
      ? <StatusIcon className="fill-red" />
      : status === GameStatus.PENDING_REPLY
      ? <StatusIcon className="fill-blue" />
      : <StatusIcon className="fill-yellow" />}
  </div>
)

const Comments = ({ count }: { count: number }) => (
  <div className={'flex flex-row items-center gap-[8px]'}>
    <span>{count}</span>
    <CommentIcon />
  </div>
)

const Likes = ({ count, isLiked }: { count: number, isLiked: boolean }) => (
  <div className={'flex flex-row items-center gap-[8px] parent transition-all duration-100'}>
    <span className={`${isLiked ? 'text-red':''}`}>{count}</span>
    <LikeIcon className='hover:fill-[#CD2740] child  transition' isLiked={isLiked} />
  </div>
)

export default PostCard
