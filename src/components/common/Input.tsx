import { type HTMLProps } from 'preact/compat'

export const Input = (props: { onEnter?: () => void; onCtrlEnter?: () => void } & HTMLProps<HTMLInputElement>) => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey || e.altKey || e.metaKey) return
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur()
      if (e.ctrlKey) props.onCtrlEnter?.()
      else props.onEnter?.()
    }
  }

  return <input {...props} onKeyDown={e => void (onKeyDown(e), props.onKeyDown?.(e))} />
}
