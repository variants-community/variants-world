type RuleItemProps = {
  ruleName: string
  class?: string
}

export const RuleItem = (props: RuleItemProps) => {
  return (
    <li
      class={`h-5 sm:h-7 flex flex-row items-center gap-[5px] whitespace-nowrap bg-dark border border-border-dark rounded px-[5px] ${props.class}`}
    >
      <span>{props.ruleName}</span>
    </li>
  )
}
