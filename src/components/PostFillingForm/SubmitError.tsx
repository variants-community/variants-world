export const SubmitError = (props: { error: string }) => (
  <div class={'flex flex-row justify-center items-center gap-5'}>
    <span class={'text-red'}>{props.error}</span>
  </div>
)
