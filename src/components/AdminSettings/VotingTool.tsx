import { getConvexClient } from 'src/lib/convex-client'
import type { UserForCard, VoteValue } from 'db/convex/types'

export type VoteExtended = {
  _id: string
  value: VoteValue
  testerId: string
  postDetailsId: string
  tester: UserForCard | null
}

type VotesProps = {
  postDetailsId: string
  testerId: string
  votes: VoteExtended[]
  setVotes: (votes: VoteExtended[]) => void
}

export const VotingTool = (props: VotesProps) => {
  const convex = getConvexClient()

  const onVote = async (value: VoteValue) => {
    const { api } = await import('../../../convex/_generated/api')
    await convex.mutation(api.votes.upsert, {
      value,
      postDetailsId: props.postDetailsId as any,
      testerId: props.testerId as any
    })
  }

  const removeVote = async () => {
    props.setVotes(props.votes.filter(v => v.testerId !== props.testerId))
    const { api } = await import('../../../convex/_generated/api')
    await convex.mutation(api.votes.remove, {
      testerId: props.testerId as any,
      postDetailsId: props.postDetailsId as any
    })
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
              if (testerVote?.value === 'NEGATIVE') {
                removeVote()
              } else {
                setVotes('NEGATIVE')
                onVote('NEGATIVE')
              }
            }}
            class={`w-7 py-1 bg-border-light border border-primary rounded ${
              testerVote && testerVote.value === 'NEGATIVE' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            -1
          </button>
          <button
            onClick={async () => {
              if (testerVote?.value === 'NEUTRAL') {
                removeVote()
              } else {
                setVotes('NEUTRAL')
                onVote('NEUTRAL')
              }
            }}
            class={`w-7 py-1 bg-border-light border border-primary rounded ${
              testerVote && testerVote.value === 'NEUTRAL' ? 'bg-primary' : 'hover:bg-primary'
            }`}
          >
            +0
          </button>
          <button
            onClick={async () => {
              if (testerVote?.value === 'POSITIVE') {
                removeVote()
              } else {
                setVotes('POSITIVE')
                onVote('POSITIVE')
              }
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
