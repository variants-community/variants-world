import { useEffect, useState } from 'preact/hooks'
import Bubbles from './icons/Bubbles'
import { supabase } from '../db/supabase/supabase'
import { GameStatus } from '@prisma/client'
import EditIcon from './icons/EditIcon'
import { getValueFromEvent, statusToColor, statusToString } from '../hepers'

type AcceptedCardProps = {
  displayEditBotton: boolean;
  verdict: string | null;
  postId: number;
  status: GameStatus;
};

const statuses = [
  { label: 'Accepted', value: GameStatus.ACCEPTED },
  { label: 'Declined', value: GameStatus.DECLINED },
  { label: 'Pending reply', value: GameStatus.PENDING_REPLY },
  { label: 'Under review', value: GameStatus.UNDER_REVIEW },
]
const GameStatusCard = (props: AcceptedCardProps) => {
  const [verdict, setVerdict] = useState(props.verdict ?? '')
  const [status, setStatus] = useState(props.status)
  const [isEditMode, setIsEditMode] = useState(false)

  const toogleIsChangeable = () => {
    setIsEditMode(!isEditMode)
  }

  useEffect(() => {
    const channel = supabase.channel('adminSettings channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Post',
          filter: `id=eq.${props.postId}`,
        },
        (payload) => {
          const updated = payload.new as {
            verdict: string;
            status: GameStatus;
          }
          setVerdict(updated.verdict)
          setStatus(updated.status)
          console.log('realtime update: ', updated)
        },
      ).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const onStatusChange = async (e: Event) => {
    const status = getValueFromEvent<GameStatus>(e)
    await supabase.from('Post').update({ status: status }).eq(
      'id',
      props.postId,
    )
  }

  const onVerdictChange = async (e: Event) => {
    const verdict = getValueFromEvent<string>(e)
    await supabase.from('Post').update({ verdict: verdict }).eq(
      'id',
      props.postId,
    )
  }
  console.log('statusToColor(status): ', statusToColor(status))
  return (
    <div
      className={`relative flex flex-row justify-between items-center text-center bg-border-light text-${
        statusToColor(status)
      } shadow-dark rounded-[12px]`}
    >
      <Bubbles
        className="ml-[48px] mt-[45px] mb-[20px] mr-0"
        color={statusToColor(status)}
      />
      <div className={'block w-full'}>
        {!isEditMode
          ? (
            <h2 className={'text-[40px] font-semibold mt-[16px]'}>
              {statusToString(status)}
            </h2>
          )
          : (
            <select
              value={status}
              onChange={onStatusChange}
              type="text"
              className={'bg-dark rounded-[3px] text-center block text-[40px] font-semibold mt-[16px] mx-auto outline-none'}
            >
              {statuses.map((status, i) => (
                <option key={i} value={status.value}>{status.label}</option>
              ))}
            </select>
          )}

        {!isEditMode
          ? (
            <p
              className={'text-[16px] font-semibold mt-[7px] mb-[20px] text-center'}
            >
              {verdict}
            </p>
          )
          : (
            <textarea
              value={verdict}
              onChange={onVerdictChange}
              type="text"
              rows={5}
              className={'w-full bg-dark rounded-[3px] text-[16px] font-semibold mt-[7px] mb-[20px] text-center outline-none'}
            />
          )}
      </div>
      <Bubbles
        className="mr-[48px] mt-[45px] mb-[20px] miror"
        color={statusToColor(status)}
      />

      {props.displayEditBotton && (
        <div onClick={() => toogleIsChangeable()} className={'cursor-pointer '}>
          <EditIcon className="absolute bottom-[12px] right-[10px] text-green" />
        </div>
      )}
    </div>
  )
}

export default GameStatusCard
