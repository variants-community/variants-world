import { Description } from 'components/GameInfo/Description'
import { EditButton } from 'components/EditButton'
import { LinkToVariant } from 'components/GameInfo/LinkToVariant'
import { TimePassed } from 'components/GameInfo/TimePassed'
import { useEditMode } from 'src/hooks/use-edit-mode'
import { useGameInfo } from 'components/GameInfo/use-game-info'
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
  gameNr: number
}

const GameInfo = (props: GameInfoProps) => {
  const { isEditMode, toggleEditMode } = useEditMode()

  const { title, type, description, changeTitle, changeType, changeDescription } = useGameInfo(props)

  return (
    <div class={'w-full flex flex-col p-5 gap-5 sm:w-125 lg:w-118 rounded-xl bg-border-light shadow-dark '}>
      <div class={'flex flex-col gap-[10px]'}>
        <div class={'flex flex-row items-center justify-between'}>
          <div class={'flex flex-row items-center gap-[10px]'}>
            <PostTitle
              isEditMode={isEditMode}
              type={type}
              title={title}
              onTypeChange={changeType}
              onTitleChange={changeTitle}
            />

            {props.displayEditBotton && <EditButton onClick={() => toggleEditMode()} />}
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
        <Description isEditMode={isEditMode} value={description} onDescriptionChange={changeDescription} />
      )}

      <div class={'flex flex-row justify-end mt-auto'}>
        <LinkToVariant value={`https://www.chess.com/variants/game/${props.gameNr}`} />
      </div>
    </div>
  )
}

export default GameInfo
