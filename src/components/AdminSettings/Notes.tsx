type NotesProps = {
  notes: string | null;
  onChangeNotes: (e: Event) => void;
};

export const Notes = (props: NotesProps) => (
  <div className={'flex flex-col'}>
    <h2 className={'text-primary font-[16px] font-semibold'}>Notes</h2>
    <textarea
      placeholder={'Private notes of CGA Team'}
      value={props.notes ?? ''}
      onChange={props.onChangeNotes}
      rows={4}
      className={'h-full w-full lg:w-[375px] p-[10px] mt-[6px] font-[16px] font-semibold bg-dark bold-border rounded-[3px] outline-none resize-none'}
    />
  </div>
)
