import type { Comment } from '@prisma/client'
import { useState } from 'preact/hooks'

export const useReply = () => {
  const [replyTo, setReplyTo] = useState<Comment | undefined>()

  return {
    replyTo: replyTo,
    setReplyTo: setReplyTo,
    cancelReplyTo: () => setReplyTo(undefined)
  }
}
