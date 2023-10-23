import { getValueFromEvent } from 'utils/hepers'

type DescriptionProps = {
  isEditMode: boolean
  value: string
  onDescriptionChange: (description: string) => void
}

export const Description = (props: DescriptionProps) => (
  <div class={'flex flex-col text-[16px] overflow-hidden h-full'}>
    <h3 class={'text-secondary font-semibold pb-1'}>Description</h3>
    {props.isEditMode ? (
      <textarea
        placeholder={'Describe your custom variant'}
        rows={15}
        value={props.value}
        onChange={e => props.onDescriptionChange(getValueFromEvent(e))}
        class={'h-full bg-dark outline-none rounded resize-none darkborder p-1'}
      />
    ) : (
      <p className={'light-scrollbar break-words whitespace-pre-wrap overflow-y-auto h-full'}>{props.value}</p>
    )}
  </div>
)
