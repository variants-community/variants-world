import EditIcon from 'components/icons/EditIcon'

type EditButtonProps = {
  className?: string
  onClick: () => void
}

export const EditButton = (props: EditButtonProps) => (
  <div onClick={() => props.onClick()} className={'cursor-pointer '}>
    <EditIcon className={props.className} />
  </div>
)
