export const SubmitError = (props: { error: string }) => (
  <div className={'flex flex-row gap-[20px] justify-center items-center'}>
    <span className={'text-red'}>{props.error}</span>
  </div>
)
