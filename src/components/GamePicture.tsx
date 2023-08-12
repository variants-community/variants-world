import type { PostOnUserLikes } from '@prisma/client'
import Likes from './Likes'


type GamePictureProps = {
  likes: PostOnUserLikes[];
  postId: number;
  userId: number;
};

const GamePicture = (props: GamePictureProps) => {
  return (
    <div className={'relative h-[500px]'}>
      <div
        className={' w-[500px] h-[500px] flex items-center justify-center border-[2px] border-border-dark bg-border-light shadow-dark rounded-[12px] min-w-[500px] overflow-hidden'}
      >
        <img src="/src/assets/images/game.png"/>
        <div
          className={'absolute bg-border-light rounded-full bottom-[-8px] p-[13px] right-[-6px] shadow-dark'}
        >
          <Likes likes={props.likes} postId={props.postId} userId={props.userId} />
        </div>
      </div>
    </div>
  )
}

export default GamePicture
