import { useEffect, useState, useRef } from 'preact/hooks'
import { getConvexClient } from 'src/lib/convex-client'
import type { TokenPayloadType } from 'utils/auth'

const HEARTBEAT_INTERVAL = 10000 // 10 seconds

// Store user info by visibleId for lookup when presence updates
const userInfoCache = new Map<number, { username: string; profileUrl?: string }>()

export const usePresence = (postId: number, user: TokenPayloadType) => {
  const [usersOnPost, setUsersOnPost] = useState<TokenPayloadType[]>([user])
  const sessionIdRef = useRef<string | null>(null)
  const convex = getConvexClient()

  // Cache current user's info
  useEffect(() => {
    userInfoCache.set(user.id, { username: user.username, profileUrl: user.profileUrl })
  }, [user.id, user.username, user.profileUrl])

  // Set up heartbeat and subscription
  useEffect(() => {
    let heartbeatInterval: number | undefined
    let unsubscribe: (() => void) | undefined
    let currentSessionToken: string | null = null

    // Generate a unique session ID for this effect instance
    const sessionId = `${postId}-${user.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`
    sessionIdRef.current = sessionId

    const sendHeartbeat = async () => {
      try {
        const { api } = await import('../../../convex/_generated/api')
        console.log('Sending presence heartbeat:', { roomId: `post-${postId}`, userId: String(user.id), sessionId })
        const result = await convex.mutation(api.presence.heartbeat, {
          roomId: `post-${postId}`,
          userId: String(user.id),
          sessionId,
          interval: HEARTBEAT_INTERVAL,
        })
        console.log('Presence heartbeat result:', result)
        currentSessionToken = result.sessionToken
        return result
      } catch (error) {
        console.error('Failed to send presence heartbeat:', error)
        return null
      }
    }

    const setup = async () => {
      // Send initial heartbeat
      const result = await sendHeartbeat()
      if (!result) return

      // Set up periodic heartbeat
      heartbeatInterval = window.setInterval(sendHeartbeat, HEARTBEAT_INTERVAL)

      // Subscribe to presence list
      const { api } = await import('../../../convex/_generated/api')
      unsubscribe = convex.onUpdate(
        api.presence.list,
        { roomToken: result.roomToken },
        async (presenceList: Array<{ userId: string; online: boolean }>) => {
          console.log('Presence list update:', presenceList)
          if (presenceList) {
            // Filter to only online users
            const onlinePresence = presenceList.filter(p => p.online)
            
            // Fetch user info for users not in cache
            const { api } = await import('../../../convex/_generated/api')
            const onlineUsers: TokenPayloadType[] = []
            
            for (const p of onlinePresence) {
              const visibleId = parseInt(p.userId, 10)
              
              // Check if it's the current user
              if (visibleId === user.id) {
                onlineUsers.push(user)
                continue
              }
              
              // Check cache first
              let cached = userInfoCache.get(visibleId)
              
              // If not in cache, fetch from Convex
              if (!cached) {
                try {
                  const userData = await convex.query(api.users.getByVisibleId, { visibleId })
                  if (userData) {
                    cached = { username: userData.username, profileUrl: userData.profileUrl }
                    userInfoCache.set(visibleId, cached)
                  }
                } catch (e) {
                  console.error('Failed to fetch user info:', e)
                }
              }
              
              onlineUsers.push({
                id: visibleId,
                username: cached?.username ?? `User ${visibleId}`,
                profileUrl: cached?.profileUrl,
                role: 'MEMBER' as const,
                guest: false,
              })
            }
            
            console.log('Setting usersOnPost:', onlineUsers)
            setUsersOnPost(onlineUsers)
          }
        }
      )
    }

    setup()

    // Cleanup on unmount
    return () => {
      if (heartbeatInterval) window.clearInterval(heartbeatInterval)
      if (unsubscribe) unsubscribe()
      
      // Send disconnect
      if (currentSessionToken) {
        const token = currentSessionToken
        import('../../../convex/_generated/api').then(({ api }) => {
          convex.mutation(api.presence.disconnect, { sessionToken: token }).catch(e => {
            console.error('Failed to disconnect presence:', e)
          })
        })
      }
    }
  }, [postId, user.id, user.username, user.profileUrl])

  return {
    usersOnPost
  }
}
