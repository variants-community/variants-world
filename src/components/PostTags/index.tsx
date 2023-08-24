import { RuleItem } from './RuleItem'

type PostTagsProps = {
  postId?: number;
  isEditMode?: boolean;
  rules: string[];
  className?: string;
  iconsClassName?: string;
  ulClassName?: string;
};

const PostTags = (props: PostTagsProps) => {
  // const { rules, edit, remove, add } = usePostTagsEditMode(
  //   props.rules,
  //   props.postId,
  // )

  // const withEditingMode = !!props.postId // if the postId is not passed - there is no possibility to edit

  return (
    <div>
      <ul
        className={`flex flex-wrap items-center list-none gap-[10px] text-[14px] font-bold ${props.ulClassName}`}
      >
        {/* {withEditingMode && rules.sort().map((rule) => (
          <RuleItemEditable
            key={rule}
            ruleName={rule}
            isEditMode={props.isEditMode ?? false}
            className={props.className}
            onRemove={() => remove?.(rule)}
            edit={edit}
          />
        ))}
        {withEditingMode && props.isEditMode && (
          <AddRuleButton addRule={add} className={props.className} />
        )} */}
        {props.rules.sort().map((rule) => (
          <RuleItem
            key={rule}
            ruleName={rule}
            className={props.className}
          />
        ))}
      </ul>
    </div>
  )
}

export default PostTags
