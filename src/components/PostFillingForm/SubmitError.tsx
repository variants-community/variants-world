export const SubmitError = (props: { error: string }) => (
  <div class={'flex flex-row gap-[20px] justify-center items-center'}>
    <span class={'text-red'}>{props.error}</span>
  </div>
)
