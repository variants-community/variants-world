import { Description } from 'components/GameInfo/Description'
import { EditButton } from 'components/EditButton'
import { TimePassed } from 'components/GameInfo/TimePassed'
import { actions } from 'astro:actions'
import { invalidatePrefetch } from 'utils/hepers'
import { supabase } from 'db/supabase/supabase'
import { useEditable } from 'components/common/use-editable'
import { usePostInfo } from 'components/GameInfo/use-post-info'
import PostTags from 'components/PostTags'
import PostTitle from 'components/PostTitle'
import PostUser from 'components/PostUser'
import type { GameType } from '@prisma/client'

type GameInfoProps = {
  displayEditBotton?: boolean
  postId: number
  type: GameType
  title: string
  rules: string[]
  username: string
  isUserLocked: boolean
  profileUrl?: string | null
  createdAt: Date
  description: string
  gameNrs: number[]
}

const GameInfo = (props: GameInfoProps) => {
  const data = {
    type: props.type,
    title: props.title,
    description: props.description
  }
  const { editable, update, editing } = useEditable(data, async value => {
    await supabase.from('Post').update(value).eq('id', props.postId)
    await actions.invalidate(['posts', `post-${props.postId}`])
    invalidatePrefetch()
  })
  usePostInfo(props.postId, update)

  return (
    <div
      class={
        'relative group w-full flex flex-col p-5 gap-5 sm:w-125 lg:(w-118 h-125) rounded-xl bg-border-light shadow-dark'
      }
      style={{ viewTransitionName: 'card-gameinfo' }}
    >
      <div class={'flex flex-col gap-4'}>
        <div class={'flex flex-row items-center justify-between gap-2'}>
          <div class={'flex flex-row items-center gap-4 w-full overflow-hidden'}>
            <PostTitle
              postId={props.postId}
              isEditMode={editing.value}
              type={editable.value.type}
              title={editable.value.title}
              onTypeChange={type => (editable.value.type = type)}
              onTitleChange={title => (editable.value.title = title)}
              onApply={editing.apply}
            />
          </div>

          <TimePassed from={props.createdAt} />
          {props.displayEditBotton && (
            <div class={'absolute top-0 right-1.5'}>
              <EditButton
                class={`${!editing.value && 'md:opacity-0'}
                group-hover:(opacity-100 delay-150) transition-opacity duration-100`}
                {...editing}
              />
            </div>
          )}
        </div>

        <PostTags
          postId={props.postId}
          isEditMode={editing.value}
          rules={props.rules}
          class="text-secondary"
          iconsclass="fill-secondary"
        />
      </div>

      <PostUser isLocked={props.isUserLocked} username={props.username} profileUrl={props.profileUrl} />

      {(editable.value.description.length > 0 || editing.value) && (
        <Description
          isEditMode={editing.value}
          value={editable.value.description}
          onDescriptionChange={description => (editable.value.description = description)}
        />
      )}

      <div class={'flex justify-end gap-x-1.5'}>
        {props.gameNrs.length > 1 &&
          props.gameNrs.map((gameNr, i) => (
            <a
              href={`https://www.chess.com/variants/game/${gameNr}`}
              class={'h-7 text-center content-center bg-gray text-text flex-1 rounded font-semibold text-[14px]'}
            >
              {i + 1}
            </a>
          ))}
        <a
          href={`https://www.chess.com/variants/game/${props.gameNrs[0]}`}
          class={'h-7 flex items-center bg-primary px-8 rounded text-white font-semibold text-[14px]'}
        >
          Try this variant
        </a>
      </div>
    </div>
  )
}

export default GameInfo
