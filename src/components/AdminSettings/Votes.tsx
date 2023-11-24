import { supabase } from 'db/supabase/supabase'
import type { User, Voice, VoteValue } from '@prisma/client'

export type VoiceExtended = Voice & ({ tester?: User } | undefined)

type VoicesProps = {
  postDetailsId: number
  testerId: number
  voces: VoiceExtended[]
  setVotes: (voces: VoiceExtended[]) => void
}

export const Votes = (props: VoicesProps) => {
  const onVoice = async (value: VoteValue) => {
    await supabase
      .from('Voice')
      .upsert(
        {
          value,
          postDetailsId: props.postDetailsId,
          testerId: props.testerId
        },
        { onConflict: 'postDetailsId, testerId' }
      )
      .eq('testerId', props.testerId)
  }

  const setVotes = (value: VoteValue) => {
    const updated = props.voces.map(voice => (voice.testerId === props.testerId ? { ...voice, value } : voice))
    props.setVotes(updated)
  }

  const testerVoice = props.voces.find(voice => voice.testerId === props.testerId)

  return (
    <div class={'flex flex-col'}>
      <div class={'w-40 flex flex-row justify-between font-semibold'}>
        <h2 class={'text-primary font-semibold'}>Votes</h2>
        <div class={'flex flex-row gap-1 text-white text-[14px] transition-all duration-300'}>
          <button
            onClick={async () => {
              setVotes('NEGATIVE')
              onVoice('NEGATIVE')
            }}
            class={`w-7 py-1 bg-border-light border border-primary rounded ${
              testerVoice && testerVoice.value === 'NEGATIVE' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            -1
          </button>
          <button
            onClick={async () => {
              setVotes('NEUTRAL')
              onVoice('NEUTRAL')
            }}
            class={`w-7 py-1 bg-border-light border border-primary rounded ${
              testerVoice && testerVoice.value === 'NEUTRAL' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            +0
          </button>
          <button
            onClick={async () => {
              setVotes('POSITIVE')
              onVoice('POSITIVE')
            }}
            class={`w-7 py-1 bg-border-light border border-primary rounded ${
              testerVoice && testerVoice.value === 'POSITIVE' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            +1
          </button>
        </div>
      </div>

      <ul class={'flex flex-col gap-2 mt-2 font-semibold overflow-y-scroll light-scrollbar'}>
        {props.voces.map(vote => (
          <li key={vote.testerId} class={'h-7 flex flex-row justify-between px-2 bg-dark darkborder rounded'}>
            <span>{vote.tester?.username}</span>
            <span class={'font-mono font-light'}>
              {vote.value === 'POSITIVE' ? 1 : vote.value === 'NEGATIVE' ? -1 : 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
