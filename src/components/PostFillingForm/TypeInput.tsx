import type { GameType } from '@prisma/client'
import { getValueFromEvent } from '../../hepers'

export const TypeInput = (props: { type: string, setType: (value: GameType) => void, isInvalid: boolean }) => (
  <div className={'flex flex-row gap-[20px] justify-between items-center'}>
    <label htmlFor={'type'}>Type</label>
    <select
      id={'type'}
      value={props.type}
      onChange={(e) => props.setType(getValueFromEvent<GameType>(e))}
      name={'type'}
      className={'p-[10px] rounded-[12px] outline-none bg-border-dark border border-border-light'}
    >
      <option value="FFA">FFA</option>
      <option value="NVC">NVC</option>
    </select>
  </div>
)
