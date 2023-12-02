import CrossIcon from 'components/icons/CrossIcon'

type ViolationsProps = {
  violations?: { message: string; active: boolean }[]
  activeExists: boolean
}

export const Violations = (props: ViolationsProps) => {
  return (
    <>
      {props.violations && (
        <div class="text-red">
          {props.violations.map(({ message, active }, i) => (
            <div
              key={i}
              class={`flex flex-row gap-1.5 font-semibold w-fit transition-opacity ${
                !props.activeExists || active ? '' : 'opacity-50'
              }`}
            >
              <CrossIcon class="fill-red w-2" />
              <span>{message}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
