import { useEffect, useState } from 'preact/hooks'
import { supabase } from '../db/supabase/supabase'
import LikeIcon from './icons/LikeIcon'
import type { PostOnUserLikes } from '@prisma/client'
import {
  getLikesCountQuery,
  isPostLikedByUserQuery,
  putLikeQuery,
  removeLikeQuery,
} from '../db/supabase/queries'

type LikesProps = {
  likes: PostOnUserLikes[];
  userId: number;
  postId: number;
};

const Likes = (props: LikesProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(
    props.likes.find((like) => like.userId === props.userId) ? true : false,
  )
  const [likesCount, setLikesCount] = useState<number>(props.likes.length)

  const updateLiksCount = async () => {
    const count = await getLikesCountQuery(props.postId)
    setLikesCount(count)
  }

  useEffect(() => {
    const channel = supabase.channel('likes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'PostOnUserLikes',
          filter: `postId=eq.${props.postId}`,
        },
        async () => {
          await updateLiksCount()
        },
      ).on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'PostOnUserLikes',
          filter: `postId=eq.${props.postId}`,
        },
        async () => {
          await updateLiksCount()
        },
      ).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const toogleLike = async () => {
    // for expirience, we immediately change state
    // but after will be set correctly
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    setIsLiked(!isLiked)

    if (await isPostLikedByUserQuery(props.postId, props.userId)) {
      const ok = await removeLikeQuery(props.postId, props.userId)
      setIsLiked(ok ? false : true)
    } else {
      const ok = await putLikeQuery(props.postId, props.userId)
      setIsLiked(ok)
    }

    await updateLiksCount()
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
