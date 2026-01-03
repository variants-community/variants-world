import { useState } from 'preact/hooks'
import type { TokenPayloadType } from 'utils/auth'

// Note: Convex doesn't have built-in presence like Supabase
// This is a simplified version that just returns the current user
// For full presence, you would need to implement a custom solution using Convex mutations/queries

export const usePresence = (postId: string, user: TokenPayloadType) => {
  const [usersOnPost] = useState<TokenPayloadType[]>([user])

  // TODO: Implement presence tracking with Convex if needed
  // This would require:
  // 1. A presence table in Convex
  // 2. Mutations to track/untrack users
  // 3. A query to get current users on a post
  // 4. Periodic cleanup of stale presence records

  return {
    usersOnPost
  }
}
