import { supabase } from 'db/supabase/supabase'
import { useEffect, useState } from 'preact/hooks'
import type { RealtimePresenceState } from '@supabase/supabase-js'
import type { TokenPayloadType } from 'utils/auth'

const mapPresenceState = (state: RealtimePresenceState) => {
  return Object.keys(state)
    .map(presenceId => {
      const presences = state[presenceId] as unknown as {
        user: TokenPayloadType
      }[]

      return presences.map(presence => presence.user)
    })
    .flat()
}

export const usePresence = (postId: number, user: TokenPayloadType) => {
  const [usersOnPost, setUsersOnPost] = useState<TokenPayloadType[]>([])

  useEffect(() => {
    const channel = supabase
      .channel(`room-${postId}`, {
        config: {
          presence: { key: user.id.toString() }
        }
      })
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState()
        const users = mapPresenceState(presenceState)
        setUsersOnPost(users)
      })
      .subscribe(async status => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user,
            // eslint-disable-next-line camelcase
            online_at: new Date().toISOString()
          })
        }
      })

    return () => {
      channel.unsubscribe()
    }
  }, [user.id])

  return {
    usersOnPost
  }
}
