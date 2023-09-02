import { getValueFromEvent } from 'utils/hepers'

export const DescriptionInput = (props: {
  description: string
  setDescription: (value: string) => void
  isInvalid: boolean
}) => (
  <div class={'flex flex-col'}>
    <label htmlFor={'description'}>Description</label>
    <textarea
      value={props.description}
      onInput={e => props.setDescription(getValueFromEvent(e))}
      name="description"
      id="description"
      rows={6}
      class={'p-[10px] mt-[5px] text-[18px] rounded-xl outline-none bg-border-dark border border-border-light'}
    />

    <div>
      <p
        class={`px-1 text-[18px] text-red ${
          props.isInvalid ? 'opacity-100' : 'opacity-0'
        } transition-all duration-300 easy-in-oout`}
      >
        Please provide a brief game description before sending.
        <br />
        (limit of at least 10 characters)
      </p>
    </div>
  </div>
)
