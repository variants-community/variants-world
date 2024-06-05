import { Picture } from 'components/common/Picture'
import { TimePassed } from 'components/GameInfo/TimePassed'
import CommentIcon from 'components/icons/CommentIcon'
import Likes from 'components/likes'
import PostTags from 'components/PostTags'
import PostTitle from 'components/PostTitle'
import PostUser from 'components/PostUser'
import StatusIcon from 'components/icons/StatusIcon'
import type { Color } from 'windi.config'
import type { GameStatus } from '@prisma/client'
import type { PostForCard } from 'db/prisma/queries'

type PostCardProps = {
  post: PostForCard
  userId: number
}

const PostCard = (props: PostCardProps) => {
  return (
    <>
      <a
        href={`/posts/${props.post.id}`}
        class={`w-11/12 flex mx-auto rounded-xl darkborder bg-border-light overflow-hidden flex-col sm:flex-row`}
      >
        <Picture
          fen={props.post.fen}
          id={props.post.id}
          class={'max-w-82 mx-auto w-full sm:(w-55 h-55 min-w-55) bg-border-light'}
        />
        <div class={'w-full flex flex-col justify-between p-3 sm:p-5 '}>
          <div class={'flex flex-col gap-2 mb-2 sm:(gap-3 mb-7 mb-0)'}>
            <div class={'flex justify-between'}>
              <PostTitle card postId={props.post.id} type={props.post.type} title={props.post.title} />
              <div class={'hidden sm:block'}>
                <TimePassed from={props.post.createdAt} />
              </div>
            </div>

            <PostTags
              rules={props.post.gamerules.map(rule => rule.name)}
              class="text-text bg-dark border border-1 border-border-dark"
              ulclass="!sm:h-7 !text-sm !sm:text-sm !gap-1 !sm:gap-[10px]"
              iconsclass="fill-text"
            />
          </div>
          <div class={'flex flex-wrap justify-between'}>
            <div class={'flex justify-between items-center'}>
              <PostUser username={props.post.author.username} profileUrl={props.post.author.profileUrl} />
            </div>

            <div class={'sm:w-38 flex justify-end items-center sm:justify-end ml-auto gap-3 sm:gap-5'}>
              <StatusIndicator status={props.post.status} />
              <Comments count={props.post.commentsCount} />
              <Likes likes={props.post.likes} postId={props.post.id} userId={props.userId} />
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
  <div class={'flex justify-end items-center gap-2 text-[16px] sm:text-[22px]'}>
    <span>{count}</span>
    <CommentIcon />
  </div>
)

export default PostCard
