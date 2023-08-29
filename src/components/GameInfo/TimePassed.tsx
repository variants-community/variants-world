import { getFormattedTimePassed } from 'utils/hepers'

export const TimePassed = ({ from }: { from: Date }) => (
  <div class={'items-center'}>
    <span class={'whitespace-nowrap'}>{`${getFormattedTimePassed(new Date(from))}`}</span>
  </div>
)
