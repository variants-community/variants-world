import { useSignal } from '@preact/signals'

export const AdvancedPostsSearch = () => {
  // const lock = useSignal(0)

  const onInput = (e: InputEvent) => {
    console.log('input: ', e)
    if (!e.target) return
    const input = e.target as HTMLDivElement

    console.log('start iterate')
    for (const node of getTextNodes(input)) {
      console.log('iteration: ', node)

      // if (lock.value > 3) return
      const text = node.textContent
      if (!text) return

      const reg = /\w+:/gm
      const match = reg.exec(text)

      if (!match) return

      const before = document.createTextNode(text.substring(0, match.index))
      const after = document.createTextNode(text.substring(match.index + match[0].length, text.length))
      const { wrapperSpan: key, valueSpan, keySpan } = createBubble(match[0])

      node.replaceWith(before, key, after)
      // console.log('node: ', )
      // node.replaceChildren(before, after)

      setTimeout(() => {
        const range = document.createRange()
        range.selectNode(valueSpan)
        range.setStart(valueSpan, 0)
        const selection = window.getSelection()

        console.log('range: ', range)
        selection.removeAllRanges()
        selection.addRange(range)
      }, 1)

      // const range = document.createRange()
      // const sel = window.getSelection()
      // if (sel) {
      //   range.setStart(valueSpan, 0)
      //   range.collapse(true)
      //   sel.removeAllRanges()
      //   sel.addRange(range)
      // }

      // valueSpan.onload =
      // const len = 0/
      // valueSpan.focus()

      // Mostly for Web Browsers
      // if (valueSpan.setSelectionRange) {
      //   valueSpan.focus()
      //   valueSpan .setSelectionRange(len, len)
      // } else if (valueSpan.createTextRange) {
      //   const t = valueSpan.createTextRange()
      //   t.collapse(true)
      //   t.moveEnd('character', len)
      //   t.moveStart('character', len)
      //   t.select()
      // }

      // valueSpan.focus()

      // console.log('val span: ', valueSpan)

      console.log('match: ', match)
      console.log('before: [', before, ']')

      console.log('after: [', after, ']')
      // lock.value += 1
    }
  }
  return (
    <div>
      <div contentEditable onInput={onInput}></div>
    </div>
  )
}
const createBubble = (key: string) => {
  const wrapperSpan = document.createElement('span')
  wrapperSpan.className = 'tag'

  const keySpan = document.createElement('span')
  keySpan.className = 'tag-key'
  keySpan.textContent = key

  const valueSpan = document.createElement('span')
  valueSpan.className = 'tag-val'
  valueSpan.textContent = '&#8203;'
  // wrapperSpan.append(keySpan, valueSpan)

  return {
    wrapperSpan,
    keySpan: wrapperSpan.appendChild(keySpan),
    valueSpan: wrapperSpan.appendChild(valueSpan)
  }
}

const getTextNodes = (element: HTMLElement) => {
  return [...element.childNodes]
}
