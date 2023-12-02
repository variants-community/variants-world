import { ValidationStatus } from 'utils/games-validation'
import { getValueFromEvent } from 'utils/hepers'
import CheckMarkIcon from 'components/icons/CheckMarkIcon'
import CrossIcon from 'components/icons/CrossIcon'
import SpinnerIcon from 'components/icons/SpinnerIcon'
// import WarningIcon from 'components/icons/WarningIcon'

type Props = {
  disabled: boolean
  placeholder: string
  value: string
  setValue: (value: string) => void
  status: ValidationStatus
  loading: boolean
  onFocus: () => void
  onBlur: () => void
}

export const GameInput = (props: Props) => (
  <div class={`relative w-46 items-center ${props.disabled ? 'opacity-50' : ''} transition-all duration-300 easy-in`}>
    <div class="absolute left-4 text-3xl pointer-events-none">
      {props.loading ? <SpinnerIcon class="absolute mt-3.7 h-4 w-4" /> : <StatusIcon status={props.status} />}
    </div>

    <input
      class="w-full bg-dark outline-none pr-4 pl-10 py-2 rounded-full border border-border-light text-lg focus:bg-border-light"
      disabled={props.disabled}
      value={props.value}
      onInput={e => props.setValue(getValueFromEvent(e))}
      onFocus={() => props.onFocus()}
      onBlur={() => props.onBlur()}
      placeholder={props.placeholder}
      type="text"
    />
  </div>
)

const StatusIcon = ({ status }: { status: ValidationStatus }) => {
  switch (status) {
    case ValidationStatus.Unknown:
      return <span class="max-w-4 text-2xl">#</span>
    case ValidationStatus.Success:
      return <CheckMarkIcon class="mt-3.7 h-3.7 max-w-3.7 fill-green" />
    case ValidationStatus.Warning:
      return <CheckMarkIcon class="mt-3.7 h-3.7 max-w-3.7 fill-yellow" />
    // return <WarningIcon class="mt-3.7 h-3.7 max-w-3.7 fill-yellow" />
    case ValidationStatus.Failure:
      return <CrossIcon class="mt-3.7 h-3.7 max-w-3.7 fill-red" />
  }
}
