import EditIcon from 'components/icons/EditIcon'

type EditButtonProps = {
  class?: string
  onClick: () => void
}

export const EditButton = (props: EditButtonProps) => (
  <div onClick={() => props.onClick()} class={'cursor-pointer '}>
    <EditIcon class={props.class} />
  </div>
)
