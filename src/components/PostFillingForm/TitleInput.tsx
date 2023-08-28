import { getValueFromEvent } from 'utils/hepers'

export const TitleInput = (props: { title: string; setTitle: (value: string) => void; isInvalid: boolean }) => (
  <div class={'flex flex-col items-center gap-5 sm:(flex-row justify-between)'}>
    <label htmlFor={'title'} class={`${props.isInvalid ? 'text-red' : ''}`}>
      Title
    </label>
    <input
      id={'title'}
      value={props.title}
      onInput={e => props.setTitle(getValueFromEvent(e))}
      name={'title'}
      type="text"
      class={`w-full sm:w-1/2 p-[10px] rounded-xl outline-none bg-border-dark border ${
        props.isInvalid ? 'border-red' : 'border-border-light'
      }`}
    />
  </div>
)
