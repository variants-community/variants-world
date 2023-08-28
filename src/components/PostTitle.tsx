type PostTitleProps = {
  isEditMode?: boolean
  onTypeChange?: (e: Event) => void
  onTitleChange?: (e: Event) => void
  type: string
  title: string
  linkTo?: string
}

const PostTitle = (props: PostTitleProps) => {
  return (
    <div class={'flex flex-row items-center text-white gap-4 font-semibold'}>
      {props.isEditMode ? (
        <select
          value={props.type}
          onChange={props.onTypeChange}
          class={'bg-gray py-[7px] px-[10px] rounded outline-none text-[24px]'}
        >
          <option value={'WOF'}>WOF</option>
          <option value={'NCV'}>NCV</option>
        </select>
      ) : (
        <h1 class={'bg-gray py-[9px] px-[15px] rounded text-[24px]'}>{props.type}</h1>
      )}
      {props.isEditMode ? (
        <input
          value={props.title}
          onChange={props.onTitleChange}
          class={'w-full bg-dark rounded outline-none text-[28px]'}
        />
      ) : (
        <a href={props.linkTo} class={'text-[28px]'}>
          {props.title}
        </a>
      )}
    </div>
  )
}

export default PostTitle
