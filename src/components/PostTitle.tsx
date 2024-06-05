import { Input } from 'components/common/Input'
import { getValueFromEvent } from 'utils/hepers'
import type { GameType } from '@prisma/client'

type PostTitleProps = {
  postId: number
  isEditMode?: boolean
  onTypeChange?: (gameType: GameType) => void
  onTitleChange?: (title: string) => void
  onApply?: () => void
  type: string
  title: string
  card?: true
}

const PostTitle = (props: PostTitleProps) => {
  return (
    <div class={'flex flex-row items-center w-full text-white gap-2 sm:gap-4 font-semibold'}>
      {props.isEditMode ? (
        <select
          value={props.type}
          onChange={e => props.onTypeChange?.(getValueFromEvent<GameType>(e))}
          class=" py-1 px-2 sm:(py-2 px-1.5) text-white bg-dark darkborder rounded outline-none appearance-none text-xl sm:text-2xl leading-none text-center"
        >
          <option value={'WOF'}>WoF</option>
          <option value={'NCV'}>NCV</option>
        </select>
      ) : (
        <h2
          class={`flex bg-gray py-1 px-2 sm:(py-2 px-2.5) rounded text-xl sm:text-2xl leading-none ${
            !props.card && 'cursor-default'
          }`}
        >
          {props.type}
        </h2>
      )}
      {props.isEditMode ? (
        <Input
          value={props.title}
          onInput={e => props.onTitleChange?.(getValueFromEvent(e))}
          onCtrlEnter={props.onApply}
          class={'w-full bg-dark rounded outline-none text-xl text-3xl darkborder'}
        />
      ) : (
        <h1 class={'w-full text-xl md:text-3xl sm:text-2xl text-nowrap'}>{props.title}</h1>
      )}
    </div>
  )
}

export default PostTitle
