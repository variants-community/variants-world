import { formatLikesCount } from 'utils/hepers'
import { useLikes } from 'components/likes/use-likes'
import LikeIcon from 'components/icons/LikeIcon'

type LikesProps = {
  likes: { userId: number }[]
  userId: number
  postId: number
  clickable?: boolean
}

const Likes = (props: LikesProps) => {
  const { isLiked, likesCount, toogleLike } = useLikes(props.likes, props.userId, props.postId)

  return (
    <div
      onClick={async () => props.clickable && toogleLike()}
      aria-hidden="true"
      class={`flex group items-center justify-end gap-2 whitespace-nowrap cursor-pointer ${
        props.clickable && 'bg-border-light rounded-full py-2 px-3.6 shadow-dark'
      }`}
    >
      <span class={`text-xl sm:text-2xl select-none ${isLiked ? 'text-red font-medium' : 'text-text'}`}>
        {formatLikesCount(likesCount)}
      </span>

      <LikeIcon
        // class={props.clickable ? 'group-hover:fill-red transition-colors duration-100' : ''}
        isLiked={isLiked}
      />
    </div>
  )
}

export default Likes
