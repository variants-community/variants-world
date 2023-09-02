import { IdInput, IdInputState } from 'components/NewPost/IdInput'

export const IdsInputs = (props: {
  disabled: boolean
  approveIds: string[]
  approveIdsState: IdInputState[]
  changeApproveId: (id: string, index: number) => void
}) => (
  <div class={'flex flex-wrap gap-5 mt-12 mx-auto justify-center mb-10'}>
    {props.approveIds.map((value, index) => {
      return (
        <IdInput
          disabled={props.disabled}
          state={props.approveIdsState[index]}
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
