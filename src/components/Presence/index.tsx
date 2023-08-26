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
        <div className={'flex flex-row items-center text-[24px]'}>
          <span className={'mr-[10px]'}>Here now:</span>
          <div className={'flex flex-wrap gap-[10px] font-semibold'}>
            {usersOnPost.map(u => (
              <span className={'px-[5px] py-[2px] bg-gray rounded'} key={u.id}>
                {u.username}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Presence
