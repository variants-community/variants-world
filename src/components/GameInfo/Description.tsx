import { getValueFromEvent } from 'utils/hepers'
import { highlightLinks } from 'utils/formatters'

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
      <p className={'light-scrollbar break-words whitespace-pre-wrap overflow-y-auto h-full pt-1 leading-[1.2rem]'}>
        {highlightLinks(props.value)}
      </p>
    )}
  </div>
)
