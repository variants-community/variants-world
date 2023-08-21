type RuleItemProps = {
  ruleName: string;
  className?: string;
};

export const RuleItem = (props: RuleItemProps) => {
  return (
    <li
      className={`h-[26px] flex flex-row gap-[5px] whitespace-nowrap bg-dark border border-border-dark rounded-[3px] py-[5px] px-[5px] ${props.className}`}
    >
      <span>{props.ruleName}</span>
    </li>
  )
}
