type VerdictProps = {
  isEditMode: boolean
  verdict: string
  onChange: (e: Event) => void
}

export const Verdict = (props: VerdictProps) => (
  <>
    {!props.isEditMode ? (
      <p class={'font-semibold mt-2] mb-5 text-center'}>{props.verdict}</p>
    ) : (
      <textarea
        value={props.verdict}
        onChange={props.onChange}
        type="text"
        rows={4}
        class={'w-full bg-dark rounded font-semibold mt-2 mb-5 text-center outline-none'}
      />
    )}
  </>
)
