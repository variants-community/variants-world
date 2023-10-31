import { useMemo } from 'preact/hooks'
import type { ComponentChild } from 'preact'

export const DetailedSwitch = <T extends string>(props: {
  value: T
  setValue: (newValue: T) => void
  labels?: Record<T, string>
  options: Record<T, ComponentChild>
  label?: string
}) => {
  const keys = useMemo(() => Object.keys(props.options) as T[], [props.options])
  const top = `${keys.indexOf(props.value) * 43 + 3}px`

  return (
    <div>
      {props.label && <label class="block font-semibold pb-1">{props.label}</label>}
      <div class="flex justify-between">
        <div class="relative w-fit text-lg font-semibold border border-border-light rounded-xl overflow-hidden">
          <div class="absolute bg-border-dark inset-0 -z-1" />
          <div
            class="absolute bg-primary h-9 left-1 right-1 rounded-lg -z-1 transition-inset duration-100"
            style={{ top }}
          />
          {keys.map(option => (
            <div
              class={`text-center px-5 py-2 cursor-pointer ${
                option === props.value ? 'text-white' : ''
              } transition-colors duration-100`}
              onMouseDown={() => props.setValue(option)}
            >
              {props.labels?.[option] ?? option}
            </div>
          ))}
        </div>
        <div class="w-2/3 px-3 py-1.5 h-22 border border-border-light rounded-xl font-semibold">
          {props.options[props.value]}
        </div>
      </div>
    </div>
  )
}
