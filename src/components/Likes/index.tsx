import { formatLikesCount } from 'utils/hepers'
import { useLikes } from 'components/Likes/use-likes'
import LikeIcon from 'components/icons/LikeIcon'

type LikesProps = {
  likes: { userId: number }[]
  userId: number
  postId: number
}

const Likes = (props: LikesProps) => {
  const { isLiked, likesCount, toogleLike } = useLikes(props.likes, props.userId, props.postId)

  return (
    <div
      onClick={async () => toogleLike()}
      aria-hidden="true"
      class={'flex flex-row justify-end whitespace-nowrap gap-[8px] parent transition-all duration-100'}
    >
      <span class={`text-[22px] ${isLiked ? 'text-red' : 'text-text'}`}>{formatLikesCount(likesCount)}</span>

      <LikeIcon class="child hover:fill-red transition duration-100" isLiked={isLiked} />
    </div>
  )
}

export default Likes
