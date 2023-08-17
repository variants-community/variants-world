import type { ErrorMessage } from '../../pages/api/posts/create'



export const SubmitError = (props: {error: ErrorMessage}) => (
  <div className={'flex flex-row gap-[20px] justify-center items-center'}>
    <span className={'text-red'}>
     {props.error.message}
    </span>
    {props.error.details && <p>{props.error.details}</p>}
  </div>
)
