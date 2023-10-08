import { getValueFromEvent } from 'utils/hepers'
import type { GameType } from '@prisma/client'

type PostTitleProps = {
  postId: number
  isEditMode?: boolean
  onTypeChange?: (gameType: GameType) => void
  onTitleChange?: (title: string) => void
  type: string
  title: string
  card?: true
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
        <h1
          class={`bg-gray py-1 px-2 sm:(py-2 px-4) rounded text-xl sm:text-2xl leading-none ${
            !props.card && 'cursor-default'
          }`}
        >
          {props.type}
        </h1>
      )}
      {props.isEditMode ? (
        <input
          value={props.title}
          onChange={e => props.onTitleChange?.(getValueFromEvent(e))}
          class={'w-full bg-dark rounded outline-none text-xl text-3xl'}
        />
      ) : (
        <span class={'text-xl sm:text-3xl'}>{props.title}</span>
      )}
    </div>
  )
}

export default PostTitle
