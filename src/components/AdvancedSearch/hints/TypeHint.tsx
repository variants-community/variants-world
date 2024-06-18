import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { HintCreator } from 'components/AdvancedSearch/use-computed-hints'

export const TypeHint: HintCreator = () => {
  const title = 'Find posts by type'

  const types = ['wof', 'ncv']

  return {
    helpDescription: title.toLowerCase(),
    mapper: ({ value, onSelect }) => {
      const current = useSignal<number>(0)

      const filterAuthors = (val?: string) => types.filter(a => (val ? a.startsWith(val) : a))

      useEffect(() => {
        current.value = 0
      }, [value])

      useEffect(() => {
        // keydown/keyup hanlders
        const handlerKeydown = (e: KeyboardEvent) => {
          if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault()

            onSelect?.(filterAuthors(value)[current.value])
          } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (current.value < filterAuthors(value).length - 1) current.value++
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (current.value > 0) current.value--
          }
        }
        document.addEventListener('keydown', handlerKeydown)

        return () => {
          document.removeEventListener('keydown', handlerKeydown)
        }
      })

      return (
        <div class="flex flex-col gap-3 p-1 mt-2">
          <h2>{title}</h2>
          <div class="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto">
            {filterAuthors(value).map((a, i) => (
              <div
                onMouseOver={() => {
                  current.value = i
                }}
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  onSelect?.(a)
                }}
                class={`px-1 ${i === current.value ? 'bg-border-light text-white rounded ' : ''} cursor-pointer z-60 p-0.5`}
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
}
