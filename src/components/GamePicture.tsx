import { useEffect, useState } from 'preact/hooks'
import { supabase } from '../db/supabase/supabase'
import LikeIcon from './icons/LikeIcon'

type GamePictureProps = {
  likes: {
    _count: {
      likedPosts: number;
      comments: number;
      voices: number;
      posts: number;
    };
    id: number;
  }[];
  postId: number;
  userId: number;
};

const GamePicture = ({ likes, postId, userId }: GamePictureProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(
    likes.find((liker) => liker.id === userId) ? true : false,
  )
  const [likesCount, setLikesCount] = useState<number>(likes.length)

  useEffect(() => {
    supabase.from('_UserLikedPosts').select('*', { count: 'exact' }).eq(
      'A',
      postId,
    )
      .then((data) => setLikesCount(data.data?.length ?? 0))
  }, [isLiked])

  const toogleLike = async () => {
    if (isLiked) {
      await supabase.from('_UserLikedPosts').delete().eq('A', postId).eq('B', userId)
    } else {await supabase.from('_UserLikedPosts').insert({
        A: postId,
        B: userId,
      }).eq('A', postId)}

    setIsLiked(!isLiked)
  }
  return (
    <div className={'relative'}>
      <div
        className={' w-[500px] h-[500px] flex items-center justify-center border-[2px] border-border-dark bg-border-light shadow-dark rounded-[12px] min-w-[500px] overflow-hidden'}
      >
        <img src="/src/assets/images/game.png" alt="" className={''} />
        <div
          className={'absolute bg-border-light rounded-full bottom-[-8px] right-[-6px] shadow-dark'}
        >
          <div
            onClick={() => toogleLike()}
            aria-hidden="true"
            className={'flex flex-row whitespace-nowrap gap-[8px] p-[13px] parent transition-all duration-100'}
          >
            <span className={`text-[22px] ${isLiked ? 'text-red' : ''}`}>
              {likesCount}
            </span>

            <LikeIcon
              className="child hover:fill-red transition duration-100"
              isLiked={isLiked}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePicture
