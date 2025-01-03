import { cl, statusToColor } from 'utils/hepers'
import StatusIcon from 'components/icons/StatusIcon'
import type { GameStatus } from 'db/prisma/types'

export const StatusIndicator = ({ status, small }: { status?: GameStatus; small?: boolean }) => {
  return (
    <div class={'w-auto'}>
      <StatusIcon class={cl(`fill-${status ? statusToColor(status) : 'text'}`, small && '!w-4.5 !h-4.5')} />
    </div>
  )
}
