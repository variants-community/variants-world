import { getGamePictureUrl } from 'utils/hepers'
import Likes from 'components/likes'
import type { PostOnUserLikes } from '@prisma/client'

type GamePictureProps = {
  likes: PostOnUserLikes[]
  fen: string
  postId: number
  userId: number
}

const GamePicture = (props: GamePictureProps) => {
  return (
    <div class={'w-full relative sm:(h-125 sm:w-125)'}>
      <div
        class={
          'w-full sm:(w-125 h-125) flex items-center justify-center darkborder bg-border-light shadow-dark rounded-xl overflow-hidden'
        }
      >
        <img src={getGamePictureUrl(props.fen)} />
        <div class={'absolute bg-border-light rounded-full bottom-[-8px] p-[13px] right-[-6px] shadow-dark'}>
          <Likes clickable likes={props.likes} postId={props.postId} userId={props.userId} />
        </div>
      </div>
    </div>
  )
}

export default GamePicture
