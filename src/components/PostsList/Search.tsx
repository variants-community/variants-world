import { getValueFromEvent } from 'utils/hepers'
import SearchIcon from 'components/icons/SearchIcon'

type SearhProps = {
  query: string
  setQuery: (query: string) => void
}

const Search = (props: SearhProps) => {
  const onQueryInput = async (e: Event) => {
    props.setQuery(getValueFromEvent<string>(e))
  }

  return (
    <div
      class={
        'w-11/12 flex flex-row items-center mx-auto mt-20 mb-8 sm:(w-full mx-0 mb-14 mt-0) bg-dark darkborder rounded-full shadow-light'
      }
    >
      <SearchIcon class="h-5 w-5 ml-5 my-3 mr-3" />
      <input
        id={'index-page-search'}
        value={props.query}
        onInput={onQueryInput}
        type="text"
        class={'w-full bg-dark outline-none text-[20px]'}
        placeholder={'Search'}
      />

      <div class={'hidden flex-row sm:flex mr-5 gap-1'}>
        <span class={'py-[3px] px-[6px] bg-border-light rounded'}>CTRL</span>
        <span class={'py-[3px] px-[7px] bg-border-light rounded'}>K</span>
      </div>
    </div>
  )
}

export default Search
