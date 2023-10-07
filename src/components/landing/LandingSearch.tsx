import { type Ref, useEffect, useRef } from 'preact/hooks'
import { getValueFromEvent } from 'utils/hepers'
import SpinnerIcon from 'components/icons/SpinnerIcon'

type SearchProps = {
  value: number | undefined
  onChange: (value: number | undefined) => void
  collapsed: boolean
  loading: boolean
  invalid: boolean
}

export const LandingSearch = (props: SearchProps) => {
  const ref = useRef<HTMLInputElement>()

  useEffect(() => {
    const onShortcut = (e: KeyboardEvent) => {
      if (e.altKey || e.metaKey || e.ctrlKey || e.shiftKey || !ref.current) return
      if (e.key === ' ' && !props.collapsed) ref.current.focus()
      else if (e.key === 'Escape' && ref.current === document.activeElement) ref.current?.blur()
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onShortcut)
    return () => {
      window.removeEventListener('keydown', onShortcut)
    }
  }, [props.collapsed])

  const updateGameNr = (input: string) => {
    const match = input.match(/(game\/|#|^)(\d+)/)
    props.onChange(match ? Number(match[2].slice(0, 9)) : undefined)
  }

  return (
    <div class={`relative w-auto max-w-11/12 flex items-center opacity-0 animate-postfade`}>
      <span
        class={`absolute pointer-events-none ${
          props.collapsed ? 'left-4 text-2xl' : 'md:(left-7 text-4xl mt-0) sm:(text-2xl left-6 mt-1) text-xl left-5'
        } transition-inset duration-500 ease-expo`}
      >
        #
      </span>
      <input
        ref={ref as Ref<HTMLInputElement>}
        value={props.value ?? ''}
        onInput={e => updateGameNr(getValueFromEvent(e))}
        class={`bg-dark pr-16 rounded-full darkborder outline-none placeholder-text
        focus:(text-text-light placeholder-text-light) transition-search w-full
      ${
        props.collapsed
          ? 'shadow-lightSmall focus:shadow-lightSmallHover text-lg md:w-120 w-100 py-2 pl-10'
          : `shadow-light      focus:shadow-lightHover  
            lg:(text-2xl w-188 py-4)
            md:(text-xl  w-164 py-3 pl-16)
            sm:(text-xl  w-120 py-2 pl-13)
            text-lg  w-84 py-1 pl-11`
      }`}
        type="text"
        placeholder={'game number or link'}
      />
      {props.loading && <SpinnerIcon class="absolute right-7 h-6 w-6 pointer-events-none" />}
      <div
        class={`absolute right-3 text-red px-3 border border-border-light rounded-full pointer-events-none ${
          props.invalid ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300 easy-in`}
      >
        Already exist
      </div>
    </div>
  )
}
