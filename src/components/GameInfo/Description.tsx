import { getValueFromEvent } from 'utils/hepers'

type DescriptionProps = {
  isEditMode: boolean
  value: string
  onDescriptionChange: (description: string) => void
}

export const Description = (props: DescriptionProps) => {
  return (
    <div class={'flex flex-col text-[16px] '}>
      <h2 class={'text-secondary font-semibold'}>Description</h2>
      {props.isEditMode ? (
        <textarea
          rows={15}
          value={props.value}
          onChange={e => props.onDescriptionChange(getValueFromEvent(e))}
          class={'h-full bg-dark outline-none rounded'}
        />
      ) : (
        <p>{props.value}</p>
      )}
    </div>
  )
}
