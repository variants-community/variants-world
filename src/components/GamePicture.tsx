import Likes from 'components/Likes'
import type { PostOnUserLikes } from '@prisma/client'

type GamePictureProps = {
  likes: PostOnUserLikes[]
  postId: number
  userId: number
}

const GamePicture = (props: GamePictureProps) => {
  return (
    <div class={'w-full relative sm:(h-[500px] sm:w-[500px])'}>
      <div
        class={
          'w-full sm:(w-[500px] h-[500px]) flex items-center justify-center border-[2px] border-border-dark bg-border-light shadow-dark rounded-[12px] overflow-hidden'
        }
      >
        <img src="/src/assets/images/game.png" />
        <div class={'absolute bg-border-light rounded-full bottom-[-8px] p-[13px] right-[-6px] shadow-dark'}>
          <Likes likes={props.likes} postId={props.postId} userId={props.userId} />
        </div>
      </div>
    </div>
  )
}

export default GamePicture
