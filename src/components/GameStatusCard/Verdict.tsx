type VerdictProps = {
  isEditMode: boolean
  verdict: string
  onChange: (e: Event) => void
}

export const Verdict = (props: VerdictProps) => (
  <>
    {!props.isEditMode ? (
      <p class={'text-[16px] font-semibold mt-[7px] mb-[20px] text-center'}>{props.verdict}</p>
    ) : (
      <textarea
        value={props.verdict}
        onChange={props.onChange}
        type="text"
        rows={5}
        class={'w-full bg-dark rounded-[3px] text-[16px] font-semibold mt-[7px] mb-[20px] text-center outline-none'}
      />
    )}
  </>
)
