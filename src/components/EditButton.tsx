import CheckMarkIcon from 'components/icons/CheckMarkIcon'
import CrossIcon from 'components/icons/CrossIcon'
import EditIcon from 'components/icons/EditIcon'

type EditButtonProps = {
  class?: string
  value: boolean
  start: () => void
  apply: () => void
  cancel: () => void
}

export const EditButton = (props: EditButtonProps) => {
  const classlist = `cursor-pointer select-all fill-text hover:fill-secondary ${props.class}`
  return props.value ? (
    <div class={'flex  items-center'}>
      <span onClick={() => props.apply()}>
        <CheckMarkIcon class={`w-8 h-9 px-2 py-2.5 ${classlist}`} />
      </span>
      <span onClick={() => props.cancel()}>
        <CrossIcon class={`w-7.2 h-8.2 px-2 py-2.5 ${classlist}`} />
      </span>
    </div>
  ) : (
    <span onClick={() => props.start()}>
      <EditIcon class={`w-8 h-9 px-2 py-2.5 ${classlist}`} />
    </span>
  )
}
