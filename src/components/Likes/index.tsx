import LikeIcon from '../icons/LikeIcon'
import type { PostOnUserLikes } from '@prisma/client'
import { useLikes } from './useLikes'

type LikesProps = {
  likes: PostOnUserLikes[];
  userId: number;
  postId: number;
};

const Likes = (props: LikesProps) => {
  const { isLiked, likesCount, toogleLike } = useLikes(
    props.likes,
    props.userId,
    props.postId,
  )

  return (
    <div
      onClick={() => toogleLike()}
      aria-hidden="true"
      className={'flex flex-row justify-end whitespace-nowrap gap-[8px] parent transition-all duration-100'}
    >
      <span className={`text-[22px] ${isLiked ? 'text-red' : ''}`}>
        {likesCount}
      </span>

      <LikeIcon
        className="child hover:fill-red transition duration-100"
        isLiked={isLiked}
      />
    </div>
  )
}

export default Likes
