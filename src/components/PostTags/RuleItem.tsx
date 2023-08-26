type RuleItemProps = {
  ruleName: string
  class?: string
}

export const RuleItem = (props: RuleItemProps) => {
  return (
    <li
      class={`h-[26px] flex flex-row gap-[5px] whitespace-nowrap bg-dark border border-border-dark rounded-[3px] py-[5px] px-[5px] ${props.class}`}
    >
      <span>{props.ruleName}</span>
    </li>
  )
}
