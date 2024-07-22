import { type Signal, useComputed } from '@preact/signals'
import { cl } from 'utils/hepers'
import CompactListIcon from 'components/icons/CompactListIcon'
import LargeListIcon from 'components/icons/LargeListIcon'

export type GalleryView = 'compact' | 'large'

export const GalleryViewSwitch = (props: { signal: Signal<GalleryView> }) => {
  const left = useComputed(() => {
    switch (props.signal.value) {
      case 'large':
        return 'left: 3.5px'
      case 'compact':
        return 'left: 43px'
    }
  })

  return (
    <div
      class="relative flex items-center bg-dark darkborder rounded-full shadow-light shadow-lightSmall px-0.8 gap-x-0.5 z-0"
      onMouseDown={e => e.preventDefault()}
    >
      <div class="absolute bg-border-light rounded-full p-4.8 -z-1 transition-inset duration-100" style={left} />
      <div class="rounded-full text-text cursor-pointer p-2.8" onClick={() => (props.signal.value = 'large')}>
        <LargeListIcon
          class={useComputed(() =>
            cl(
              'w-4 h-4 transition-colors duration-100',
              props.signal.value === 'large' ? 'fill-secondary' : 'fill-text'
            )
          )}
        />
      </div>
      <div class="rounded-full text-text cursor-pointer p-2.8" onClick={() => (props.signal.value = 'compact')}>
        <CompactListIcon
          class={useComputed(() =>
            cl(
              'w-4 h-4 transition-colors duration-100',
              props.signal.value === 'compact' ? 'fill-secondary' : 'fill-text'
            )
          )}
        />
      </div>
    </div>
  )
}
