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
  return (
    <>
      <div
        class={
          'flex mx-auto w-11/12 sm:mx-0 sm:w-auto flex-col sm:flex-row rounded-[12px] overflow-hidden bg-border-light border border-[2px] border-border-dark'
        }
      >
        <img src="/src/assets/images/game.png" alt={props.post.title} class="sm:(w-[220px] h-[220px] min-w-[220px])" />
        <div class={'w-full flex flex-col justify-between p-[20px] '}>
          <div class={'flex flex-col gap-[10px] mb-[30px] sm:mb-0'}>
            <div class={'flex flex-row justify-between'}>
              <PostTitle linkTo={`/posts/${props.post.id}`} type={props.post.type} title={props.post.title} />
              <div class={'hidden sm:block'}>
                <TimePassed from={props.post.createdAt} />
              </div>
            </div>

            <PostTags
              rules={props.post.gamerules.map(rule => rule.name)}
              class="text-text bg-dark border border-[0.4px] border-border-dark"
              iconsclass="fill-text"
            />
          </div>
          <div class={'flex gap-[20px] sm:gap-0 flex-col sm:flex-row justify-between'}>
            <div class={'flex flex-row justify-between items-center'}>
              <PostUser user={props.post.author.name} />
              <div class={'block sm:hidden'}>
                <TimePassed from={props.post.createdAt} />
              </div>
            </div>

            <div class={'w-full sm:w-[150px] flex flex-row justify-between sm:justify-end text-[22px] gap-[15px]'}>
              <div class={'mr-auto'}>
                <Status status={props.post.status} />
              </div>
              <div class={' sm:w-min-[70px]'}>
                <Comments count={props.post.commentsCount} />
              </div>
              <div class={' sm:w-min-[70px]'}>
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
  <div class={'w-auto'}>
    {status === 'ACCEPTED' ? (
      <StatusIcon class="fill-green" />
    ) : status === 'DECLINED' ? (
      <StatusIcon class="fill-red" />
    ) : status === 'PENDING_REPLY' ? (
      <StatusIcon class="fill-blue" />
    ) : (
      <StatusIcon class="fill-yellow" />
    )}
  </div>
)

const Comments = ({ count }: { count: number }) => (
  <div class={'flex flex-row justify-end items-center gap-[8px]'}>
    <span>{count}</span>
    <CommentIcon />
  </div>
)

export default PostCard
