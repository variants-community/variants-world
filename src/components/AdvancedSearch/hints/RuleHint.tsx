import { useEffect, useRef } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { HintCreator } from 'components/AdvancedSearch/use-computed-hints'

export const RuleHint: HintCreator = () => {
  const title = 'Find posts by rules'

  const rules = [
    'passing',
    'anonymous',
    'any-capture',
    'atomic',
    'bare-piece',
    'blindfold',
    'regicide',
    'crazyhouse',
    'crazywan',
    'deadWall',
    'diplomacy',
    'duck',
    'fatal',
    'foq',
    'points',
    'ghost',
    'giveaway',
    'koth',
    'n-check', // пример значения для n
    'no-zombies',
    'no-enp',
    'no-opp-castling',
    'oxvalue', // пример значения для value
    'play-for-Mate',
    '+n', // пример значения для value
    '=n', // пример значения для value
    'n-th', // пример значения для value
    'seirawan',
    'self-check',
    'self-partner',
    'semianon',
    'setup-value', // пример значения для value
    'sideways',
    'stalemate',
    'stalemate value', // пример значения для value (string)
    'taboo',
    'takeover',
    'alt-teams',
    'rb',
    'rg',
    'torpedo'
  ]

  return {
    helpDescription: title.toLowerCase(),
    mapper: ({ value, onSelect }) => {
      const containerRef = useRef<HTMLDivElement>(null)
      const current = useSignal<number>(0)

      const filterAuthors = (val?: string) => rules.filter(a => (val ? a.startsWith(val) : a))

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
            if (containerRef.current) {
              containerRef.current.children[current.value].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
              })
            }
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (current.value > 0) current.value--
            if (containerRef.current) {
              containerRef.current.children[current.value].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
              })
            }
          }
        }
        document.addEventListener('keydown', handlerKeydown)

        return () => {
          document.removeEventListener('keydown', handlerKeydown)
        }
      })

      return (
        <div class="flex flex-col gap-3 p-1 mt-2 min-h-10 w-fit">
          <h2>{title}</h2>
          <div ref={containerRef} class="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto">
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
