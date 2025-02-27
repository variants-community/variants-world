import { cl, formatLikesCount } from 'utils/hepers'
import { useLikes } from 'components/likes/use-likes'
import LikeIcon from 'components/icons/LikeIcon'

type LikesProps = {
  likes: { userId: number }[]
  userId: number
  postId: number
  clickable?: boolean
  small?: boolean
  medium?: boolean
}

const Likes = (props: LikesProps) => {
  const { isLiked, likesCount, toogleLike } = useLikes(props.likes, props.userId, props.postId)

  return (
    <div
      onClick={async () => props.clickable && toogleLike()}
      aria-hidden="true"
      class={cl(
        'flex group items-center justify-end whitespace-nowrap cursor-pointer',
        props.clickable && 'bg-border-light rounded-full py-2 px-3.6 shadow-dark',
        props.small ? 'gap-1.5' : props.medium ? 'gap-1.5' : 'gap-2'
      )}
    >
      <span
        class={cl(
          'select-none',
          props.small ? 'text-base' : props.medium ? 'text-base sm:text-lg' : 'text-base sm:text-2xl',
          isLiked ? 'text-red font-medium' : 'text-text'
        )}
      >
        {formatLikesCount(likesCount)}
      </span>

      <LikeIcon
        // class={props.clickable ? 'group-hover:fill-red transition-colors duration-100' : ''}
        isLiked={isLiked}
        class={props.small ? 'w-3.5 h-3.5' : props.medium ? 'w-4 h-4' : undefined}
      />
    </div>
  )
}

export default Likes
