import { getValueFromEvent } from '../../utils/hepers'

export const TitleInput = (props: { title: string, setTitle: (value: string) => void, isInvalid: boolean }) => (
  <div className={'flex flex-row gap-[20px] justify-between items-center'}>
    <label htmlFor={'title'} className={`${props.isInvalid ? 'text-red' : ''}`}>Title</label>
    <input
      id={'title'}
      value={props.title}
      onInput={(e) => props.setTitle(getValueFromEvent(e))}
      name={'title'}
      type="text"
      className={`w-1/2 rounded-[12px] p-[10px] outline-none bg-border-dark border ${props.isInvalid ? 'border-red' : 'border-border-light'}`}
    />
  </div>
)
