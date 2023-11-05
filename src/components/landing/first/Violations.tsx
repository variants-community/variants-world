import CrossIcon from 'components/icons/CrossIcon'

type ViolationsProps = {
  violations?: string[]
}

export const Violations = (props: ViolationsProps) => {
  return (
    <>
      {props.violations && (
        <div class="text-red">
          {props.violations.map((violation, i) => (
            <div class="flex flex-row gap-1.5 font-semibold">
              <CrossIcon key={i} class="fill-red w-2" />
              <span>{violation}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
