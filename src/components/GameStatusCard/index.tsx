import { EditButton } from 'components/EditButton'
import { StatusName } from 'components/GameStatusCard/StatusName'
import { Verdict } from 'components/GameStatusCard/Verdict'
import { getValueFromEvent, statusToColor } from 'utils/hepers'
import { supabase } from 'db/supabase/supabase'
import { usePostStatus } from 'components/GameStatusCard/use-post-status'
import { useState } from 'preact/hooks'
import Bubbles from 'components/icons/Bubbles'
import type { GameStatus } from '@prisma/client'

type AcceptedCardProps = {
  displayEditBotton?: boolean
  verdict: string | null
  postId: number
  status: GameStatus
}

const GameStatusCard = (props: AcceptedCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false)

  const toogleIsChangeable = () => {
    setIsEditMode(!isEditMode)
  }

  const { verdict, status } = usePostStatus(props.verdict, props.status, props.postId)

  const onStatusChange = async (e: Event) => {
    const newStatus = getValueFromEvent<GameStatus>(e)
    await supabase.from('Post').update({ status: newStatus }).eq('id', props.postId)
  }

  const onVerdictChange = async (e: Event) => {
    const newVerdict = getValueFromEvent<string>(e)
    await supabase.from('Post').update({ verdict: newVerdict }).eq('id', props.postId)
  }

  return (
    <div
      class={`relative flex flex-row justify-between items-center text-center bg-border-light text-${statusToColor(
        status
      )} shadow-dark rounded-[12px]`}
    >
      <Bubbles class="ml-[48px] mt-[45px] mb-[20px] mr-0" color={statusToColor(status)} />
      <div class={'block w-full'}>
        <StatusName isEditMode={isEditMode} status={status} onChange={onStatusChange} />
        <Verdict isEditMode={isEditMode} verdict={verdict} onChange={onVerdictChange} />
      </div>
      <Bubbles class="mr-[48px] mt-[45px] mb-[20px] transform scale-x-inverse" color={statusToColor(status)} />
      {props.displayEditBotton && (
        <EditButton onClick={() => toogleIsChangeable()} class={'absolute bottom-[12px] right-[10px]'} />
      )}
    </div>
  )
}

export default GameStatusCard
