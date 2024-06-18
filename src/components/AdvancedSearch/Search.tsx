import { type KeyWordToHintMappings, useComputedHints } from 'components/AdvancedSearch/use-computed-hints'
import { useAutoCompletion } from 'components/AdvancedSearch/use-auto-completion'
import { useCore } from 'components/AdvancedSearch/use-core'
import { useEffect } from 'preact/hooks'
import ContentEditable from 'components/AdvancedSearch/preact-contenteditable'
import SearchIcon from 'components/icons/SearchIcon'
import type { FunctionalComponent } from 'preact'

export const Search: FunctionalComponent<{ hintMapper: KeyWordToHintMappings }> = ({ hintMapper }) => {
  const { inputRef, detailsUnderCursor, html, changeHtml } = useCore({ hintMapper })
  const { autoCompletionWith } = useAutoCompletion({ detailsUnderCursor })
  const { hintBox, showHelp } = useComputedHints({ detailsUnderCursor, hintMapper })

  useEffect(() => {
    if (!inputRef.current) return
    // keydown/keyup hanlders
    const handlerKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        if (!detailsUnderCursor.value) return

        const { baseNode, key, searchValue } = detailsUnderCursor.value
        if (!searchValue && Object.keys(hintMapper).includes(key)) {
          baseNode.textContent = ''
        }
      } else if (e.ctrlKey && e.key === ' ') {
        showHelp.value = !showHelp.value
      } else if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault()
      } else if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    const handlerKeyup = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === ' ') {
        // showHelp.value = !showHelp.value
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlerDateClick = (e: any) => {
      if (e.target != null && e.target.className.startsWith('preachjs-calendar')) {
        e.stopPropagation()
        e.preventDefault()
      }
    }

    document.addEventListener('keydown', handlerKeydown)
    document.addEventListener('keyup', handlerKeyup)
    document.addEventListener('click', handlerDateClick)

    return () => {
      document.removeEventListener('keydown', handlerKeydown)
      document.removeEventListener('keyup', handlerKeyup)
      document.removeEventListener('click', handlerDateClick)
    }
  })

  console.log('hints: ', hintBox.value)

  return (
    <>
      <div
        class={`group relative flex flex-row gap-1 items-center justify-center 
        mx-auto mt-4 mb-10 lg:(mx-auto mb-14 mt-0) px-3 py-0.5 w-fit
        bg-dark darkborder rounded-full shadow-light
        shadow-lightSmall group-focus:(text-text-light placeholder-text-light shadow-lightSmallHover) transition-search
        `}
      >
        <SearchIcon class="h-4.4 w-4.4 pointer-events-none" />

        <div class="relative">
          <ContentEditable
            ref={inputRef}
            className="flex gap-y-1 text-nowrap flex-wrap text-xl rounded-[8px] items-center px-2 py-1 bg-gray-700 w-[600px] !outline-none focus:!outline-none !resize-none"
            html={html.value}
            disabled={false}
            onChange={e => changeHtml(e.target.value)}
          />
          {hintBox.value?.content && (
            <div class="text-lg h-fit absolute left-0 z-10">
              <div class="bg-dark rounded">
                <hintBox.value.content
                  value={hintBox.value.value}
                  onSelect={val => autoCompletionWith({ hint: val })}
                  mappings={hintMapper}
                />
              </div>
            </div>
          )}
        </div>

        <div class={'hidden sm:flex gap-1 pointer-events-none'}>
          <span class={'py-[3px] px-[6px] bg-border-light rounded'}>CTRL</span>
          <span class={'py-[3px] px-[7px] bg-border-light rounded'}>K</span>
        </div>
      </div>
    </>
  )
}
