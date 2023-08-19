import { RuleItem } from './RuleItem'
import { AddRuleButton } from './AddRuleButton'
import { usePostTagsEditMode } from './usePostTagsEditMode'

type PostTagsProps = {
  postId: number;
  isEditMode: boolean;
  rules: string[];
  className?: string;
  iconsClassName?: string;
  ulClassName?: string;
};

const PostTags = (props: PostTagsProps) => {
  const { rules, edit, remove, add } = usePostTagsEditMode(
    props.postId,
    props.rules,
  )

  return (
    <div>
      <ul
        className={`flex flex-wrap items-center list-none gap-[10px] text-[14px] font-bold ${props.ulClassName}`}
      >
        {rules.sort().map((rule) => (
          <RuleItem
            key={rule}
            ruleName={rule}
            isEditMode={props.isEditMode}
            className={props.className}
            onRemove={() => remove(rule)}
            edit={edit}
          />
        ))}
        {props.isEditMode && (
          <AddRuleButton addRule={add} className={props.className} />
        )}
      </ul>
    </div>
  )
}

export default PostTags
