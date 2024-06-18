import { Calendar, type CalendarMode, type CalendarValue } from '@preachjs/datepicker'
// import { Temporal } from 'temporal-polyfill'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { HintCreator } from 'components/AdvancedSearch/use-computed-hints'

export const AfterHint: HintCreator = () => {
  const title = 'Find posts after the date'

  return {
    helpDescription: title.toLowerCase(),
    mapper: ({ value, onSelect }) => {
      const selected = useSignal<CalendarValue<CalendarMode> | undefined>(
        value ? new Date(value.replace('-', '')) : undefined
      )

      useEffect(() => {
        selected.value = value ? new Date(value.replace('-', '')) ?? undefined : undefined
      }, [value])

      useEffect(() => {
        // keydown/keyup hanlders
        const handlerKeydown = (e: KeyboardEvent) => {
          if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault()
          } else if (e.key === 'ArrowDown') {
            e.preventDefault()
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
          }
        }
        document.addEventListener('keydown', handlerKeydown)

        return () => {
          document.removeEventListener('keydown', handlerKeydown)
        }
      })

      const convertDateAnSelect = (newValue: CalendarValue<CalendarMode>) => {
        selected.value = newValue
        // const date = new Date(e.toString())
        onSelect?.(newValue.toString().slice(4, 15).replace(/\s/gm, '-').toLowerCase())
      }

      return (
        <div class="flex flex-col gap-3 p-1 mt-2">
          <h2>{title}</h2>
          <div class="flex flex-col gap-1.5">
            <Calendar
              arrowLeft={() => '<'}
              arrowRight={() => '>'}
              value={selected.value}
              onSelect={convertDateAnSelect}
              weekdayFormat="narrow"
            />
          </div>
        </div>
      )
    }
  }
}
