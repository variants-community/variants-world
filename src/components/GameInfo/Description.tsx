import { getValueFromEvent } from 'utils/hepers'
// import { useHideScroll } from 'components/GameInfo/use-hide-scroll'

type DescriptionProps = {
  isEditMode: boolean
  value: string
  onDescriptionChange: (description: string) => void
}

export const Description = (props: DescriptionProps) => {
  // useHideScroll()

  return (
    <div class={'flex flex-col text-[16px] overflow-hidden h-full'}>
      <h2 class={'text-secondary font-semibold'}>Description</h2>
      {props.isEditMode ? (
        <textarea
          rows={15}
          value={props.value}
          onChange={e => props.onDescriptionChange(getValueFromEvent(e))}
          class={'h-full bg-dark outline-none rounded resize-none'}
        />
      ) : (
        <p className={'light-scrollbar break-words whitespace-pre-wrap overflow-y-auto h-full'}>{props.value}</p>
      )}
    </div>
  )
}
