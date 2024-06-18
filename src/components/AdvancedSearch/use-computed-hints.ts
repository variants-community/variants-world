import { HelpHintBox } from 'components/AdvancedSearch/hints/HelpHintBox'
import { type ReadonlySignal, useComputed, useSignal } from '@preact/signals'
import type { DetailsUnderCursor } from 'components/AdvancedSearch/use-core'
import type { FunctionalComponent } from 'preact'

export type ValueToHintMapper = FunctionalComponent<{
  value?: string
  onSelect?: (val?: string) => void
}>
export type KeyValueCompletion = (value: string) => string | undefined
export type HintCreator<T = {}> = (args: T) => Hint
export type Hint = {
  mapper: ValueToHintMapper
  helpDescription?: string
  onArrowUp?: () => void
  onArrowDown?: () => void
}
export type KeyWordToHintMappings = { [key: string]: Hint }

type ComputedHintsProps = {
  hintMapper: KeyWordToHintMappings
  detailsUnderCursor: ReadonlySignal<DetailsUnderCursor | undefined>
}

export const useComputedHints = ({ detailsUnderCursor, hintMapper }: ComputedHintsProps) => {
  const showHelp = useSignal(false)

  const hintBox = useComputed(() => {
    console.log('kek: ', detailsUnderCursor.value)
    if (showHelp.value)
      return {
        content: HelpHintBox,
        getCompletion: () => {}
      }

    if (!detailsUnderCursor.value) return

    const { key, searchValue } = detailsUnderCursor.value

    if (!(key in hintMapper)) return

    return {
      value: searchValue,
      content: hintMapper[key].mapper // ({value: searchValue}),
    }
  })

  // debug logs
  console.log('\n[hints]---------------')
  if (!hintBox.value) {
    console.log('[hint box]: ', undefined)
  } else {
    console.log('[hint box content]: ', hintBox.value.content)
  }
  // debug logs

  return {
    showHelp,
    hintBox
  }
}
