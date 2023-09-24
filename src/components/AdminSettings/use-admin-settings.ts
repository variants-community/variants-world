import { useEffect, useState } from 'preact/hooks'

import type { PostDetails } from 'db/prisma/queries'

import { getValueFromEvent } from 'utils/hepers'

import { supabase } from 'db/supabase/supabase'
import type { GameClassification, GameplayClassification, Voice } from '@prisma/client'
import type { VoiceExtended } from 'components/AdminSettings/Votes'

export const useAdminSettings = (details: PostDetails) => {
  const [gameClassification, setGameClassification] = useState(details.gameClassification ?? undefined)
  const [gameplayClassification, setGameplayClassification] = useState(details.gameplayClassification ?? undefined)
  const [notes, setNotes] = useState<string | null>(details.notes)
  const [votes, setVotes] = useState<VoiceExtended[] | []>(details.voices)

  useEffect(() => {
    const channel = supabase
      .channel('admin-settings')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'PostDetails',
          filter: `postId=eq.${details.postId}`
        },
        payload => {
          const updated = payload.new as PostDetails
          setGameClassification(updated.gameClassification ?? undefined)
          setGameplayClassification(updated.gameplayClassification ?? undefined)
          setNotes(updated.notes)
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Voice',
          filter: `postDetailsId=eq.${details.postId}`
        },
        async payload => {
          const updated = payload.new as Voice
          const user = await supabase.from('User').select('*').eq('id', updated.testerId).single()

          const voiceWithUser = { ...updated, tester: user.data }

          if (votes.length > 0) {
            setVotes(votes.map(voice => (voice.id === voiceWithUser.id ? voiceWithUser : voice)) as VoiceExtended[])
          } else {
            setVotes([voiceWithUser as VoiceExtended])
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Voice',
          filter: `postDetailsId=eq.${details.postId}`
        },
        async payload => {
          const updated = payload.new as Voice
          const user = await supabase.from('User').select('*').eq('id', updated.testerId).single()

          const voiceWithUser = { ...updated, tester: user.data }
          setVotes([...votes, voiceWithUser as VoiceExtended])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const onChangeGameClassification = async (e: Event) => {
    let value = getValueFromEvent<GameClassification | undefined>(e)

    if ((value as string) === 'Undefined') value = undefined

    setGameClassification(value)

    await supabase
      .from('PostDetails')
      .update({
        gameClassification: value ?? null
      })
      .eq('postId', details.postId)
  }

  const setGameplayClassificationOnChange = async (value: GameplayClassification) => {
    setGameplayClassification(value)
    await supabase
      .from('PostDetails')
      .update({
        gameplayClassification: value
      })
      .eq('postId', details.postId)
  }

  const onChangeNotes = async (e: Event) => {
    const value = getValueFromEvent<string>(e)
    await supabase
      .from('PostDetails')
      .update({
        notes: value
      })
      .eq('postId', details.postId)
  }

  return {
    gameClassification,
    gameplayClassification,
    notes,
    votes,
    onChangeGameClassification,
    setGameplayClassificationOnChange,
    onChangeNotes
  }
}
