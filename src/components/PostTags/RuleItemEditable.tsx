import { getValueFromEvent } from 'utils/hepers'
import { useEffect, useRef, useState } from 'preact/hooks'

type RuleItemEditableProps = {
  isEditMode: boolean
  ruleName: string
  class?: string
  onRemove: () => void
  edit?: (old: string, edited: string) => void
}

export const RuleItemEditable = (props: RuleItemEditableProps) => {
  const [inputMode, setInputMode] = useState(false)
  const [value, setValue] = useState(props.ruleName)

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current && inputMode) {
      ref.current.focus()
    }
  }, [inputMode])

  return (
    <li
      class={`h-[26px] flex flex-row gap-[5px] whitespace-nowrap bg-dark border border-border-dark rounded py-[5px] px-[5px] ${props.class}`}
    >
      {props.isEditMode ? (
        inputMode ? (
          <input
            ref={ref}
            style={{ width: `${value.length}ch` }}
            class={'inline bg-dark outline-none'}
            value={value}
            onInput={e => setValue(getValueFromEvent(e))}
            onChange={() => {
              setInputMode(false)
            }}
            onBlur={e => {
              props.edit?.(props.ruleName, getValueFromEvent(e))
              setInputMode(false)
            }}
          ></input>
        ) : (
          <button onClick={() => setInputMode(true)}>{value}</button>
        )
      ) : (
        <span>{value}</span>
      )}

      {props.isEditMode && (
        <button onClick={() => props.onRemove()} class={'text-text'}>
          X
        </button>
      )}
    </li>
  )
}
