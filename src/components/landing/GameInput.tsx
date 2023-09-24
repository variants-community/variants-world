import { getValueFromEvent } from 'utils/hepers'
import AcceptedIcon from 'components/icons/AcceptedIcon'
import CrossIcon from 'components/icons/CrossIcon'

export enum GameInputStatus {
  Default,
  Valid,
  Invalid
}

type Props = {
  disabled: boolean
  placeholder: string
  value: string
  setValue: (value: string) => void
  status: GameInputStatus
}

export const GameInput = (props: Props) => (
  <div class={`relative w-46 items-center ${props.disabled ? 'opacity-50' : ''} transition-all duration-300 easy-in`}>
    <div class={'absolute left-4 text-3xl'}>
      <StatusIcon status={props.status} />
    </div>

    <input
      class={
        'w-full bg-dark outline-none pr-4 pl-10 py-2 rounded-full border border-border-light text-lg focus:bg-border-light'
      }
      disabled={props.disabled}
      value={props.value}
      onInput={e => props.setValue(getValueFromEvent(e))}
      placeholder={props.placeholder}
      type="text"
    />
  </div>
)

const StatusIcon = ({ status }: { status: GameInputStatus }) => {
  switch (status) {
    case GameInputStatus.Default:
      return <span class={'max-w-4 text-[23px]'}>#</span>
    case GameInputStatus.Valid:
      return <AcceptedIcon class="mt-3.7 h-3.7 max-w-3.7" />
    case GameInputStatus.Invalid:
      return <CrossIcon class="mt-3.7 h-3.7 max-w-3.7" />
  }
}
