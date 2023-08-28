import { getValueFromEvent } from 'utils/hepers'
import { useEffect, useRef, useState } from 'preact/hooks'

type AddRuleButtonProps = {
  class?: string
  addRule?: (rule: string) => void
}

export const AddRuleButton = (props: AddRuleButtonProps) => {
  const [isInput, setIsInput] = useState(false)
  const [newRule, setNewRule] = useState('')

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current && isInput) {
      ref.current.focus()
    }
  }, [isInput])

  return (
    <>
      {isInput && (
        <li
          class={`h-[26px] flex flex-row gap-[5px] whitespace-nowrap bg-dark border border-border-dark rounded py-[5px] px-[5px] ${props.class}`}
        >
          <input
            ref={ref}
            style={{
              width: newRule.length === 0 ? '10ch' : `${newRule.length}ch`
            }}
            class={'inline bg-dark outline-none'}
            value={newRule}
            onInput={e => setNewRule(getValueFromEvent(e))}
            onChange={() => {
              setIsInput(false)
            }}
            onBlur={e => {
              props.addRule?.(getValueFromEvent(e))
              setNewRule('')
              setIsInput(false)
            }}
          ></input>
        </li>
      )}
      {!isInput && (
        <li>
          <button
            onClick={() => setIsInput(true)}
            class={'h-[26px] text-text border border-border-dark rounded py-[5px] px-[5px]'}
          >
            + Add
          </button>
        </li>
      )}
    </>
  )
}
