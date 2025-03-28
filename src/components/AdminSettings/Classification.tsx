import { useState } from 'preact/hooks'
import type { GameClassification, GameplayClassification } from '@prisma/client'

const gameClassification: { label: string; value?: GameClassification }[] = [
  { label: 'Unknown', value: undefined },
  { label: 'Materialistic', value: 'MATERIALISTIC' },
  { label: 'Tactical', value: 'TACTICAL' },
  { label: 'Dynamic', value: 'DYNAMIC' },
  { label: 'Positional', value: 'POSITIONAL' },
  { label: 'Strategic', value: 'STRATEGIC' },
  { label: 'Fortune', value: 'FORTUNE' }
]

const gameplayClassification: { label: string; value: GameplayClassification }[] = [
  { label: 'First Positive', value: 'FIRST_POSITIVE' },
  { label: 'First Negative', value: 'FIRST_NEGATIVE' },
  { label: 'Second Positive', value: 'SECOND_POSITIVE' },
  { label: 'Second Negative', value: 'SECOND_NEGATIVE' }
]

type ClassificationProps = {
  gameClassification?: GameClassification
  onChangeGameClassification: (e: Event) => void
  gameplayClassification?: GameplayClassification
  setGameplayClassification: (value: GameplayClassification) => void
}

const ClassificationRules: Record<GameplayClassification, { firstRule: boolean; secondRule: boolean }> = {
  FIRST_POSITIVE: { firstRule: true, secondRule: false },
  FIRST_NEGATIVE: { firstRule: false, secondRule: true },
  SECOND_POSITIVE: { firstRule: true, secondRule: true },
  SECOND_NEGATIVE: { firstRule: false, secondRule: false }
}

export const Classification = (props: ClassificationProps) => {
  const rules = ClassificationRules[props.gameplayClassification ?? 'SECOND_POSITIVE']
  const [firstRule, setFirstRule] = useState<boolean>(rules.firstRule)
  const [secondRule, setSecondRule] = useState<boolean>(rules.secondRule)

  const updateClassification = (first: boolean, second: boolean) => {
    if (first) {
      if (second) props.setGameplayClassification('SECOND_POSITIVE')
      else props.setGameplayClassification('FIRST_POSITIVE')
    } else {
      if (second) props.setGameplayClassification('FIRST_NEGATIVE')
      else props.setGameplayClassification('SECOND_NEGATIVE')
    }
  }

  const handlerFirstRule = () => {
    updateClassification(!firstRule, secondRule)
    setFirstRule(x => !x)
  }

  const handlerSecondRule = () => {
    updateClassification(firstRule, !secondRule)
    setSecondRule(x => !x)
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
