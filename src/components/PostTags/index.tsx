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
  // const { rules, edit, remove, add } = usePostTagsEditMode(
  //   props.rules,
  //   props.postId,
  // )

  // const withEditingMode = !!props.postId // if the postId is not passed - there is no possibility to edit

  return (
    <div>
      <ul class={`flex flex-wrap items-center list-none gap-[10px] text-[14px] font-bold ${props.ulclass}`}>
        {/* {withEditingMode && rules.sort().map((rule) => (
          <RuleItemEditable
            key={rule}
            ruleName={rule}
            isEditMode={props.isEditMode ?? false}
            class={props.class}
            onRemove={() => remove?.(rule)}
            edit={edit}
          />
        ))}
        {withEditingMode && props.isEditMode && (
          <AddRuleButton addRule={add} class={props.class} />
        )} */}
        {props.rules.sort().map(rule => (
          <RuleItem key={rule} ruleName={rule} class={props.class} />
        ))}
      </ul>
    </div>
  )
}

export default PostTags
