import { useEffect, useState } from 'preact/hooks'
import { supabase } from '../db/supabase/supabase'
import LikeIcon from './icons/LikeIcon'

type Like = {
  _count: {
    likedPosts: number;
    comments: number;
    voices: number;
    posts: number;
  };
  id: number;
};

type LikesProps = {
  likes: Like[];
  userId: number;
  postId: number;
};

const Likes = (props: LikesProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(
    props.likes.find((liker) => liker.id === props.userId) ? true : false,
  )
  const [likesCount, setLikesCount] = useState<number>(props.likes.length)

  useEffect(() => {
    supabase.from('_UserLikedPosts').select('*', { count: 'exact' }).eq(
      'A',
      props.postId,
    )
      .then((data) => setLikesCount(data.data?.length ?? 0))
  }, [isLiked])

  const toogleLike = async () => {
    console.log('toogle like')
    if (isLiked) {
      await supabase.from('_UserLikedPosts').delete().eq('A', props.postId).eq(
        'B',
        props.userId,
      )
    } else {await supabase.from('_UserLikedPosts').insert({
        A: props.postId,
        B: props.userId,
      }).eq('A', props.postId)}

    setIsLiked(!isLiked)
  }

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
