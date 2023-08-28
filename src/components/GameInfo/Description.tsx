type DescriptionProps = {
  isEditMode: boolean
  value: string
  onDescriptionChange: (e: Event) => void
}

export const Description = (props: DescriptionProps) => {
  return (
    <div class={'flex flex-col text-[16px] '}>
      <h2 class={'text-secondary font-semibold'}>Description</h2>
      {props.isEditMode ? (
        <textarea
          rows={15}
          value={props.value}
          onChange={props.onDescriptionChange}
          class={'h-full bg-dark outline-none rounded'}
        />
      ) : (
        <p>{props.value}</p>
      )}
    </div>
  )
}
