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
     className={'h-full w-[375px] p-[10px] mt-[6px] font-[16px] font-semibold bg-dark border border-[2px] border-border-dark rounded-[3px] outline-none resize-none'}
   />
 </div>
)