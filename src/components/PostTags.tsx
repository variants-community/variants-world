import TimeIcon from './icons/TimeIcon'

type PostTagsProps = {
  rules: string[]
  className?: string
  iconsClassName?: string
};

const PostTags = (props: PostTagsProps) => {
  return (
    <div>
      <ul className={'flex flex-row items-center list-none gap-[10px] text-[14px] font-bold'}>
        {props.rules.map((rule) => <li className={`flex flex-row whitespace-nowrap bg-dark border border-border-dark rounded-[3px] py-[5px] pr-[5px]  ${props.className}`} key={rule}><TimeIcon className={`mx-[7px] ${props.iconsClassName}`} /><span>{rule}</span></li>)}
      </ul>
    </div>
  )
}

export default PostTags
