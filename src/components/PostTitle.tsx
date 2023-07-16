type PostTitleProps = {
  type: string;
  title: string;
  linkTo?: string;
};

const PostTitle = (props: PostTitleProps) => {
  return (
    <div
      className={'flex flex-row items-center text-white gap-[15px] font-semibold'}
    >
      <h1
        className={'bg-gray py-[9px] px-[15px] rounded-[3px] text-[24px] font-[Glory]'}
      >
        {props.type}
      </h1>
      <a href={props.linkTo} className={'text-[28px]'}>{props.title}</a>
    </div>
  )
}

export default PostTitle
