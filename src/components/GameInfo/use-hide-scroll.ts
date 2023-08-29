import { useEffect } from 'preact/hooks'

export const useHideScroll = () => {
  useEffect(() => {
    const container = document.querySelector('.description-scrollbar')
    if (container != null && container.parentElement) {
      if (container.scrollHeight > container.parentElement?.clientHeight) {
        container.classList.add('overflow-y-auto')
      }
    }
  })
}
