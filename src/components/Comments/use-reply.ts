import { useSignal } from '@preact/signals'
import type { Comment } from '@prisma/client'
import type { Ref } from 'preact/hooks'

export const useReply = (onReplyScrollTo: Ref<HTMLTextAreaElement>) => {
  const reply = useSignal<Comment | undefined>(undefined)

  const onChangeReply = (comment?: Comment) => {
    reply.value = comment

    if (onReplyScrollTo.current !== null) {
      onReplyScrollTo.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    reply: reply.value,
    onChangeReply,
    cancelReplyTo: () => (reply.value = undefined)
  }
}
