import type { ComponentChild } from 'preact'

type Props = {
  isSecondScreen: boolean
  children: [ComponentChild, ComponentChild]
}

export const Screens = (props: Props) => {
  const screen = 'min-w-full transition-opacity transition-opacity'
  return (
    <div class="relative h-full overflow-x-clip">
      <div
        class={`absolute flex w-screen pr-4 transition-inset duration-400 easy-in-out ${
          props.isSecondScreen ? 'left-[-100%]' : 'left-0'
        }`}
      >
        <div class={`${screen} ${props.isSecondScreen ? 'opacity-0' : 'opacity-100'}`}>{props.children[0]}</div>
        <div class={`${screen} ${props.isSecondScreen ? 'opacity-100' : 'opacity-0'}`}>{props.children[1]}</div>
      </div>
    </div>
  )
}
