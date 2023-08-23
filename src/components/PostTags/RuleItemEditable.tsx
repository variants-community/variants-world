import { useEffect, useRef, useState } from 'preact/hooks'
import { getValueFromEvent } from '../../utils/hepers'

type RuleItemEditableProps = {
  isEditMode: boolean;
  ruleName: string;
  className?: string;
  onRemove: () => void;
  edit?: (old: string, edited: string) => void;
};

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
      className={`h-[26px] flex flex-row gap-[5px] whitespace-nowrap bg-dark border border-border-dark rounded-[3px] py-[5px] px-[5px] ${props.className}`}
    >
      {props.isEditMode
        ? inputMode
          ? (
            <input
              ref={ref}
              style={{ width: value.length + 'ch' }}
              className={'inline bg-dark outline-none'}
              value={value}
              onInput={(e) => setValue(getValueFromEvent(e))}
              onChange={() => {
                setInputMode(false)
              }}
              onBlur={(e) => {
                props.edit?.(props.ruleName, getValueFromEvent(e))
                setInputMode(false)
              }}
            >
            </input>
          )
          : <button onClick={() => setInputMode(true)}>{value}</button>
        : <span>{value}</span>}

      {props.isEditMode &&
        (
          <button onClick={() => props.onRemove()} className={'text-text'}>
            X
          </button>
        )}
    </li>
  )
}
