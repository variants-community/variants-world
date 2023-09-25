import { getValueFromEvent } from 'utils/hepers'
import type { GameType } from '@prisma/client'

type PostTitleProps = {
  postId: number
  isEditMode?: boolean
  onTypeChange?: (gameType: GameType) => void
  onTitleChange?: (title: string) => void
  type: string
  title: string
  linkTo?: string
}

const PostTitle = (props: PostTitleProps) => {
  return (
    <div class={'flex flex-row items-center text-white gap-2 sm:gap-4 font-semibold'}>
      {props.isEditMode ? (
        <select
          value={props.type}
          onChange={e => props.onTypeChange?.(getValueFromEvent<GameType>(e))}
          class={'bg-gray py-[4px] px-[5px] sm:(py-[7px] px-[10px]) rounded outline-none text-[20px] sm:text-[24px]'}
        >
          <option value={'WOF'}>WOF</option>
          <option value={'NCV'}>NCV</option>
        </select>
      ) : (
        <h1 class={'bg-gray py-[4px] px-[5px] sm:(py-[9px] px-[15px]) rounded text-[20px] sm:text-[24px]'}>
          {props.type}
        </h1>
      )}
      {props.isEditMode ? (
        <input
          value={props.title}
          onChange={e => props.onTitleChange?.(getValueFromEvent(e))}
          class={'w-full bg-dark rounded outline-none text-[22px] text-[28px]'}
        />
      ) : (
        <a href={props.linkTo} class={'text-[22px] sm:text-[28px]'}>
          {props.title}
        </a>
      )}
    </div>
  )
}

export default PostTitle
