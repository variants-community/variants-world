import { Input } from 'components/common/Input'
import { getValueFromEvent } from 'utils/hepers'

export const FormInput = (props: {
  value: string
  setValue: (newValue: string) => void
  invalid: boolean
  label?: string
  error?: string
  submit?: () => void
}) => (
  <div>
    <div>
      {props.label && <label class="block font-semibold pb-1">{props.label}</label>}

      <Input
        value={props.value}
        onInput={e => props.setValue(getValueFromEvent(e))}
        onCtrlEnter={props.submit}
        name="name"
        type="text"
        class="text-lg sm:w-2/3 w-full px-3 py-2 rounded-xl outline-none bg-border-dark border border-border-light focus:bg-border-light"
        autoComplete="off"
      />
    </div>
    {props.error && (
      <p
        class={`h-2 w-2/3 px-1 text-red ${props.invalid ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
      >
        {props.error}
      </p>
    )}
  </div>
)
