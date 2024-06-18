import type { DetailsUnderCursor } from 'components/AdvancedSearch/use-core'
import type { ReadonlySignal } from '@preact/signals'

type AutoCompletionProps = {
  detailsUnderCursor: ReadonlySignal<DetailsUnderCursor | undefined>
}

export const useAutoCompletion = ({ detailsUnderCursor }: AutoCompletionProps) => {
  const autoCompletionWith = ({ hint }: { hint?: string }) => {
    // replace key:search pair with actually data

    if (!detailsUnderCursor.value || !hint) return

    const { baseNode } = detailsUnderCursor.value

    // if (baseNode.textContent) {
    //   if (hint.startsWith(baseNode.textContent)) {
    //     baseNode.textContent += hint.slice(baseNode.textContent.length - 1)
    //   } else {
    //     baseNode.textContent = `${baseNode.textContent}${hint}`
    //   }
    // } else {
    //   baseNode.textContent = `${hint}`
    // }
    baseNode.textContent = baseNode.textContent
      ? hint.startsWith(baseNode.textContent)
        ? baseNode.textContent + hint.slice(baseNode.textContent.length, hint.length)
        : `${baseNode.textContent}${hint}`
      : `${hint}`

    const range = document.createRange()
    const sel = window.getSelection()
    if (sel) {
      range.setStart(baseNode, baseNode.textContent.length)
      range.collapse(true)
      console.log('range: ', range)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }

  return {
    autoCompletionWith
  }
}
