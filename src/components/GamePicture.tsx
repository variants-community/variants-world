import Likes from './Likes'

type Like = {
  _count: {
    likedPosts: number;
    comments: number;
    voices: number;
    posts: number;
  };
  id: number;
 }

type GamePictureProps = {
  likes: Like[];
  postId: number;
  userId: number;
};

const GamePicture = ({ likes, postId, userId }: GamePictureProps) => {
  return (
    <div className={'relative'}>
      <div
        className={' w-[500px] h-[500px] flex items-center justify-center border-[2px] border-border-dark bg-border-light shadow-dark rounded-[12px] min-w-[500px] overflow-hidden'}
      >
        <img src="/src/assets/images/game.png" alt="" className={''} />
        <div
          className={'absolute bg-border-light rounded-full bottom-[-8px] p-[13px] right-[-6px] shadow-dark'}
        >
          <Likes likes={likes} postId={postId} userId={userId} />
        </div>
      </div>
    </div>
  )
}

export default GamePicture
