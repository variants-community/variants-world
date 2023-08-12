type DescriptionProps = {
  isEditMode: boolean;
  value: string;
  onDescriptionChange: (e: Event) => void;
};

export const Description = (props: DescriptionProps) => {
  return (
    <div className={'flex flex-col text-[16px] '}>
      <h2 className={'text-secondary font-semibold'}>Description</h2>
      {props.isEditMode
        ? (
          <textarea
            rows={15}
            value={props.value}
            onChange={props.onDescriptionChange}
            className={'h-full bg-dark outline-none rounded-[3px]'}
          />
        )
        : <p>{props.value}</p>}
    </div>
  )
}
