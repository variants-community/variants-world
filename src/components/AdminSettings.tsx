import { useEffect, useState } from 'preact/hooks'
import {
  GameClassification,
  GameplayClassification,
  User,
  Voice,
  VoteValue,
} from '@prisma/client'
import { supabase } from '../db/supabase/supabase'
import type { PostDetails } from '../db/prisma/queries'
import { getValueFromEvent } from '../hepers'

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

// const votes = [
//   { tester: 'qilp', value: '-1' },
//   { tester: 'bstri', value: '+1' },
//   { tester: 'NoWellOkay', value: '+1' },
//   { tester: 'TheCheeseDuck', value: '-1' },
//   { tester: 'CheesMasterGS', value: '+1' },
// ]

type AdminSettingsProps = {
  details: PostDetails;
  user: User;
};

type VoiceExtended = Voice & ({ tester?: User } | undefined);

const AdminSettings = (props: AdminSettingsProps) => {
  const [gameClassification, setGameClassification] = useState<
    GameClassification | null
  >(props.details.gameClassification)
  const [gameplayClassification, setGameplayClassification] = useState<
    GameplayClassification | null
  >(props.details.gameplayClassification)
  const [notes, setNotes] = useState<string | null>(props.details.notes)
  const [votes, setVotes] = useState<VoiceExtended[] | []>(
    props.details.voices,
  )

  useEffect(() => {
    const channel = supabase.channel('adminSettings channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'PostDetails',
          filter: `id=eq.${props.details.postId}`,
        },
        (payload) => {
          console.log('[POSTGRES_EVENT][UPDATE_POST_DETAILS]: ', payload)
          const updated = payload.new as PostDetails
          setGameClassification(updated.gameClassification)
          setGameplayClassification(updated.gameplayClassification)
          setNotes(updated.notes)
        },
      ).on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Voice',
          filter: `postId=eq.${props.details.postId}`,
        },
        async (payload) => {
          console.log('[POSTGRES_EVENT][UPDATE_VOICE]: ', payload)
          const updated = payload.new as Voice
          const user = await supabase.from('User').select('*').eq(
            'id',
            updated.testerId,
          ).single()

          const voiceWithUser = { ...updated, tester: user.data }

          console.log('before votes: ', votes)

          if (votes.length > 0) {
            setVotes(
              votes.map((voice) =>
                voice.id === voiceWithUser.id ? voiceWithUser : voice
              ) as VoiceExtended[],
            )
          } else {
            setVotes([voiceWithUser as VoiceExtended])
          }
          console.log('after votes: ', votes)
        },
      ).on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Voice',
          filter: `postId=eq.${props.details.postId}`,
        },
        async (payload) => {
          console.log('[POSTGRES_EVENT][INSERT_VOICE]: ', payload)
          const updated = payload.new as Voice
          const user = await supabase.from('User').select('*').eq(
            'id',
            updated.testerId,
          ).single()

          const voiceWithUser = { ...updated, tester: user.data }
          console.log('before votes: ', votes)
          console.log('voiceWithUser: ', voiceWithUser)
          
          // const test = [...votes, voiceWithUser as VoiceExtended] as VoiceExtended[]
          // console.log('test: ', [...votes, voiceWithUser as VoiceExtended] as VoiceExtended[])

          setVotes([...votes, voiceWithUser as VoiceExtended])
          console.log('after votes: ', votes)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, votes])

  const onChangeGameClassification = async (e: Event) => {
    const value = getValueFromEvent<GameClassification>(e)
    await supabase.from('PostDetails').update({
      gameClassification: value,
    }).eq('postId', props.details.postId)
  }

  const setGameplayClassification2 = async (value: GameplayClassification) => {
    await supabase.from('PostDetails').update({
      gameplayClassification: value,
    }).eq('postId', props.details.postId)
  }

  const onChangeGameplayClassification = async (e: Event) => {
    const value = getValueFromEvent<GameplayClassification>(e)
    await supabase.from('PostDetails').update({
      gameplayClassification: value,
    }).eq('postId', props.details.postId)
  }

  const onChangeNotes = async (
    e: Event,
  ) => {
    const value = getValueFromEvent<string>(e)
    await supabase.from('PostDetails').update({
      notes: value,
    }).eq('postId', props.details.postId)
    console.log('onNotesChange')
  }

  return (
    <div
      className={'h-[250px] flex bg-border-light shadow-dark rounded-[12px] p-[20px] justify-between'}
    >
      <ClassificationCard
        gameClassification={gameClassification}
        onChangeGameClassification={onChangeGameClassification}
        gameplayClassification={gameplayClassification}
        setGameplayClassification={setGameplayClassification2}
      />
      <Votes
        voces={votes}
        testerId={props.user.id}
        postId={props.details.postId}
      />
      <Notes notes={notes} onChangeNotes={onChangeNotes} />
    </div>
  )
}

