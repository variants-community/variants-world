import { updatePrefetch } from 'utils/hepers'
import { useCallback, useEffect, useRef } from 'preact/hooks'

type BackButtonProps = {
  href: string
  value: string
}

const BackButton = (props: BackButtonProps) => {
  // const onClick = (e: MouseEvent) => {
  //   if (window.history.state.from === props.href) {
  //     e.preventDefault()
  //     window.history.back()
  //   }
  // }

  const timestamp = useRef(Date.now())
  const update = useCallback(() => updatePrefetch(props.href, timestamp), [props.href, timestamp])

  useEffect(update, [])

  return (
    <a
      class="flex text-center fill-text hover:(fill-white text-white) items-center justify-between gap-2 whitespace-nowrap border border-border-dark bg-border-light shadow-dark rounded-lg py-1.2 px-2.5 transition-colors duration-200 ease-out"
      href={props.href}
      // onClick={onClick}
      onMouseDown={e => e.currentTarget.click()}
      onMouseEnter={update}
      data-astro-prefetch="hover"
    >
      <svg width="1em" height="1em" viewBox="0 0 512 384" xmlns="http://www.w3.org/2000/svg" class="mb-0.5">
        <path
          id="Path"
          stroke="none"
          d="M 448 352 C 448 369.700012 462.299988 384 480 384 C 497.700012 384 512 369.700012 512 352 L 512 256 C 512 203 469 160 416 160 L 109.299988 160 L 182.700012 86.600006 C 195.200012 74.100006 195.200012 53.799988 182.700012 41.299988 C 170.200012 28.799988 149.899994 28.799988 137.399994 41.299988 L 9.399994 169.300003 C -3.099976 181.800003 -3.099976 202.100006 9.399994 214.600006 L 137.399994 342.600006 C 149.899994 355.100006 170.200012 355.100006 182.700012 342.600006 C 195.200012 330.100006 195.200012 309.799988 182.700012 297.299988 L 109.299988 224 L 416 224 C 433.700012 224 448 238.300003 448 256 L 448 352 Z"
        />
      </svg>

      <span>{props.value}</span>
    </a>
  )
}

export default BackButton
