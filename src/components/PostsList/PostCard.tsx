import { TimePassed } from 'components/GameInfo/TimePassed'
import CommentIcon from 'components/icons/CommentIcon'
import Likes from 'components/Likes'
import PostTags from 'components/PostTags'
import PostTitle from 'components/PostTitle'
import PostUser from 'components/PostUser'
import StatusIcon from 'components/icons/StatusIcon'
import type { Color } from 'windi.config'
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
      <a
        href={`/posts/${props.post.id}`}
        class={'w-11/12 flex flex-col sm:flex-row mx-auto rounded-xl darkborder bg-border-light overflow-hidden'}
      >
        <img src="/src/assets/images/game.png" alt={props.post.title} class="sm:(w-55 h-55 min-w-55)" />
        <div class={'w-full flex flex-col justify-between p-5 '}>
          <div class={'flex flex-col gap-[10px] mb-[30px] sm:mb-0'}>
            <div class={'flex flex-row justify-between'}>
              <PostTitle type={props.post.type} title={props.post.title} />
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
          <div class={'flex gap-5 sm:gap-0 flex-col sm:flex-row justify-between'}>
            <div class={'flex flex-row justify-between items-center'}>
              <PostUser user={props.post.author.name} />
              <div class={'block sm:hidden'}>
                <TimePassed from={props.post.createdAt} />
              </div>
            </div>

            <div class={'w-full sm:w-38 flex flex-row justify-between sm:justify-end text-[22px] gap-4'}>
              <div class={'mr-auto'}>
                <StatusIndicator status={props.post.status} />
              </div>
              <div class={'sm:w-min-18'}>
                <Comments count={props.post.commentsCount} />
              </div>
              <div class={'sm:w-min-18'}>
                <Likes likes={props.post.likes} postId={props.post.id} userId={props.userId} />
              </div>
            </div>
          </div>
        </div>
      </a>
    </>
  )
}

const StatusIndicator = ({ status }: { status: GameStatus }) => {
  const colors: Record<GameStatus, Color> = {
    ACCEPTED: 'green',
    DECLINED: 'red',
    PENDING_REPLY: 'yellow',
    UNDER_REVIEW: 'blue'
  }
  return (
    <div class={'w-auto'}>
      <StatusIcon class={`fill-${colors[status]}`} />
    </div>
  )
}

const Comments = ({ count }: { count: number }) => (
  <div class={'flex flex-row justify-end items-center gap-2'}>
    <span>{count}</span>
    <CommentIcon />
  </div>
)

export default PostCard
