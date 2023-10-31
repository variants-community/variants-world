import { getValueFromEvent } from 'utils/hepers'

export const FormTextarea = (props: {
  value: string
  setValue: (value: string) => void
  invalid: boolean
  label?: string
  error?: string
}) => (
  <div class={'flex flex-col'}>
    {props.label && <label class="block font-semibold pb-1">{props.label}</label>}

    <textarea
      value={props.value}
      onInput={e => props.setValue(getValueFromEvent(e))}
      rows={6}
      class="px-3 py-2 rounded-xl outline-none bg-border-dark border border-border-light resize-none focus:bg-border-light"
    />

    {props.error && (
      <div>
        <p class={`px-1 text-red ${props.invalid ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
          {props.error}
        </p>
      </div>
    )}
  </div>
)
