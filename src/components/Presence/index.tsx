import { usePresence } from 'components/Presence/use-presence'
import type { AuthentificatedUser } from 'db/supabase/auth'

type PresenceProps = {
  postId: number
  user: AuthentificatedUser
}

const Presence = (props: PresenceProps) => {
  const { usersOnPost } = usePresence(props.postId, props.user)
  return (
    <>
      {usersOnPost.length > 0 && (
        <div class={'flex flex-row justify-end items-center'}>
          {usersOnPost.map((user, i) => (
            <img
              class={`h-10 w-10 rounded-full ${i === 0 ? '' : 'mr-[-20px]'} order-${i + 1}`}
              src="/src/assets/images/user.png"
              title={user.username}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Presence
