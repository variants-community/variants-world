import { getValueFromEvent } from '../../utils/hepers'
import SearchIcon from '../icons/SearchIcon'
import { isMobile } from 'react-device-detect'

type SearhProps = {
  query: string;
  setQuery: (query: string) => void;
};

const Search = (props: SearhProps) => {
  const onQueryInput = async (e: Event) => {
    props.setQuery(getValueFromEvent<string>(e))
  }

  return (
    <div
      className={'flex flex-row items-center w-full bg-dark shadow-light border border-[2px] border-border-dark rounded-full'}
    >
      <SearchIcon className="h-[20px] w-[20px] ml-[20px] my-[12px] mr-[12px]" />
      <input
        id={'index-page-search'}
        value={props.query}
        onInput={onQueryInput}
        type="text"
        className={'w-full bg-dark outline-none text-[20px] font-normal'}
        placeholder={'Search'}
      />
      {!isMobile &&
        (
          <div className={'flex flex-row mr-[20px] gap-[4px] text-[16px]'}>
            <span className={'py-[3px] px-[6px] bg-border-light rounded-[3px]'}>
              CTRL
            </span>
            <span className={'py-[3px] px-[7px] bg-border-light rounded-[3px]'}>
              K
            </span>
          </div>
        )}
    </div>
  )
}

export default Search
