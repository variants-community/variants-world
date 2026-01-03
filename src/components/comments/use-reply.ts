import { useSignal } from '@preact/signals'
import type { Ref } from 'preact/hooks'
import type { ExtendedComment } from 'components/comments/index'

export const useReply = (onReplyScrollTo: Ref<HTMLTextAreaElement>) => {
  const reply = useSignal<ExtendedComment | undefined>(undefined)

  const onChangeReply = (comment?: ExtendedComment) => {
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
