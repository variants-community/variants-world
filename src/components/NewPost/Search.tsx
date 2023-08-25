import { getValueFromEvent } from '../../utils/hepers'
import SpinnerIcon from '../icons/SpinnerIcon'

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  isSearching: boolean;
  isLoading: boolean;
  isInvalidId: boolean;
};

export const Search = (props: SearchProps) => (
  <div
    className={` z-10 flex flex-row items-center mx-auto bg-dark border border-[2px] border-border-dark shadow-light text-text font-[400] rounded-full items-center transition-all duration-1000 ${
      props.isSearching
        ? 'w-10/11 px-[18px] pt-[13px] pb-[12px] gap-[8px] mt-[100px] sm:(w-[492px] px-[18px] pt-[13px] pb-[12px] gap-[8px] mt-[100px])'
        : 'w-11/12 px-[20px] pt-[15px] pb-[14px] gap-[8px] sm:(w-[762px] px-[28px] pt-[16px] pb-[16px] gap-[14px])'
    }`}
  >
    <span
      className={`${
        props.isSearching ? 'text-[23px]' : 'text-[24px] sm:text-[38px]'
      } transition-all duration-1000`}
    >
      #
    </span>
    <input
      value={props.value}
      onInput={(e) => props.onChange(getValueFromEvent(e))}
      className={`w-full  bg-dark outline-none ${
        props.isSearching ? 'text-[18px]' : 'text-[22px] sm:text-[29px]'
      } transition-all duration-1000`}
      type="text"
      placeholder={'game number or link'}
    />
    {props.isLoading && <SpinnerIcon className="h-[20px] w-[20px]" />}
    {/* {props.isInvalidId && <CrossIcon />} */}
  </div>
)
