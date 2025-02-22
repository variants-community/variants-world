import { Picture } from 'components/common/Picture'
import { type Signal } from '@preact/signals'
import { TimePassed } from 'components/GameInfo/TimePassed'
import { cl } from 'utils/hepers'
import { navigate } from 'astro:transitions/client'
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
  const link = `/posts/${props.post.id}`

  const onClick = async (e: MouseEvent) => {
    e.preventDefault()
    navigate(link, { state: { from: location.pathname, search: location.search } })
  }

  return (
    <>
      <a
        href={link}
        class={cl(
          'flex rounded-xl darkborder bg-border-light overflow-hidden',
          props.view.value === 'grid' ? 'flex-col aspect-square w-58' : 'w-11/12 mx-auto flex-col sm:flex-row'
        )}
        onMouseEnter={() => prefetch(link)}
        onMouseDown={e => e.currentTarget.click()}
        onClick={onClick}
      >
        <Picture
          fen={props.post.fen}
          id={props.post.id}
          class={cl(
            'mx-auto bg-border-light transition-[width,height] duration-100',
            props.view.value === 'compact'
              ? 'max-w-82 w-full sm:(w-16 h-16 min-w-16)'
              : props.view.value === 'grid'
                ? 'w-full aspect-square'
                : 'max-w-82 w-full sm:(w-55 h-55 min-w-55)'
          )}
        />
        <div
          class={cl(
            'w-full transition-[padding] duration-100',
            props.view.value === 'compact'
              ? 'flex gap-2 overflow-hidden pb-2 pt-3 px-3'
              : props.view.value === 'grid'
                ? 'flex flex-col justify-between p-3 flex-1'
                : 'grid grid-rows-[1fr,auto] p-3 sm:p-5'
          )}
        >
          <div
            class={cl(
              'flex gap-2 flex-col w-full',
              props.view.value === 'compact'
                ? 'flex-1'
                : props.view.value === 'grid'
                  ? 'mb-1'
                  : 'mb-2 sm:(gap-3 mb-7 mb-0)'
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
              {props.view.value !== 'compact' && props.view.value !== 'grid' && (
                <div class={cl('absolute hidden sm:block right-0 top-[-8px]')}>
                  <TimePassed from={props.post.createdAt} />
                </div>
              )}
            </div>

            {props.view.value !== 'compact' && props.view.value !== 'grid' && (
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
              'justify-between gap-x-2',
              props.view.value === 'compact'
                ? 'flex sm:w-60'
                : props.view.value === 'grid'
                  ? 'grid grid-cols-[1fr,auto]'
                  : 'flex flex-wrap items-center'
            )}
          >
            <PostUser isLocked={!!props.post.author.lockedUntil} username={props.post.author.username} profileUrl={props.post.author.profileUrl}>
              {props.view.value === 'compact' && <TimePassed from={props.post.createdAt} />}
            </PostUser>

            <div
              class={cl(
                'flex justify-end items-center sm:justify-end',
                props.view.value === 'compact'
                  ? 'sm:w-22 gap-4'
                  : props.view.value === 'grid'
                    ? 'gap-2'
                    : 'sm:w-38 gap-3 sm:gap-5'
              )}
            >
              <Comments
                count={props.post.commentsCount}
                small={props.view.value === 'compact'}
                medium={props.view.value === 'grid'}
              />
              <Likes
                likes={props.post.likes}
                postId={props.post.id}
                userId={props.userId}
                small={props.view.value === 'compact'}
                medium={props.view.value === 'grid'}
              />
            </div>
          </div>
        </div>
      </a>
    </>
  )
}

const Comments = ({ count, small, medium }: { count: number; small?: boolean; medium?: boolean }) => (
  <div
    class={cl(
      'flex justify-end items-center',
      small ? 'text-base gap-1.5' : medium ? 'text-base sm:text-lg gap-2' : 'text-base sm:text-2xl gap-2'
    )}
  >
    <span>{count}</span>
    <CommentIcon class={small ? 'w-3.5 h-3.5' : medium ? 'w-4 h-4' : undefined} />
  </div>
)

export default PostCard
