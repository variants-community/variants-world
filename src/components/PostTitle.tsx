type PostTitleProps = {
  isEditMode?: boolean;
  onTypeChange?: (e: Event) => void;
  onTitleChange?: (e: Event) => void;
  type: string;
  title: string;
  linkTo?: string;
};

const PostTitle = (props: PostTitleProps) => {
  return (
    <div
      className={'flex flex-row items-center text-white gap-[15px] font-semibold'}
    >
      {props.isEditMode
        ? (
          <select
            value={props.type}
            onChange={props.onTypeChange}
            className={'bg-gray py-[7px] px-[10px] rounded-[3px]  font-[Glory] outline-none text-[24px]'}
          >
            <option value={'WOF'}>WOF</option>
            <option value={'NCV'}>NCV</option>
          </select>
        )
        : (
          <h1
            className={'bg-gray py-[9px] px-[15px] rounded-[3px] font-[Glory] text-[24px]'}
          >
            {props.type}
          </h1>
        )}
      {props.isEditMode
        ? (
          <input
            value={props.title}
            onChange={props.onTitleChange}
            className={'w-full bg-dark rounded-[3px] outline-none text-[28px]'}
          />
        )
        : <a href={props.linkTo} className={'text-[28px]'}>{props.title}</a>}
    </div>
  )
}

export default PostTitle
