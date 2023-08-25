import { useEffect, useState } from 'preact/hooks'
import { IdInput, IdInputState } from './IdInput'

export const IdsInputs = (
  props: {
    mainGameId: string;
    userId: number;
    approveIds: string[];
    setApproveIds: (ids: string[]) => void;
    setIsAllConfirmed: (value: boolean) => void;
  },
) => {
  const [states, setStates] = useState<IdInputState[]>(
    new Array<IdInputState>(8).fill(IdInputState.INPUT),
  )

  useEffect(() => {
    props.setIsAllConfirmed(
      states.every((state) => state === IdInputState.ACCEPTED),
    )
  }, [states])

  const onChangeValue = (value: string, index: number) => {
    const temp = props.approveIds.map((i) => i)
    temp[index] = value
    props.setApproveIds(temp)
  }

  const onChangeState = (value: IdInputState, index: number) => {
    const temp = states.map((i) => i)
    temp[index] = value

    setStates(temp)
  }

  return (
    <div
      className={'flex flex-wrap gap-[21px] mt-[75px] mx-auto justify-center mb-[50px]'}
    >
      {props.approveIds.map((value, index) => {
        return (
          <IdInput
            mainGameId={props.mainGameId}
            state={states[index]}
            setState={(stateValue: IdInputState) =>
              onChangeState(stateValue, index)}
            key={index}
            value={value}
            setValue={(value) => {
              onChangeValue(value, index)
            }}
            placeholder={`game ${index + 1}`}
          />
        )
      })}
    </div>
  )
}
