import { useState } from 'preact/hooks'
import type { Comment } from '@prisma/client'

export const useReply = () => {
  const [replyTo, setReplyTo] = useState<Comment | undefined>()

  return {
    replyTo,
    setReplyTo,
    cancelReplyTo: () => setReplyTo(undefined)
  }
}
