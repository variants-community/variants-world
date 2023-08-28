import { statusToString } from 'utils/hepers'
import type { GameStatus } from '@prisma/client'

const statuses = [
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'Declined', value: 'DECLINED' },
  { label: 'Pending reply', value: 'PENDING_REPLY' },
  { label: 'Under review', value: 'UNDER_REVIEW' }
]

type StatusNameProps = {
  isEditMode: boolean
  status: GameStatus
  onChange: (e: Event) => void
}

export const StatusName = (props: StatusNameProps) => (
  <>
    {!props.isEditMode ? (
      <h2 class={'text-[40px] font-semibold mt-4'}>{statusToString(props.status)}</h2>
    ) : (
      <select
        value={props.status}
        onChange={props.onChange}
        type="text"
        class={'block mx-auto mt-4 text-center text-[40px] font-semibold rounded bg-dark outline-none'}
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
