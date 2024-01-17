type RuleItemProps = {
  ruleName: string
  class?: string
}

const RULE_ITEM_MAX_SIZE = 50

const minimize = (ruleName: string) => {
  return ruleName.length > RULE_ITEM_MAX_SIZE ? `${ruleName.substring(0, RULE_ITEM_MAX_SIZE - 10)}...` : ruleName
}

export const RuleItem = (props: RuleItemProps) => {
  return (
    <li
      class={`h-5 sm:h-7 flex flex-row items-center gap-[5px] whitespace-nowrap bg-dark border border-border-dark rounded px-[5px] ${props.class}`}
    >
      <span
        data-tooltip={props.ruleName.length > RULE_ITEM_MAX_SIZE ? props.ruleName : undefined}
        data-tooltip-position="bottom"
      >
        {minimize(props.ruleName)}
      </span>
    </li>
  )
}
