import { User, Voice, VoteValue } from '@prisma/client'
import { supabase } from 'db/supabase/supabase'

export type VoiceExtended = Voice & ({ tester?: User } | undefined)

type VoicesProps = {
  postId: number
  testerId: number
  voces: VoiceExtended[]
}

export const Votes = (props: VoicesProps) => {
  const onVoice = async (value: VoteValue) => {
    await supabase
      .from('Voice')
      .upsert(
        {
          value,
          postId: props.postId,
          testerId: props.testerId
        },
        { onConflict: 'postId, testerId' }
      )
      .eq('testerId', props.testerId)
  }

  const testerVoice = props.voces.find(voice => voice.testerId === props.testerId)

  return (
    <div class={'flex flex-col'}>
      <div class={'w-[160px] flex flex-row justify-between font-semibold'}>
        <h2 class={'text-primary font-[16px] font-semibold'}>Votes</h2>
        <div class={'flex flex-row text-white text-[14px] gap-[5px] transition-all duration-300'}>
          <button
            onClick={async () => onVoice('NEGATIVE')}
            class={`w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px] ${
              testerVoice && testerVoice.value === 'NEGATIVE' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            -1
          </button>
          <button
            onClick={async () => onVoice('NEUTRAL')}
            class={`w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px] ${
              testerVoice && testerVoice.value === 'NEUTRAL' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            +0
          </button>
          <button
            onClick={async () => onVoice('POSITIVE')}
            class={`w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px] ${
              testerVoice && testerVoice.value === 'POSITIVE' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            +1
          </button>
        </div>
      </div>

      <ul class={'flex flex-col gap-[8px] mt-[6px] font-[16px] font-semibold  overflow-scroll'}>
        {props.voces.map(vote => (
          <li
            key={vote.testerId}
            class={'h-[30px] px-[10px] flex flex-row justify-between bg-dark border-bold rounded-[3px]'}
          >
            <span>{vote.tester?.name}</span>
            <span class={'font-mono font-light'}>
              {vote.value === VoteValue.POSITIVE ? 1 : vote.value === VoteValue.NEGATIVE ? -1 : 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
