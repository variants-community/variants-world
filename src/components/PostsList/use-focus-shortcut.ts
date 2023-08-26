import { useEffect } from 'preact/hooks'

export const useCtrlKFocus = () => {
  useEffect(() => {
    window.addEventListener('keydown', function (e) {
      if (e.ctrlKey && e.key === 'k') {
        if (document.getElementById('index-page-search') !== document.activeElement) {
          e.preventDefault()
          document.getElementById('index-page-search')?.focus()
        } else {
          return true
        }
      }
    })
  })
}
