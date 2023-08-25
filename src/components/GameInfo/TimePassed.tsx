const getFormattedTimePassed = (createdAt: Date): string => {
  const now = new Date()
  const timePassed = now.getTime() - createdAt.getTime()
  const millisecondsPerDay = 24 * 60 * 60 * 1000

  if (timePassed < millisecondsPerDay) {
      return 'today'
  } else if (timePassed < 2 * millisecondsPerDay) {
      return 'yesterday'
  } else if (timePassed < 7 * millisecondsPerDay) {
      const daysAgo = Math.floor(timePassed / millisecondsPerDay)
      return `${daysAgo} days ago`
  } else if (timePassed < 30 * millisecondsPerDay) {
      const weeksAgo = Math.floor(timePassed / (7 * millisecondsPerDay))
      return `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} ago`
  } else if (timePassed < 365 * millisecondsPerDay) {
      const monthsAgo = Math.floor(timePassed / (30 * millisecondsPerDay))
      return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`
  } else {
      const yearsAgo = Math.floor(timePassed / (365 * millisecondsPerDay))
      return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`
  }
}

export const TimePassed = ({ from }: { from: Date }) => (
  <div className={'items-center '}>
    <span className={'block text-[16px] whitespace-nowrap'}>
      {`${getFormattedTimePassed(new Date(from))}`}
    </span>
  </div>
)
