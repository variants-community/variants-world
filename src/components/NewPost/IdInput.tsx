import { getValueFromEvent } from 'utils/hepers'
import AcceptedIcon from 'components/icons/AcceptedIcon'
import CrossIcon from 'components/icons/CrossIcon'

export enum IdInputState {
  ACCEPTED,
  DECLINED,
  INPUT
}

type IdInputProps = {
  disabled: boolean
  placeholder: string
  value: string
  setValue: (value: string) => void
  state: IdInputState
}

export const IdInput = (props: IdInputProps) => (
  <div
    class={`w-[183px] h-[45px] flex flex-row gap-[8px] items-center text-[18px] px-[15px] py-[10px] border border-border-light rounded-full ${
      props.disabled ? 'opacity-50' : ''
    } transition-all duration-300 easy-in`}
  >
    {props.state === IdInputState.INPUT ? (
      <span class={'max-w-[15px] text-[23px]'}>#</span>
    ) : props.state === IdInputState.ACCEPTED ? (
      <AcceptedIcon class="h-[15px] max-w-[15px]" />
    ) : (
      <CrossIcon class="h-[15px] max-w-[15px]" />
    )}

    <input
      disabled={props.disabled}
      value={props.value}
      onInput={e => props.setValue(getValueFromEvent(e))}
      placeholder={props.placeholder}
      type="text"
      class={'w-[100%] bg-dark outline-none'}
    />
  </div>
)
