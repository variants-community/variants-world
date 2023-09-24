import type { Ref } from 'preact/hooks'

export const useCtrlEnterToSend = (
  input: Ref<HTMLTextAreaElement> | Ref<HTMLInputElement>,
  send: () => Promise<void>
) => {
  if (input.current) {
    input.current.onkeydown = async e => {
      e.key === 'Enter' && !e.altKey && e.ctrlKey && !e.metaKey && !e.shiftKey && (await send())
    }
  }
}
