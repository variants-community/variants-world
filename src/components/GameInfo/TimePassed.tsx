const daysLeft = (date: Date) => {
  const date_2 = new Date()
  const difference = date_2.getTime() - date.getTime()
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
  return totalDays
}

export const TimePassed = ({ from }: { from: Date }) => (
  <div className={'items-center '}>
    <span className={'block text-[16px] whitespace-nowrap'}>
      {`${daysLeft(from)} days ago`}
    </span>
  </div>
)
