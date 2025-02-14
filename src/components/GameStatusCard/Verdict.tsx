import { getValueFromEvent } from 'utils/hepers'
import { highlightLinks } from 'utils/formatters'

type VerdictProps = {
  isEditMode: boolean
  verdict: string | null
  onChange: (verdict: string) => void
}

export const Verdict = (props: VerdictProps) => (
  <>
    {!props.isEditMode ? (
      <p class={'font-semibold mt-2 mb-5 text-center break-words whitespace-pre-wrap'}>
        {highlightLinks(props.verdict ?? '')}
      </p>
    ) : (
      <textarea
        value={props.verdict ?? ''}
        onChange={e => props.onChange(getValueFromEvent(e))}
        rows={3}
        class={'w-full bg-dark rounded font-semibold mt-2 mb-5 text-center outline-none darkborder'}
      />
    )}
  </>
)
