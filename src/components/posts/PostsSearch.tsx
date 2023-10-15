import { type Ref, useEffect, useRef } from 'preact/hooks'
import { getValueFromEvent } from 'utils/hepers'
import SearchIcon from 'components/icons/SearchIcon'

type SearhProps = {
  query: string
  setQuery: (query: string) => void
}

const PostsSearch = (props: SearhProps) => {
  const ref = useRef<HTMLInputElement>()

  const onQueryInput = async (e: Event) => {
    props.setQuery(getValueFromEvent<string>(e))
  }

  useEffect(() => {
    const onShortcut = (e: KeyboardEvent) => {
      if (e.altKey || e.metaKey || e.shiftKey || !ref.current) return
      if (e.ctrlKey && e.key === 'k') ref.current.focus()
      else if (!e.ctrlKey && e.key === 'Escape') ref.current.blur()
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onShortcut)
    return () => {
      window.removeEventListener('keydown', onShortcut)
    }
  }, [])

  return (
    <div class={'relative w-11/12 mx-auto mt-4 mb-10 lg:(w-full mx-0 mb-14 mt-0)'}>
      <input
        ref={ref as Ref<HTMLInputElement>}
        value={props.query}
        onInput={onQueryInput}
        type="text"
        placeholder={'Search'}
        class={`w-full text-xl py-2 pl-12 pr-5
          flex items-center bg-dark darkborder rounded-full shadow-light outline-none
          shadow-lightSmall focus:(text-text-light placeholder-text-light shadow-lightSmallHover) transition-search `}
      />
      <SearchIcon class="absolute top-4 left-5 h-4.4 w-4.4 pointer-events-none" />

      <div class={'hidden sm:flex absolute top-2.5 right-5 gap-1 pointer-events-none'}>
        <span class={'py-[3px] px-[6px] bg-border-light rounded'}>CTRL</span>
        <span class={'py-[3px] px-[7px] bg-border-light rounded'}>K</span>
      </div>
    </div>
  )
}

export default PostsSearch
