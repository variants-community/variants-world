import { GameType } from '@prisma/client'
import { getValueFromEvent } from 'utils/hepers'

export const TypeInput = (props: { type: string; setType: (value: GameType) => void; isInvalid: boolean }) => (
  <div class={'flex flex-row justify-between items-center gap-5'}>
    <label htmlFor={'type'}>Type</label>
    <select
      id={'type'}
      value={props.type}
      onChange={e => props.setType(getValueFromEvent<GameType>(e))}
      name={'type'}
      class={'p-[10px] rounded-xl outline-none bg-border-dark border border-border-light'}
    >
      {Object.keys(GameType).map((type, i) => (
        <option key={i} value={type}>
          {type}
        </option>
      ))}
    </select>
  </div>
)
