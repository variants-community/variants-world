import LikeIcon from './icons/LikeIcon'

const GamePicture = ({isLiked}: {isLiked?: boolean}) => (
 <div className={'relative'}>
  <div
    className={' w-[500px] h-[500px] flex items-center justify-center border-[2px] border-border-dark bg-border-light shadow-dark rounded-[12px] min-w-[500px] overflow-hidden'}
  >
    <img src="/src/assets/images/game.png" alt="" className={''} />
    <div
      className={'absolute bg-border-light rounded-full bottom-[-8px] right-[-6px] shadow-dark'}
    >
     <div className={'flex flex-row whitespace-nowrap gap-[8px] p-[13px] parent transition-all duration-100'}>
        <span className={`text-[22px] ${isLiked ? 'text-red' : ''}`}>13</span>
        <LikeIcon className='child hover:fill-red transition duration-100' isLiked={isLiked} />
      </div>
    </div>
  </div>
  </div>
)

export default GamePicture
