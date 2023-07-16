import SearchIcon from './icons/SearchIcon'

const Search = () => {
 return (
  <div
    className={'flex flex-row items-center w-full bg-dark shadow-light border border-[2px] border-border-dark rounded-full'}
  >
   <SearchIcon className='h-[20px] w-[20px] ml-[20px] my-[12px] mr-[12px]'/>
   <input type="text" className={'w-full bg-dark outline-none text-[20px] font-normal'} placeholder={'Search'} />
   <div className={'flex flex-row mr-[20px] gap-[4px] text-[16px]'}>
    <span className={'py-[3px] px-[6px] bg-border-light rounded-[3px]'}>CTRL</span>
    <span className={'py-[3px] px-[7px] bg-border-light rounded-[3px]'}>K</span>
   </div>
  </div>
 )
}

export default Search
