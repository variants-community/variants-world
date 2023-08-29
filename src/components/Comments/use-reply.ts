import { scrollToElement } from 'utils/hepers'
import { useSignal } from '@preact/signals'
import type { Comment } from '@prisma/client'

export const useReply = () => {
  const reply = useSignal<Comment | undefined>(undefined)

  const onChangeReply = (comment?: Comment) => {
    reply.value = comment
    if (comment) {
      scrollToElement('comment-input')
    }
  }

  return {
    reply: reply.value,
    onChangeReply,
    cancelReplyTo: () => (reply.value = undefined)
  }
}
