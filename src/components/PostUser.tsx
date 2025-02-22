import { cl } from 'utils/hepers'
import LockedIcon from 'components/icons/Locked'
import type { JSX } from 'preact/jsx-runtime'

type PostUserProps = {
  username: string
  isLocked: boolean
  profileUrl?: string | null
  children?: JSX.Element | false
}

const PostUser = (props: PostUserProps) => {
  return (
    <div
      class={cl(
        'flex flex-row items-center gap-2 overflow-hidden text-ellipsis min-h-6',
        props.children ? 'leading-[1.3]' : ''
      )}
    >
      <img
        src={props.profileUrl ?? '/assets/images/user.png'}
        alt={props.username}
        class="min-h-5.5 min-w-5.5 h-5.5 w-5.5 sm:(h-6 w-6) rounded-md"
      />
      <div class={cl('overflow-hidden text-ellipsis', props.children ? 'hidden sm:block ' : '')}>
        <span class={'font-semibold'}>{props.username}</span>
        {props.children}
      </div>
      {props.isLocked && (
        <span class="mt-0.25" data-tooltip="Locked" data-tooltip-position="right">
          <LockedIcon class="-ml-1" />
        </span>
      )}
    </div>
  )
}

export default PostUser
