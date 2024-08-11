import { cl } from 'utils/hepers'
import type { JSX } from 'preact/jsx-runtime'

type PostUserProps = {
  username: string
  profileUrl?: string | null
  children?: JSX.Element | false
}

const PostUser = (props: PostUserProps) => {
  return (
    <div class={cl('flex flex-row items-center gap-2', props.children ? 'leading-[1.3]' : '')}>
      <img
        src={props.profileUrl ?? '/assets/images/user.png'}
        alt={props.username}
        class="min-h-5.5 min-w-5.5 h-5.5 w-5.5 sm:(h-6 w-6) rounded-md"
      />
      <div class={`${props.children ? 'hidden sm:block ' : ''}`}>
        <span class={'font-semibold'}>{props.username}</span>
        {props.children}
      </div>
    </div>
  )
}

export default PostUser
