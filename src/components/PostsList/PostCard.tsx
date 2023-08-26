import { TimePassed } from 'components/GameInfo/TimePassed'
import CommentIcon from 'components/icons/CommentIcon'
import Likes from 'components/Likes'
import PostTags from 'components/PostTags'
import PostTitle from 'components/PostTitle'
import PostUser from 'components/PostUser'
import StatusIcon from 'components/icons/StatusIcon'
import type { GameStatus } from '@prisma/client'
import type { PostForCard } from 'db/prisma/queries'
// import { isMobile } from 'react-device-detect' // 10 kb жесть......

type PostCardProps = {
  post: PostForCard
  userId: number
}

const PostCard = (props: PostCardProps) => {
  console.log(typeof props.post.createdAt)
  return (
    <>
      <div
        className={
          'flex mx-auto w-11/12 sm:mx-0 sm:w-auto flex-col sm:flex-row rounded-[12px] overflow-hidden bg-border-light border border-[2px] border-border-dark'
        }
      >
        <img src="/src/assets/images/game.png" alt={props.post.title} className={'sm:w-[220px] sm:h-[220px]'} />
        <div className={'w-full flex flex-col justify-between p-[20px] '}>
          <div className={'flex flex-col gap-[10px] mb-[30px] sm:mb-0'}>
            <div className={'flex flex-row justify-between'}>
              <PostTitle linkTo={`/posts/${props.post.id}`} type={props.post.type} title={props.post.title} />
              <div className={'hidden sm:block'}>
                <TimePassed from={props.post.createdAt} />
              </div>
            </div>

            <PostTags
              rules={props.post.gamerules.map(rule => rule.name)}
              className="text-text bg-dark border border-[0.4px] border-border-dark"
              iconsClassName="fill-text"
            />
          </div>
          <div className={'flex gap-[20px] sm:gap-0 flex-col sm:flex-row justify-between'}>
            <div className={'flex flex-row justify-between items-center'}>
              <PostUser user={props.post.author.name} />
              <div className={'block sm:hidden'}>
                <TimePassed from={props.post.createdAt} />
              </div>
            </div>

            <div className={'w-full sm:w-[150px] flex flex-row justify-between sm:justify-end text-[22px] gap-[15px]'}>
              <div className={'mr-auto'}>
                <Status status={props.post.status} />
              </div>
              <div className={' sm:w-min-[70px]'}>
                <Comments count={props.post.commentsCount} />
              </div>
              <div className={' sm:w-min-[70px]'}>
                <Likes likes={props.post.likes} postId={props.post.id} userId={props.userId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Status = ({ status }: { status: GameStatus }) => (
  <div className={'w-auto'}>
    {status === 'ACCEPTED' ? (
      <StatusIcon className="fill-green" />
    ) : status === 'DECLINED' ? (
      <StatusIcon className="fill-red" />
    ) : status === 'PENDING_REPLY' ? (
      <StatusIcon className="fill-blue" />
    ) : (
      <StatusIcon className="fill-yellow" />
    )}
  </div>
)

const Comments = ({ count }: { count: number }) => (
  <div className={'flex flex-row justify-end items-center gap-[8px]'}>
    <span>{count}</span>
    <CommentIcon />
  </div>
)

export default PostCard
