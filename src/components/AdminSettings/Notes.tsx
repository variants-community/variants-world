type NotesProps = {
  notes: string | null
  onChangeNotes: (e: Event) => void
}

export const Notes = (props: NotesProps) => (
  <div class={'flex flex-col'}>
    <h2 class={'text-primary font-semibold'}>Notes</h2>
    <textarea
      placeholder={'Private notes of CGA Team'}
      value={props.notes ?? ''}
      onChange={props.onChangeNotes}
      rows={4}
      class={'h-full w-full lg:w-94 p-2 mt-[6px] font-semibold bg-dark darkborder rounded outline-none resize-none'}
    />
  </div>
)
