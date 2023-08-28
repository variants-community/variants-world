import { getValueFromEvent } from 'utils/hepers'

export const DescriptionInput = (props: {
  description: string
  setDescription: (value: string) => void
  isInvalid: boolean
}) => (
  <div class={'flex flex-col'}>
    <label htmlFor={'description'} class={`${props.isInvalid ? 'text-red' : ''}`}>
      Description
    </label>
    <textarea
      value={props.description}
      onInput={e => props.setDescription(getValueFromEvent(e))}
      name="description"
      id="description"
      rows={5}
      class={`p-[10px] mt-[5px] text-[18px] rounded-xl outline-none bg-border-dark border ${
        props.isInvalid ? 'border-red' : 'border-border-light'
      }`}
    />
  </div>
)
