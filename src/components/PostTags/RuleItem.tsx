type RuleItemProps = {
  ruleName: string
  class?: string
}

const RULE_ITEM_MAX_SIZE = 50

const minimizeRule = (ruleName: string) => {
  if (ruleName.length > RULE_ITEM_MAX_SIZE) {
    let min = ruleName.substring(0, RULE_ITEM_MAX_SIZE - 10)
    if (min.endsWith(',')) {
      min = ruleName.substring(0, RULE_ITEM_MAX_SIZE - 11)
    }
    return `${min}...`
  } else return ruleName
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
        {minimizeRule(props.ruleName)}
      </span>
    </li>
  )
}
