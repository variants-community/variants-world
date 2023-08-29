import { EditButton } from 'components/EditButton'
import { StatusName } from 'components/GameStatusCard/StatusName'
import { Verdict } from 'components/GameStatusCard/Verdict'
import { statusToColor } from 'utils/hepers'
import { usePostStatus } from 'components/GameStatusCard/use-post-status'
import { useSignal } from '@preact/signals'
import Bubbles from 'components/icons/Bubbles'
import type { GameStatus } from '@prisma/client'

type AcceptedCardProps = {
  displayEditBotton?: boolean
  verdict: string | null
  postId: number
  status: GameStatus
}

const GameStatusCard = (props: AcceptedCardProps) => {
  const isEditMode = useSignal(false)

  const toogleIsChangeable = () => {
    isEditMode.value = !isEditMode.value
  }

  const { verdict, changeVerdict, status, changeStatus } = usePostStatus(props.verdict, props.status, props.postId)

  return (
    <div
      class={`relative flex flex-row justify-between items-center text-center bg-border-light text-${statusToColor(
        status
      )} shadow-dark rounded-xl`}
    >
      <Bubbles class="ml-12 mt-11 mb-5 mr-0" color={statusToColor(status)} />
      <div class={'w-full mb-auto'}>
        <StatusName isEditMode={isEditMode.value} status={status} onChange={changeStatus} />
        <Verdict isEditMode={isEditMode.value} verdict={verdict} onChange={changeVerdict} />
      </div>
      <Bubbles class="mr-12 mt-11 mb-5 transform scale-x-inverse" color={statusToColor(status)} />
      {props.displayEditBotton && (
        <EditButton onClick={() => toogleIsChangeable()} class={'absolute bottom-[12px] right-[10px]'} />
      )}
    </div>
  )
}

export default GameStatusCard
