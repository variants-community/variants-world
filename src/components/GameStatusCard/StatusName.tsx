import { GameStatus } from '@prisma/client'
import { statusToString } from 'utils/hepers'

const statuses = [
  { label: 'Accepted', value: GameStatus.ACCEPTED },
  { label: 'Declined', value: GameStatus.DECLINED },
  { label: 'Pending reply', value: GameStatus.PENDING_REPLY },
  { label: 'Under review', value: GameStatus.UNDER_REVIEW }
]

type StatusNameProps = {
  isEditMode: boolean
  status: GameStatus
  onChange: (e: Event) => void
}

export const StatusName = (props: StatusNameProps) => (
  <>
    {!props.isEditMode ? (
      <h2 class={'text-[40px] font-semibold mt-[16px]'}>{statusToString(props.status)}</h2>
    ) : (
      <select
        value={props.status}
        onChange={props.onChange}
        type="text"
        class={'bg-dark rounded-[3px] text-center block text-[40px] font-semibold mt-[16px] mx-auto outline-none'}
      >
        {statuses.map((status, i) => (
          <option key={i} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
    )}
  </>
)
