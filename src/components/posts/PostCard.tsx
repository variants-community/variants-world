import { Picture } from 'components/common/Picture'
import { type Signal } from '@preact/signals'
import { TimePassed } from 'components/GameInfo/TimePassed'
import { cl } from 'utils/hepers'
import { prefetch } from 'astro:prefetch'
import CommentIcon from 'components/icons/CommentIcon'
import Likes from 'components/likes'
import PostTags from 'components/PostTags'
import PostTitle from 'components/PostTitle'
import PostUser from 'components/PostUser'
import type { GalleryView } from 'components/common/GalleryViewSwitch'
import type { PostForCard } from 'db/prisma/types'

type PostCardProps = {
  post: PostForCard
  userId: number
  view: Signal<GalleryView>
}

const PostCard = (props: PostCardProps) => {
  return (
    <>
      <a
        href={`/posts/${props.post.id}`}
        class={`w-11/12 flex mx-auto rounded-xl darkborder bg-border-light overflow-hidden flex-col sm:flex-row`}
        onMouseEnter={() => prefetch(`/posts/${props.post.id}`)}
      >
        <Picture
          fen={props.post.fen}
          id={props.post.id}
          class={cl(
            'mx-auto bg-border-light transition-[width,height] duration-100 max-w-82 w-full',
            props.view.value === 'large' ? 'sm:(w-55 h-55 min-w-55)' : 'sm:(w-16 h-16 min-w-16)'
          )}
        />
        <div
          class={cl(
            'w-full transition-[padding] duration-100 ',
            props.view.value === 'large'
              ? 'grid grid-rows-[1fr,auto] p-3 sm:p-5'
              : 'flex gap-2 overflow-hidden pb-2 pt-3 px-3'
          )}
        >
          <div
            class={cl(
              'flex gap-2 flex-col w-full',
              props.view.value === 'large' ? 'mb-2 sm:(gap-3 mb-7 mb-0)' : 'flex-1'
            )}
          >
            <div class={'relative flex justify-between'}>
              <PostTitle
                card
                postId={props.post.id}
                type={props.post.type}
                title={props.post.title}
                view={props.view}
                status={props.post.status}
              />
              {props.view.value === 'large' && (
                <div class={cl('absolute hidden sm:block right-0 top-[-14px]')}>
                  <TimePassed from={props.post.createdAt} />
                </div>
              )}
            </div>

            {props.view.value === 'large' && (
              <PostTags
                rules={props.post.gamerules.map(rule => rule.name)}
                class="text-text bg-dark border border-1 border-border-dark"
                ulclass="!sm:h-7 !text-sm !sm:text-sm !gap-[6px] !md:gap-[10px] !sm:gap-[4px]"
                iconsclass="fill-text"
              />
            )}
          </div>
          <div
            class={cl(
              'flex justify-between gap-x-2',
              props.view.value === 'large' ? 'flex-wrap items-center' : 'sm:w-60'
            )}
          >
            <PostUser username={props.post.author.username} profileUrl={props.post.author.profileUrl}>
              {props.view.value === 'compact' && <TimePassed from={props.post.createdAt} />}
            </PostUser>

            <div
              class={cl(
                'flex justify-end items-center sm:justify-end',
                props.view.value === 'large' ? 'sm:w-38 gap-3 sm:gap-5' : 'sm:w-22 gap-4'
              )}
            >
              {/* <StatusIndicator status={props.post.status} /> */}
              <Comments count={props.post.commentsCount} small={props.view.value === 'compact'} />
              <Likes
                likes={props.post.likes}
                postId={props.post.id}
                userId={props.userId}
                small={props.view.value === 'compact'}
              />
            </div>
          </div>
        </div>
      </a>
    </>
  )
}

const Comments = ({ count, small }: { count: number; small?: boolean }) => (
  <div class={cl('flex justify-end items-center', small ? 'text-base gap-1.5' : 'text-base sm:text-2xl gap-2')}>
    <span>{count}</span>
    <CommentIcon class={small ? 'w-3.5 h-3.5' : undefined} />
  </div>
)

export default PostCard
