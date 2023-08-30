import { RuleItem } from 'components/PostTags/RuleItem'

type PostTagsProps = {
  postId?: number
  isEditMode?: boolean
  rules: string[]
  class?: string
  iconsclass?: string
  ulclass?: string
}

const PostTags = (props: PostTagsProps) => {
  return (
    <div>
      <ul
        class={`flex flex-wrap items-center list-none gap-[5px] sm:gap-[10px] text-[12px] sm:text-[14px] font-bold ${props.ulclass}`}
      >
        {props.rules.sort().map(rule => (
          <RuleItem key={rule} ruleName={rule} class={props.class} />
        ))}
      </ul>
    </div>
  )
}

export default PostTags
