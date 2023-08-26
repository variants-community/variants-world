import { Description } from 'components/GameInfo/Description'
import { EditButton } from 'components/EditButton'
import { LinkToVariant } from 'components/GameInfo/LinkToVariant'
import { TimePassed } from 'components/GameInfo/TimePassed'
import { useGameInfo } from 'components/GameInfo/use-game-info'
import { useState } from 'preact/hooks'
import PostTags from 'components/PostTags'
import PostTitle from 'components/PostTitle'
import PostUser from 'components/PostUser'

type GameInfoProps = {
  displayEditBotton?: boolean
  postId: number
  type: string
  title: string
  rules: string[]
  user: string
  createdAt: Date
  description: string
  variantLink: string
}

const GameInfo = (props: GameInfoProps) => {
  const [isEditMode, setIsEditMode] = useState(false)

  const {
    title,
    onTitleChange,
    type,
    onTypeChange,
    description,
    onDescriptionChange,
    variantLink,
    onVariantLinkChange
  } = useGameInfo(props)

  const toogleIsChangeable = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <div
      class={
        'w-full sm:w-[500px] lg:w-[474px] flex flex-col bg-border-light rounded-[12px] shadow-dark p-[20px] gap-[20px]'
      }
    >
      <div class={'flex flex-col gap-[10px]'}>
        <div class={'flex flex-row items-center justify-between'}>
          <div class={'flex flex-row items-center gap-[10px]'}>
            <PostTitle
              isEditMode={isEditMode}
              type={type}
              title={title}
              onTypeChange={onTypeChange}
              onTitleChange={onTitleChange}
            />

            {props.displayEditBotton && <EditButton onClick={() => toogleIsChangeable()} />}
          </div>

          <TimePassed from={props.createdAt} />
        </div>

        <PostTags
          postId={props.postId}
          isEditMode={isEditMode}
          rules={props.rules}
          class="text-secondary"
          iconsclass="fill-secondary"
        />
      </div>

      <PostUser user={props.user} />

      {(description.length > 0 || isEditMode) && (
        <Description isEditMode={isEditMode} value={description} onDescriptionChange={onDescriptionChange} />
      )}

      <div class={'flex flex-row justify-end mt-auto'}>
        <LinkToVariant isEditMode={isEditMode} value={variantLink} onVarianLinkChange={onVariantLinkChange} />
      </div>
    </div>
  )
}

export default GameInfo
