import { Input } from 'components/common/Input'
import { type ReadonlySignal, useComputed } from '@preact/signals'
import { cl, getValueFromEvent } from 'utils/hepers'
import StatusIcon from 'components/icons/StatusIcon'
import type { Color } from 'windi.config'
import type { GalleryView } from 'components/common/GalleryViewSwitch'
import type { GameStatus, GameType } from 'db/prisma/types'

type PostTitleProps = {
  postId: number
  isEditMode?: boolean
  onTypeChange?: (gameType: GameType) => void
  onTitleChange?: (title: string) => void
  onApply?: () => void
  type: string
  title: string
  card?: true
  view?: ReadonlySignal<GalleryView>
  status?: GameStatus
}

const PostTitle = (props: PostTitleProps) => {
  return (
    <div class={'flex flex-row items-center w-full text-white gap-2 sm:gap-4 font-semibold'}>
      {props.isEditMode ? (
        <select
          value={props.type}
          onChange={e => props.onTypeChange?.(getValueFromEvent<GameType>(e))}
          class="py-1 px-2 sm:(py-2 px-1.5) text-white bg-dark darkborder rounded outline-none appearance-none text-xl sm:text-2xl leading-none text-center"
        >
          <option value={'WOF'}>WoF</option>
          <option value={'NCV'}>NCV</option>
        </select>
      ) : (
        <h2
          class={useComputed(() =>
            cl(
              'relative flex bg-gray py-1 px-2 sm:(py-2 px-2.5) rounded leading-none',
              !props.card && 'cursor-default',
              !props.view || props.view.value === 'large' ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
            )
          )}
        >
          {props.type}
          {props.status && (
            <div class="absolute right-[-11px] top-[-8px]">
              <StatusIndicator status={props.status} />
            </div>
          )}
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
        <h1
          class={useComputed(() =>
            cl(
              'w-full text-nowrap',
              !props.view || props.view.value === 'large'
                ? 'text-xl md:text-3xl sm:text-2xl'
                : 'text-lg md:text-xl font-medium'
            )
          )}
        >
          {props.title}
        </h1>
      )}
    </div>
  )
}

export default PostTitle

const StatusIndicator = ({ status }: { status: GameStatus }) => {
  const colors: Record<GameStatus, Color> = {
    ACCEPTED: 'green',
    DECLINED: 'red',
    PENDING_REPLY: 'yellow',
    UNDER_REVIEW: 'blue'
  }
  return (
    <div class={'w-auto'}>
      <StatusIcon class={`fill-${colors[status]}`} />
    </div>
  )
}
