import { GameInput } from 'components/landing/first/GameInput'
import type { InputPayload } from 'components/landing/use-new-post-validation'

export const GameInputsGroup = (props: {
  disabled: boolean
  inputsPayload: InputPayload[]
  setConfirmingGameNr: (id: string, index: number) => void
}) => (
  <div class={'flex flex-wrap gap-5 mt-12 mx-auto justify-center mb-10'}>
    {props.inputsPayload.map(({ gameNr, status }, index) => {
      return (
        <GameInput
          disabled={props.disabled}
          status={status}
          key={index}
          value={gameNr}
          setValue={value => props.setConfirmingGameNr(value, index)}
          placeholder={`game ${index + 2}`}
        />
      )
    })}
  </div>
)
