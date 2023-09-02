import { getValueFromEvent } from 'utils/hepers'

export const TitleInput = (props: { title: string; setTitle: (value: string) => void; isOccupied: boolean }) => (
  <div class={'flex flex-col gap-1'}>
    <div class="flex flex-col items-start gap-1 sm:(flex-row justify-between gap-10 items-center)  ">
      <label htmlFor={'title'}>Title</label>

      <input
        id={'title'}
        value={props.title}
        onInput={e => props.setTitle(getValueFromEvent(e))}
        name={'title'}
        type="text"
        class={'w-2/3 p-[10px] rounded-xl outline-none bg-border-dark border border-border-light'}
      />
    </div>
    <div class="flex flex-row justify-end">
      <p
        class={`w-2/3 block px-1 text-[18px] text-red ${
          props.isOccupied ? 'opacity-100' : 'opacity-0'
        } transition-all duration-300 easy-in-oout`}
      >
        A game with this title already exists.
      </p>
    </div>
  </div>
)
