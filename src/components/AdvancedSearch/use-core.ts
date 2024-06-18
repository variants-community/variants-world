import { useEffect, useMemo, useRef } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { KeyWordToHintMappings } from 'components/AdvancedSearch/use-computed-hints'

// const openTag = '<span class="tag">'
// const closeTag = '</span>'

const openKeyTag = '<span class="tag-key">'
const closeKeyTag = '</span>'

const openValueTag = '<span class="tag-val">'
const closeValueTag = '</span>'

const brTag = '<br>'
const tagToBeCleared = [openKeyTag, closeKeyTag, openValueTag, closeValueTag, brTag]

export type DetailsUnderCursor = { key: string; searchValue: string; baseNode: ChildNode; isEmpty: () => boolean }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInputSelectedNodeDetailsV2 = (inputRef: any) => {
  if (!inputRef.current) return
  const input = inputRef.current.base as HTMLDivElement
  if (!input) return

  const selection = window.getSelection()
  if (!selection) return

  let baseNode
  if ('baseNode' in selection) baseNode = selection.baseNode as ChildNode
  else return
  // if (!baseNode) return

  if ((baseNode.textContent === '' || !('textContent' in baseNode)) && baseNode.previousSibling)
    baseNode = baseNode.previousSibling.childNodes[0]

  if (!baseNode) return
  const findKeyPattern = /([A-z-]+):/gm
  if (baseNode.textContent && baseNode.textContent.length > 0) {
    const matchOnBaseNode = findKeyPattern.exec(baseNode.textContent)
    if (!matchOnBaseNode && baseNode.parentNode?.previousSibling?.textContent) {
      const matchOnPrevBaseNode = findKeyPattern.exec(baseNode.parentNode?.previousSibling?.textContent)
      if (!matchOnPrevBaseNode) return
      // console.log('key: ')
      return {
        key: matchOnPrevBaseNode[1],
        searchValue: baseNode.textContent.split(/\s/)[0],
        baseNode,
        isEmpty: () => input.innerHTML.length === 0
      }
    } else {
      if (matchOnBaseNode) {
        return {
          key: matchOnBaseNode[1],
          searchValue: '',
          baseNode,
          isEmpty: () => input.innerHTML.length === 0
        }
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInputSelectedNodeDetails = (inputRef: any) => {
  if (!inputRef.current) return
  const input = inputRef.current.base as HTMLDivElement
  if (!input) return
  const selection = window.getSelection()
  if (!selection) return

  let baseNode
  if ('baseNode' in selection) baseNode = selection.baseNode as ChildNode
  else return

  // let baseNode = (selection as any).baseNode as ChildNode
  if (!baseNode) return

  if ((baseNode.textContent === '' || !('textContent' in baseNode)) && baseNode.previousSibling)
    baseNode = baseNode.previousSibling.childNodes[0]

  if (!baseNode) return

  const baseNodeText = baseNode.textContent
  if (baseNode && baseNodeText) {
    console.log('base: ', baseNode)
    const kek = /([A-z-]+):([0-9A-z-=/]*)/gm
    const matches = kek.exec(baseNodeText)
    if (matches) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_ignore, key, searchValue] = matches

      return {
        key,
        searchValue,
        baseNode,
        isEmpty: () => input.innerHTML.length === 0
      }
    }
  }
}

type UseCoreProps = {
  hintMapper: KeyWordToHintMappings
}

export const useCore = ({ hintMapper }: UseCoreProps) => {
  const inputRef = useRef<HTMLDivElement>(null)

  const html = useSignal<string>('')
  const detailsUnderCursor = useSignal<DetailsUnderCursor | undefined>(undefined)

  const findKeyWordsRePattern = useMemo(
    () =>
      new RegExp(
        `((?:${Object.keys(hintMapper).reduce((prev, curr, i) => (i === 0 ? prev + curr : `${prev}|${curr}`))}):[0-9A-z-=/]*)`,
        'gm'
      ),
    [hintMapper]
  )
  const findHtmlTagsRePattern = useMemo(
    () =>
      new RegExp(`(?:${tagToBeCleared.reduce((prev, curr, i) => (i === 0 ? prev + curr : `${prev}|${curr}`))})`, 'gm'),
    [hintMapper]
  )

  const clearFromTags = (rowHtml: string) => {
    return rowHtml.replace(findHtmlTagsRePattern, () => '')
  }

  const replaceExpressionsWithBubblics = (text: string) => {
    return text.replace(findKeyWordsRePattern, match => {
      const [key, val] = match.split(':')
      if (key && val) return `${openKeyTag + key}:${closeKeyTag}${openValueTag}${val}${closeValueTag}`
      else return `${openKeyTag + key}:${closeKeyTag}`
    })
  }

  const converToBubblics = (oldInnerHtml: string) => {
    return replaceExpressionsWithBubblics(clearFromTags(oldInnerHtml))
  }

  const changeHtml = (rowInnerHtml: string) => {
    html.value = converToBubblics(rowInnerHtml)
  }

  useEffect(() => {
    detailsUnderCursor.value = getInputSelectedNodeDetailsV2(inputRef)
    // detailsUnderCursor.value = getInputSelectedNodeDetails(inputRef)

    // debug logs
    console.log('\n[core]----------------')
    console.log('[html]: ', html.value)
    if (!detailsUnderCursor.value) console.log('[cursor]', undefined)
    else
      console.log(
        `[cursor]:  key=${detailsUnderCursor.value.key}; value=${detailsUnderCursor.value.searchValue}; isEmpyt=${detailsUnderCursor.value.isEmpty()} baseNode=${detailsUnderCursor.value.baseNode.textContent}`
      )
    // debug logs
  }, [html.value])

  return {
    html,
    inputRef,
    changeHtml,
    detailsUnderCursor
  }
}
