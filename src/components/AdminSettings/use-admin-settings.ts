import { getValueFromEvent } from 'utils/hepers'
import { useEffect, useState } from 'preact/hooks'
import { getConvexClient } from 'src/lib/convex-client'

import type { PostDetails, GameClassification, GameplayClassification, VoteExtended } from 'db/convex/types'

export const useAdminSettings = (details: PostDetails) => {
  const [gameClassification, setGameClassification] = useState(details.gameClassification ?? undefined)
  const [gameplayClassification, setGameplayClassification] = useState(details.gameplayClassification ?? undefined)
  const [notes, setNotes] = useState<string>(details.notes ?? '')
  const [votes, setVotes] = useState<VoteExtended[]>(details.votes)

  const convex = getConvexClient()

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    const setupSubscription = async () => {
      const { api } = await import('../../../convex/_generated/api')

      unsubscribe = convex.onUpdate(
        api.postDetails.getByPostId,
        { postId: details.postId as any },
        (updated: any) => {
          if (updated) {
            setGameClassification(updated.gameClassification ?? undefined)
            setGameplayClassification(updated.gameplayClassification ?? undefined)
            setNotes(updated.notes ?? '')
            if (updated.votes) {
              setVotes(updated.votes)
            }
          }
        }
      )
    }

    setupSubscription()

    return () => {
      unsubscribe?.()
    }
  }, [details.postId])

  const onChangeGameClassification = async (e: Event) => {
    let value = getValueFromEvent<GameClassification | undefined>(e)

    if ((value as string) === 'Undefined') value = undefined

    setGameClassification(value)

    const { api } = await import('../../../convex/_generated/api')
    await convex.mutation(api.postDetails.update, {
      postId: details.postId as any,
      gameClassification: value ?? null
    })
  }

  const setGameplayClassificationOnChange = async (value: GameplayClassification) => {
    setGameplayClassification(value)

    const { api } = await import('../../../convex/_generated/api')
    await convex.mutation(api.postDetails.update, {
      postId: details.postId as any,
      gameplayClassification: value
    })
  }

  const onChangeNotes = async (e: Event) => {
    const value = getValueFromEvent<string>(e)

    const { api } = await import('../../../convex/_generated/api')
    await convex.mutation(api.postDetails.update, {
      postId: details.postId as any,
      notes: value
    })
  }

  return {
    gameClassification,
    gameplayClassification,
    notes,
    votes,
    setVotes,
    onChangeGameClassification,
    setGameplayClassificationOnChange,
    onChangeNotes
  }
}
