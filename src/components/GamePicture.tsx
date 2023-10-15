import { Picture } from 'components/landing/Picture'
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
        <Picture fen={props.fen} id={props.postId} class={'rounded-xl bg-border-light'} />
        <div class={'absolute bottom-[-8px] right-[-6px]'} style={{ viewTransitionName: 'card-likes' }}>
          <Likes clickable likes={props.likes} postId={props.postId} userId={props.userId} />
        </div>
      </div>
    </div>
  )
}

export default GamePicture