type ClassificationProps = {
  gameClassification: GameClassification | null;
  onChangeGameClassification: (e: Event) => void;
  gameplayClassification: GameplayClassification | null;
  setGameplayClassification: (value: GameplayClassification) => void;
};

const ClassificationCard = (props: ClassificationProps) => {
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
        value={props.gameClassification || 'None'}
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
        value={props.gameplayClassification || 'None'}
        // onChange={props.onChangeGameplayClassification}
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
          // checked={props.gameplayClassification === 'FIRST_POSITIVE'
          //   ? true
          //   : props.gameplayClassification === 'SECOND_POSITIVE'}
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
          // checked={props.gameplayClassification === 'SECOND_NEGATIVE'
          //   ? true
          //   : props.gameplayClassification === 'FIRST_NEGATIVE'}
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

type VoicesProps = {
  postId: number;
  testerId: number;
  voces: VoiceExtended[];
  onVoiceChange?: (e: Event) => void;
};

const Votes = (props: VoicesProps) => {
  const onVoice = async (value: VoteValue) => {
    const resp = await supabase.from('Voice').upsert({
      value: value,
      postId: props.postId,
      testerId: props.testerId,
    }, { onConflict: 'postId, testerId' }).eq('testerId', props.testerId)
    console.log('onVoice resp: ', resp)
  }

  const testerVoice = props.voces.find((voice) =>
    voice.testerId === props.testerId
  )

  return (
    <div className={'flex flex-col'}>
      <div className={'w-[160px] flex flex-row justify-between font-semibold'}>
        <h2 className={'text-primary font-[16px] font-semibold'}>Votes</h2>
        <div
          className={'flex flex-row text-white text-[14px] gap-[5px] transition-all duration-300'}
        >
          <button
            onClick={() => onVoice('NEGATIVE')}
            className={`w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px] ${
              testerVoice && testerVoice.value === 'NEGATIVE'
                ? 'bg-primary'
                : 'hover:bg-primary'
            }`}
          >
            -1
          </button>
          <button
            onClick={() => onVoice('NEUTRAL')}
            className={`w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px] ${
              testerVoice && testerVoice.value === 'NEUTRAL'
                ? 'bg-primary'
                : 'hover:bg-primary'
            }`}
          >
            +0
          </button>
          <button
            onClick={() => onVoice('POSITIVE')}
            className={`w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px] ${
              testerVoice && testerVoice.value === 'POSITIVE'
                ? 'bg-primary'
                : 'hover:bg-primary'
            }`}
          >
            +1
          </button>
        </div>
      </div>

      <ul
        className={'flex flex-col gap-[8px] mt-[6px] font-[16px] font-semibold  overflow-scroll'}
      >
        {props.voces.map((vote) => (
          <li
            key={vote.testerId}
            className={'h-[30px] px-[10px] flex flex-row justify-between bg-dark border border-[2px] border-border-dark rounded-[3px]'}
          >
            <span>{vote.tester?.name}</span>
            <span className={'font-mono font-light'}>
              {vote.value === VoteValue.POSITIVE
                ? 1
                : vote.value === VoteValue.NEGATIVE
                ? -1
                : 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

type NotesProps = {
  notes: string | null;
  onChangeNotes: (e: Event) => void;
};

const Notes = (props: NotesProps) => (
  <div className={'flex flex-col'}>
    <h2 className={'text-primary font-[16px] font-semibold'}>Notes</h2>
    <textarea
      placeholder={'Private notes of CGA Team'}
      value={props.notes ?? ''}
      onChange={props.onChangeNotes}
      rows={4}
      className={'h-full w-[375px] p-[10px] mt-[6px] font-[16px] font-semibold bg-dark border border-[2px] border-border-dark rounded-[3px] outline-none resize-none'}
    />
  </div>
)

export default AdminSettings
