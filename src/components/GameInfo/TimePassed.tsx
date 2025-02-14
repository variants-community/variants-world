import { getFormattedTimePassed } from 'utils/hepers'

export const TimePassed = ({ from }: { from: Date }) => (
  <div
    class={
      'items-center before:(pointer-events-none opacity-0 whitespace-nowrap !duration-0 transition-opacity !block) after:(pointer-events-none opacity-0 whitespace-nowrap !duration-0 transition-opacity !block) hover:before:(opacity-100 delay-300) hover:after:(opacity-100 delay-300)'
    }
    data-tooltip={from.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })}
    data-tooltip-position="bottom"
  >
    <span class={'whitespace-nowrap'}>{`${getFormattedTimePassed(new Date(from))}`}</span>
  </div>
)
