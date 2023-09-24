import { getValueFromEvent } from 'utils/hepers'
import AcceptedIcon from 'components/icons/AcceptedIcon'
import CrossIcon from 'components/icons/CrossIcon'
import SpinnerIcon from 'components/icons/SpinnerIcon'

type SearchProps = {
  value: string
  onChange: (value: string) => void
  isSearching: boolean
  isLoading: boolean
  isGamedFoud: boolean
  isValid: boolean
}

export const Search = (props: SearchProps) => (
  <div class={`relative w-auto max-w-11/12 flex items-center opacity-0 animate-postfade`}>
    <span
      class={`absolute ${
        props.isSearching ? 'left-4 text-2xl' : 'md:(left-7 text-4xl mt-0) sm:(text-2xl left-6 mt-1) text-xl left-5'
      } transition-inset duration-500 ease-expo`}
    >
      {!props.isLoading && props.isGamedFoud ? props.isValid ? <AcceptedIcon /> : <CrossIcon class="h-3 w-3" /> : '#'}
    </span>
    <input
      value={props.value}
      onInput={e => props.onChange(getValueFromEvent(e))}
      class={`bg-dark pr-16 rounded-full darkborder outline-none placeholder-text
      focus:(text-text-light placeholder-text-light) transition-search w-full
      ${
        props.isSearching
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
    {props.isLoading && <SpinnerIcon class="absolute right-7 h-6 w-6" />}
  </div>
)
