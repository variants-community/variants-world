import { GameInput, GameInputStatus } from 'components/landing/GameInput'

export const GameInputsGroup = (props: {
  disabled: boolean
  approveIds: string[]
  approveIdsState: GameInputStatus[]
  changeApproveId: (id: string, index: number) => void
}) => (
  <div class={'flex flex-wrap gap-5 mt-12 mx-auto justify-center mb-10'}>
    {props.approveIds.map((value, index) => {
      return (
        <GameInput
          disabled={props.disabled}
          status={props.approveIdsState[index]}
          key={index}
          value={value}
          setValue={newValue => {
            props.changeApproveId(newValue, index)
          }}
          placeholder={`game ${index + 2}`}
        />
      )
    })}
  </div>
)
