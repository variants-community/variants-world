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
        'w-11/12 mt-[80px] mb-[30px] sm:mb-[55px] sm:mt-0  mx-auto sm:mx-0 flex flex-row items-center sm:w-full bg-dark shadow-light border border-[2px] border-border-dark rounded-full'
      }
    >
      <SearchIcon class="h-[20px] w-[20px] ml-[20px] my-[12px] mr-[12px]" />
      <input
        id={'index-page-search'}
        value={props.query}
        onInput={onQueryInput}
        type="text"
        class={'w-full bg-dark outline-none text-[20px] font-normal'}
        placeholder={'Search'}
      />

      <div class={'hidden sm:flex flex-row mr-[20px] gap-[4px] text-[16px]'}>
        <span class={'py-[3px] px-[6px] bg-border-light rounded-[3px]'}>CTRL</span>
        <span class={'py-[3px] px-[7px] bg-border-light rounded-[3px]'}>K</span>
      </div>
    </div>
  )
}

export default Search
