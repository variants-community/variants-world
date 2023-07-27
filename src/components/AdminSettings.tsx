import { useEffect, useState } from 'preact/hooks'
import { GameClassification, GameplayClassification } from '@prisma/client'
import { supabase } from '../db/supabase/supabase'
import type { PostDetails } from '../db/prisma/queries'

// import { client } from '../client'

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

const votes = [
  { tester: 'qilp', value: '-1' },
  { tester: 'bstri', value: '+1' },
  { tester: 'NoWellOkay', value: '+1' },
  { tester: 'TheCheeseDuck', value: '-1' },
  { tester: 'CheesMasterGS', value: '+1' },
]

type AdminSettingsProps = {
  details: PostDetails;
};

const AdminSettings = (props: AdminSettingsProps) => {
  const [gameClassification, setGameClassification] = useState<
    GameClassification | null
  >(props.details.gameClassification)
  const [gameplayClassification, setGameplayClassification] = useState<
    GameplayClassification | null
  >(props.details.gameplayClassification)

  useEffect(() => {
    const channel = supabase.channel('adminSettings channel').on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'PostDetails',
        // filter: `id=eq.${props.details.postId}`,
      },
      (payload) => {
        console.log('EVENT: ', payload)
        const updated = payload.new as PostDetails
        setGameClassification(updated.gameClassification)
        setGameplayClassification(updated.gameplayClassification)
      },
    ).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const onChangeGameClassification = async (
    classification: GameClassification,
  ) => {
    const response = await supabase.from('PostDetails').update({
      gameClassification: classification,
    }).eq('postId', props.details.postId)
    console.log('response: ', response)
  }

  const onChangeGameplayClassification = async (
    classification: GameplayClassification,
  ) => {
    const response = await supabase.from('PostDetails').update({
      gameplayClassification: classification,
    }).eq('postId', props.details.postId)
    console.log('response: ', response)
    const response2 = await supabase.from('PostDetails').select().eq(
      'postId',
      props.details.postId,
    )
    console.log('response2: ', response2)
  }

  return (
    <div
      className={'flex bg-border-light shadow-dark rounded-[12px] p-[20px] justify-between'}
    >
      <>
        <ClassificationCard
          gameClassification={gameClassification}
          onChangeGameClassification={onChangeGameClassification}
          gameplayClassification={gameplayClassification}
          onChangeGameplayClassification={onChangeGameplayClassification}
        />
        <Votes />
        <Notes />
      </>
    </div>
  )
}

type ClassificationProps = {
  gameClassification: GameClassification | null;
  onChangeGameClassification: (classification: GameClassification) => void;
  gameplayClassification: GameplayClassification | null;
  onChangeGameplayClassification: (
    classification: GameplayClassification,
  ) => void;
};

const ClassificationCard = (props: ClassificationProps) => (
  <div className={'flex flex-col text-[16px] font-semibold'}>
    <label htmlFor="game-clsfc" className={'text-secondary'}>
      Game Classification
    </label>
    <select
      value={props.gameClassification || 'None'}
      onChange={(e: Event) =>
        props.onChangeGameClassification(
          (e.target as HTMLInputElement).value as GameClassification,
        )}
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
      value={props.gameplayClassification || 'None'}
      onChange={(e: Event) =>
        props.onChangeGameplayClassification(
          (e.target as HTMLInputElement).value as GameplayClassification,
        )}
      id="gameplay-clsfc"
      className="w-[200px] text-white bg-dark border border-2 border-border-dark rounded-[3px] px-[10px] py-[6px] mt-[6px] outline-none"
    >
      {gameplayClassification.map((cl) => (
        <option key={cl.value} value={cl.value}>
          {cl.label}
        </option>
      ))}
    </select>

    <div className="flex items-center mt-[8px]">
      <input
        checked={props.gameplayClassification === 'FIRST_POSITIVE'
          ? true
          : props.gameplayClassification === 'SECOND_POSITIVE'}
        id="checkbox1"
        type="checkbox"
        value=""
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
        checked={props.gameplayClassification === 'SECOND_NEGATIVE'
          ? true
          : props.gameplayClassification === 'FIRST_NEGATIVE'}
        value=""
        className="h-[14px] w-[14px] mt-[1px] appearance-none outline-none accent-dark border border-primary rounded-[3px] transition-all checked:bg-primary"
      />
      <label htmlFor="checkbox2" className="ml-[6px] text-white">
        attacking the other player directly by aggressively<br />developing
        one’s own ideas is viable
      </label>
    </div>
  </div>
)

const Votes = () => (
  <div className={'flex flex-col'}>
    <div className={'w-[160px] flex flex-row justify-between font-semibold'}>
      <h2 className={'text-primary font-[16px] font-semibold'}>Votes</h2>
      <div className={'flex flex-row text-white text-[14px] gap-[5px]'}>
        <button
          className={'w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px] bg-primary'}
        >
          -1
        </button>
        <button
          className={'w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px]'}
        >
          +0
        </button>
        <button
          className={'w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px]'}
        >
          +1
        </button>
      </div>
    </div>

    <ul
      className={'flex flex-col gap-[8px] mt-[6px] font-[16px] font-semibold'}
    >
      {votes.map((vote) => (
        <li
          key={vote.tester}
          className={'h-[30px] px-[10px] flex flex-row justify-between bg-dark border border-[2px] border-border-dark rounded-[3px]'}
        >
          <span>{vote.tester}</span>
          <span>{vote.value}</span>
        </li>
      ))}
    </ul>
  </div>
)

const Notes = () => (
  <div className={'flex flex-col'}>
    <h2 className={'text-primary font-[16px] font-semibold'}>Notes</h2>
    <textarea
      placeholder={'Private notes of CGA Team'}
      // type="text"
      rows={4}
      className={'h-full w-[375px] p-[10px] mt-[6px] font-[16px] font-semibold bg-dark border border-[2px] border-border-dark rounded-[3px] outline-none resize-none'}
    />
  </div>
)

export default AdminSettings
