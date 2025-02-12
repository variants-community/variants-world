import { Input } from 'components/common/Input'
import { type ReadonlySignal } from '@preact/signals'
import { StatusIndicator } from 'components/posts/StatusIndicator'
import { cl, getValueFromEvent } from 'utils/hepers'
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
    <div
      class={cl(
        'flex items-center w-full text-white font-semibold',
        props.view?.value === 'grid' ? 'gap-2' : 'gap-3 sm:gap-4'
      )}
    >
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
          class={cl(
            'relative flex bg-gray py-1 px-2 sm:(py-2 px-2.5) rounded leading-none',
            !props.card && 'cursor-default',
            !props.view || props.view.value === 'compact' ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl',
            props.view?.value === 'grid' && 'text-base sm:text-lg'
          )}
        >
          {props.type}
          {props.status && (
            <div
              class={cl(
                'absolute',
                props.view?.value === 'grid' ? 'right-[-8px] bottom-[-8px]' : 'right-[-11px] top-[-8px]'
              )}
            >
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
          class={cl(
            'w-full text-nowrap',
            !props.view || props.view.value === 'compact'
              ? 'break-words text-lg md:text-xl font-medium leading-6'
              : props.view.value === 'grid'
                ? 'overflow-hidden whitespace-nowrap text-ellipsis text-lg md:text-xl font-medium leading-6'
                : 'text-xl md:text-3xl sm:text-2xl leading-6'
          )}
        >
          {props.title}
        </h1>
      )}
    </div>
  )
}

export default PostTitle
