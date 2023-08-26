import { getValueFromEvent } from 'utils/hepers'
import { useEffect } from 'preact/hooks'
import AcceptedIcon from 'components/icons/AcceptedIcon'
import CrossIcon from 'components/icons/CrossIcon'

export enum IdInputState {
  ACCEPTED,
  DECLINED,
  INPUT
}

type IdInputProps = {
  mainGameId: string
  placeholder: string
  value: string
  setValue: (value: string) => void
  state: IdInputState
  setState: (value: IdInputState) => void
}

export const IdInput = (props: IdInputProps) => {
  useEffect(() => {
    if (props.value.length === 0) {
      props.setState(IdInputState.INPUT)
    } else {
      fetch(`/api/game/${props.mainGameId}/same-as/${props.value}`, {
        method: 'get'
      })
        // eslint-disable-next-line github/no-then
        .then(async response => response.json())
        // eslint-disable-next-line github/no-then
        .then(data => {
          const isSame = data as boolean

          if (isSame) {
            props.setState(IdInputState.ACCEPTED)
          } else {
            props.setState(IdInputState.DECLINED)
          }
        })
    }
  }, [props.value])
  return (
    <div
      className={
        'w-[183px] h-[45px] flex flex-row gap-[8px] items-center text-[18px] px-[15px] py-[10px] border border-border-light rounded-full'
      }
    >
      {props.state === IdInputState.INPUT ? (
        <span className={'max-w-[15px] text-[23px]'}>#</span>
      ) : props.state === IdInputState.ACCEPTED ? (
        <AcceptedIcon className="h-[15px] max-w-[15px]" />
      ) : (
        <CrossIcon className="h-[15px] max-w-[15px]" />
      )}

      <input
        value={props.value}
        onInput={e => props.setValue(getValueFromEvent(e))}
        placeholder={props.placeholder}
        type="text"
        className={'w-[100%] bg-dark outline-none'}
      />
    </div>
  )
}
