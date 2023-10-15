import { EditButton } from 'components/EditButton'
import { StatusName } from 'components/GameStatusCard/StatusName'
import { Verdict } from 'components/GameStatusCard/Verdict'
import { statusToColor } from 'utils/hepers'
import { useEditMode } from 'src/hooks/use-edit-mode'
import { usePostStatus } from 'components/GameStatusCard/use-post-status'
import Bubbles from 'components/icons/Bubbles'
import type { GameStatus } from '@prisma/client'

type AcceptedCardProps = {
  displayEditBotton?: boolean
  verdict: string | null
  postId: number
  status: GameStatus
}

const GameStatusCard = (props: AcceptedCardProps) => {
  const { isEditMode, toggleEditMode } = useEditMode()

  const { verdict, changeVerdict, status, changeStatus } = usePostStatus(props.verdict, props.status, props.postId)

  return (
    <div
      class={`relative flex flex-row justify-between items-center text-center bg-border-light text-${statusToColor(
        status
      )} shadow-dark rounded-xl`}
      style={{ viewTransitionName: 'card-status' }}
    >
      <Bubbles class="ml-12 mt-8 mb-6 mr-0" color={statusToColor(status)} />
      <div class={'w-full mb-auto'}>
        <StatusName isEditMode={isEditMode} status={status} onChange={changeStatus} />
        <Verdict isEditMode={isEditMode} verdict={verdict} onChange={changeVerdict} />
      </div>
      <Bubbles class="mr-12 mt-8 mb-6 transform scale-x-inverse" color={statusToColor(status)} />
      {props.displayEditBotton && (
        <EditButton onClick={() => toggleEditMode()} class={'absolute bottom-[12px] right-[10px]'} />
      )}
    </div>
  )
}

export default GameStatusCard
