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
    <div className={'flex flex-col'}>
      <div className={'w-[160px] flex flex-row justify-between font-semibold'}>
        <h2 className={'text-primary font-[16px] font-semibold'}>Votes</h2>
        <div className={'flex flex-row text-white text-[14px] gap-[5px] transition-all duration-300'}>
          <button
            onClick={async () => onVoice('NEGATIVE')}
            className={`w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px] ${
              testerVoice && testerVoice.value === 'NEGATIVE' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            -1
          </button>
          <button
            onClick={async () => onVoice('NEUTRAL')}
            className={`w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px] ${
              testerVoice && testerVoice.value === 'NEUTRAL' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            +0
          </button>
          <button
            onClick={async () => onVoice('POSITIVE')}
            className={`w-[30px] py-[3px] bg-border-light border border-primary rounded-[3px] ${
              testerVoice && testerVoice.value === 'POSITIVE' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            +1
          </button>
        </div>
      </div>

      <ul className={'flex flex-col gap-[8px] mt-[6px] font-[16px] font-semibold  overflow-scroll'}>
        {props.voces.map(vote => (
          <li
            key={vote.testerId}
            className={'h-[30px] px-[10px] flex flex-row justify-between bg-dark bold-border rounded-[3px]'}
          >
            <span>{vote.tester?.name}</span>
            <span className={'font-mono font-light'}>
              {vote.value === VoteValue.POSITIVE ? 1 : vote.value === VoteValue.NEGATIVE ? -1 : 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
