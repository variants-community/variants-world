import { getValueFromEvent } from 'utils/hepers'
import type { GameType } from '@prisma/client'

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
      <option value={'NCV'}>NCV</option>
      <option value={'WOF'}>WOF</option>
    </select>
  </div>
)
