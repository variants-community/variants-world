import { GameClassification, GameplayClassification } from '@prisma/client'
import { useEffect, useState } from 'preact/hooks'

const gameClassification = [
  { label: 'Undefined', value: undefined },
  { label: 'Materialistic', value: GameClassification.MATERIALISTIC },
  { label: 'Tactical', value: GameClassification.TACTICAL },
  { label: 'Dynamic', value: GameClassification.DYNAMIC },
  { label: 'Positional', value: GameClassification.POSITIONAL },
  { label: 'Strategic', value: GameClassification.STRATEGIC },
  { label: 'Fortune', value: GameClassification.FORTUNE }
]

const gameplayClassification = [
  { label: 'Undefined', value: undefined },
  { label: 'First Positive', value: GameplayClassification.FIRST_POSITIVE },
  { label: 'First Negative', value: GameplayClassification.FIRST_NEGATIVE },
  { label: 'Second Positive', value: GameplayClassification.SECOND_POSITIVE },
  { label: 'Second Negative', value: GameplayClassification.SECOND_NEGATIVE }
]

type ClassificationProps = {
  gameClassification?: GameClassification
  onChangeGameClassification: (e: Event) => void
  gameplayClassification?: GameplayClassification
  setGameplayClassification: (value: GameplayClassification) => void
}

export const Classification = (props: ClassificationProps) => {
  const [firstRule, setFirstRule] = useState<boolean>(false)
  const [secondRule, setSecondRule] = useState<boolean>(false)

  useEffect(() => {
    if (!firstRule && secondRule) {
      props.setGameplayClassification('FIRST_NEGATIVE')
    } else if (firstRule && !secondRule) {
      props.setGameplayClassification('FIRST_POSITIVE')
    } else if (!firstRule && !secondRule) {
      props.setGameplayClassification('SECOND_NEGATIVE')
    } else if (firstRule && secondRule) {
      props.setGameplayClassification('SECOND_POSITIVE')
    }
  }, [firstRule, secondRule])

  const handlerFirstRule = (e: Event) => {
    const isChecked = (e.target as HTMLInputElement).checked
    setFirstRule(isChecked)
  }

  const handlerSecondRule = (e: Event) => {
    const isChecked = (e.target as HTMLInputElement).checked
    setSecondRule(isChecked)
  }

  return (
    <div class={'flex flex-col font-semibold'}>
      <label htmlFor="game-clsfc" class={'text-secondary'}>
        Game Classification
      </label>
      <select
        value={props.gameClassification}
        onChange={props.onChangeGameClassification}
        id="game-clsfc"
        class="w-50 mt-1 py-1 px-2 text-white bg-dark darkborder rounded outline-none"
      >
        {gameClassification.map(cl => (
          <option key={cl.value} value={cl.value}>
            {cl.label}
          </option>
        ))}
      </select>

      <label htmlFor="gameplay-clsfc" class={'text-secondary pt-3'}>
        Gameplay Classification
      </label>
      <select
        disabled={true}
        value={props.gameplayClassification ?? 'Undefined'}
        id="gameplay-clsfc"
        class="w-50 mt-1 py-1 px-2 text-white bg-dark darkborder rounded appearance-none outline-none disabled:opacity-100"
      >
        {gameplayClassification.map(cl => (
          <option key={cl.value} value={cl.value}>
            {cl.label}
          </option>
        ))}
      </select>

      <div class="flex items-center mt-1">
        <input
          onChange={handlerFirstRule}
          checked={firstRule}
          id="checkbox1"
          type="checkbox"
          class="h-4 w-4 appearance-none outline-none accent-dark border border-primary rounded transition-all checked:bg-primary"
        />
        <label htmlFor="checkbox1" class={`ml-2 ${firstRule ? 'text-white' : ''}`}>
          waiting and shuffling can be optimal
        </label>
      </div>

      <div class="flex mt-2">
        <input
          id="checkbox2"
          type="checkbox"
          onChange={handlerSecondRule}
          checked={secondRule}
          class="h-4 w-4 mt-[2px] appearance-none outline-none accent-dark border border-primary rounded transition-all checked:bg-primary"
        />
        <label htmlFor="checkbox2" class={`ml-2 leading-5 ${secondRule ? 'text-white' : ''}`}>
          attacking the other player directly by aggressively
          <br />
          developing one’s own ideas is viable
        </label>
      </div>
    </div>
  )
}
