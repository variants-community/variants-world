import { GameInput } from 'components/landing/first/GameInput'
import type { InputPayload } from 'components/landing/use-new-post-validation'
import type { Signal } from '@preact/signals'

export const GameInputsGroup = (props: {
  disabled: boolean
  inputsPayload: InputPayload[]
  setConfirmingGameNr: (id: string, index: number) => void
  activeGameIndex: Signal<number | undefined>
}) => (
  <div class={'flex flex-wrap gap-5 mt-12 mx-auto justify-center mb-10'}>
    {props.inputsPayload.map(({ gameNr, status, loading }, index) => {
      return (
        <GameInput
          disabled={props.disabled}
          status={status}
          loading={loading}
          key={index}
          value={gameNr}
          setValue={value => props.setConfirmingGameNr(value, index)}
          onFocus={() => (props.activeGameIndex.value = index)}
          onBlur={() => props.activeGameIndex.value === index && (props.activeGameIndex.value = undefined)}
          placeholder={`game ${index + 2}`}
        />
      )
    })}
  </div>
)
