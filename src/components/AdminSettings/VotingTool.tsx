import { supabase } from 'db/supabase/supabase'
import type { User } from 'db/prisma/queries'
import type { Vote, VoteValue } from '@prisma/client'

export type VoteExtended = Vote & ({ tester: User | null } | undefined)

type VotesProps = {
  postDetailsId: number
  testerId: number
  votes: VoteExtended[]
  setVotes: (votes: VoteExtended[]) => void
}

export const VotingTool = (props: VotesProps) => {
  const onVote = async (value: VoteValue) => {
    await supabase
      .from('Vote')
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
    const updated = props.votes.map(vote => (vote.testerId === props.testerId ? { ...vote, value } : vote))
    props.setVotes(updated)
  }

  const testerVote = props.votes.find(vote => vote.testerId === props.testerId)

  return (
    <div class={'flex flex-col'}>
      <div class={'w-40 flex flex-row justify-between font-semibold'}>
        <h2 class={'text-primary font-semibold'}>Votes</h2>
        <div class={'flex flex-row gap-1 text-white text-[14px] transition-all duration-300'}>
          <button
            onClick={async () => {
              setVotes('NEGATIVE')
              onVote('NEGATIVE')
            }}
            class={`w-7 py-1 bg-border-light border border-primary rounded ${
              testerVote && testerVote.value === 'NEGATIVE' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            -1
          </button>
          <button
            onClick={async () => {
              setVotes('NEUTRAL')
              onVote('NEUTRAL')
            }}
            class={`w-7 py-1 bg-border-light border border-primary rounded ${
              testerVote && testerVote.value === 'NEUTRAL' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            +0
          </button>
          <button
            onClick={async () => {
              setVotes('POSITIVE')
              onVote('POSITIVE')
            }}
            class={`w-7 py-1 bg-border-light border border-primary rounded ${
              testerVote && testerVote.value === 'POSITIVE' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            +1
          </button>
        </div>
      </div>

      <ul class={'flex flex-col gap-2 mt-2 font-semibold overflow-y-scroll light-scrollbar'}>
        {props.votes.map(vote => (
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
