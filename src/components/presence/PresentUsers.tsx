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
        <img
          key={`${user.id}${i}`}
          class={`h-8 w-8 rounded-full ring-primary ring-3 shadow-dark
          ${i ? 'mr-[-5px]' : ''}`}
          src="/assets/images/user.png"
          title={user.username}
        />
      ))}
    </div>
  )
}

export default PresentUsers
