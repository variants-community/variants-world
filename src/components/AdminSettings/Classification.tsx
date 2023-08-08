import { GameClassification, GameplayClassification } from '@prisma/client'
import { useEffect, useState } from 'preact/hooks'

const gameClassification = [
 { label: 'Undefined', value: undefined },
 { label: 'Materialistic', value: GameClassification.MATERIALISTIC },
 { label: 'Tactical', value: GameClassification.TACTICAL },
 { label: 'Dynamic', value: GameClassification.DYNAMIC },
 { label: 'Positional', value: GameClassification.POSITIONAL },
 { label: 'Strategic', value: GameClassification.STRATEGIC },
 { label: 'Fortune', value: GameClassification.FORTUNE },
]

const gameplayClassification = [
 { label: 'Undefined', value: undefined },
 { label: 'First Positive', value: GameplayClassification.FIRST_POSITIVE },
 { label: 'First Negative', value: GameplayClassification.FIRST_NEGATIVE },
 { label: 'Second Positive', value: GameplayClassification.SECOND_POSITIVE },
 { label: 'Second Negative', value: GameplayClassification.SECOND_NEGATIVE },
]

type ClassificationProps = {
 gameClassification: GameClassification | null;
 onChangeGameClassification: (e: Event) => void;
 gameplayClassification: GameplayClassification | null;
 setGameplayClassification: (value: GameplayClassification) => void;
};

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
   <div className={'flex flex-col text-[16px] font-semibold'}>
     <label htmlFor="game-clsfc" className={'text-secondary'}>
       Game Classification
     </label>
     <select
       value={props.gameClassification ?? 'Undefined'}
       onChange={props.onChangeGameClassification}
       id="game-clsfc"
       className="w-[200px] text-white bg-dark border border-2 border-border-dark rounded-[3px] px-[10px] py-[6px] mt-[6px] outline-none"
     >
       {gameClassification.map((cl) => (
         <option key={cl.value} value={cl.value}>{cl.label}</option>
       ))}
     </select>

     <label htmlFor="gameplay-clsfc" className={'text-secondary pt-[21px]'}>
       Gameplay Classification
     </label>
     <select
       disabled={true}
       value={props.gameplayClassification ?? 'Undefined'}
       id="gameplay-clsfc"
       className="w-[200px] disabled:opacity-100 appearance-none text-white bg-dark border border-2 border-border-dark rounded-[3px] px-[10px] py-[6px] mt-[6px] outline-none"
     >
       {gameplayClassification.map((cl) => (
         <option key={cl.value} value={cl.value}>
           {cl.label}
         </option>
       ))}
     </select>

     <div className="flex items-center mt-[8px]">
       <input
         onChange={handlerFirstRule}
         checked={firstRule}
         id="checkbox1"
         type="checkbox"
         className="h-[14px] w-[14px] appearance-none outline-none accent-dark border border-primary rounded-[3px] transition-all checked:bg-primary"
       />
       <label htmlFor="checkbox1" className="ml-[6px] text-white">
         waiting and shuffling can be optimal
       </label>
     </div>

     <div className="flex mt-[8px] mt-[13px]">
       <input
         id="checkbox2"
         type="checkbox"
         onChange={handlerSecondRule}
         checked={secondRule}
         className="h-[14px] w-[14px] mt-[1px] appearance-none outline-none accent-dark border border-primary rounded-[3px] transition-all checked:bg-primary"
       />
       <label htmlFor="checkbox2" className="ml-[6px] text-white">
         attacking the other player directly by aggressively<br />developing
         one’s own ideas is viable
       </label>
     </div>
   </div>
 )
}
