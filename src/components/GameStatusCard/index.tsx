import { useState } from 'preact/hooks'
import Bubbles from '../icons/Bubbles'
import { supabase } from '../../db/supabase/supabase'
import type { GameStatus } from '@prisma/client'
import { getValueFromEvent, statusToColor } from '../../hepers'
import { usePostStatus } from './usePostStatus'
import { StatusName } from './StatusName'
import { Verdict } from './Verdict'
import { EditButton } from '../EditButton'

type AcceptedCardProps = {
  displayEditBotton?: boolean;
  verdict: string | null;
  postId: number;
  status: GameStatus;
};

const GameStatusCard = (props: AcceptedCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false)

  const toogleIsChangeable = () => {
    setIsEditMode(!isEditMode)
  }

  const { verdict, status } = usePostStatus(
    props.verdict,
    props.status,
    props.postId,
  )

  const onStatusChange = async (e: Event) => {
    const status = getValueFromEvent<GameStatus>(e)
    await supabase
      .from('Post')
      .update({ status: status })
      .eq('id', props.postId)
  }

  const onVerdictChange = async (e: Event) => {
    const verdict = getValueFromEvent<string>(e)
    await supabase
      .from('Post')
      .update({ verdict: verdict })
      .eq('id', props.postId)
  }

  return (
    <div
      className={`relative flex flex-row justify-between items-center text-center bg-border-light text-${
        statusToColor(
          status,
        )
      } shadow-dark rounded-[12px]`}
    >
      <Bubbles
        className="ml-[48px] mt-[45px] mb-[20px] mr-0"
        color={statusToColor(status)}
      />
      <div className={'block w-full'}>
        <StatusName
          isEditMode={isEditMode}
          status={status}
          onChange={onStatusChange}
        />
        <Verdict
          isEditMode={isEditMode}
          verdict={verdict}
          onChange={onVerdictChange}
        />
      </div>
      <Bubbles
        className="mr-[48px] mt-[45px] mb-[20px] miror"
        color={statusToColor(status)}
      />
      {props.displayEditBotton && (
        <EditButton
          onClick={() => toogleIsChangeable()}
          className={'absolute bottom-[12px] right-[10px]'}
        />
      )}
    </div>
  )
}

export default GameStatusCard
