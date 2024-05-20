import { usePresence } from 'components/presence/use-presence'
import type { TokenPayloadType } from 'utils/auth'

type PresenceProps = {
  postId: number
  user: TokenPayloadType
}

const PresentUsers = (props: PresenceProps) => {
  const { usersOnPost } = usePresence(props.postId, props.user)
  return (
    <div class={'flex flex-row-reverse w-full py-3'}>
      {usersOnPost.map((user, i) => (
        <div class={`group relative h-8 w-8  ${i ? 'mr-[-5px]' : ''}`}>
          <img
            key={`${user.id}${i}`}
            class={` h-8 w-8 rounded-full ring-primary ring-3 shadow-dark`}
            src={user.profileUrl ?? '/assets/images/user.png'}
          />
          <PresentUsersPopup username={user.username} />
        </div>
      ))}
    </div>
  )
}

type PresencePopupProps = {
  username: string
}

const PresentUsersPopup = ({ username }: PresencePopupProps) => {
  return (
    <div class="absolute bottom-[-40px]  px-2 py-1 rounded-md shadow bg-border-light border-1 border-border-dark opacity-0 group-hover:opacity-[100%] transition-all duration-100 easy-in z-1">
      <span>{username}</span>
    </div>
  )
}

export default PresentUsers
