type PostTagsProps = {
  rules: string[];
  className?: string;
  iconsClassName?: string;
  ulClassName?: string;
};

const PostTags = (props: PostTagsProps) => {
  return (
    <div>
      <ul
        className={`flex flex-wrap items-center list-none gap-[10px] text-[14px] font-bold ${props.ulClassName}`}
      >
        {props.rules.map((rule, i) => (
          <li
            className={`flex flex-row whitespace-nowrap bg-dark border border-border-dark rounded-[3px] py-[5px] px-[5px]  ${props.className}`}
            key={i}
          >
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostTags
