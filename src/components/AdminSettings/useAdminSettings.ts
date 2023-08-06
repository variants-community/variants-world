import { useEffect, useState } from 'preact/hooks'

import type { PostDetails } from '../../db/prisma/queries'

import { getValueFromEvent } from '../../hepers'

import type {
  GameClassification,
  GameplayClassification,
  Voice
} from '@prisma/client'
import type { VoiceExtended } from './Votes'
import { supabase } from '../../db/supabase/supabase'

export const useAdminSettings = (details: PostDetails) => {
  const [gameClassification, setGameClassification] = useState(
    details.gameClassification
  )
  const [gameplayClassification, setGameplayClassification] = useState(
    details.gameplayClassification
  )
  const [notes, setNotes] = useState<string | null>(details.notes)
  const [votes, setVotes] = useState<VoiceExtended[] | []>(details.voices)

  useEffect(() => {
    const channel = supabase
      .channel('adminSettings channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'PostDetails',
          filter: `id=eq.${details.postId}`
        },
        (payload) => {
          const updated = payload.new as PostDetails
          setGameClassification(updated.gameClassification)
          setGameplayClassification(updated.gameplayClassification)
          setNotes(updated.notes)
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Voice',
          filter: `postId=eq.${details.postId}`
        },
        async (payload) => {
          const updated = payload.new as Voice
          const user = await supabase
            .from('User')
            .select('*')
            .eq('id', updated.testerId)
            .single()

          const voiceWithUser = { ...updated, tester: user.data }

          if (votes.length > 0) {
            setVotes(
              votes.map((voice) =>
                voice.id === voiceWithUser.id ? voiceWithUser : voice
              ) as VoiceExtended[]
            )
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
          filter: `postId=eq.${details.postId}`
        },
        async (payload) => {
          const updated = payload.new as Voice
          const user = await supabase
            .from('User')
            .select('*')
            .eq('id', updated.testerId)
            .single()

          const voiceWithUser = { ...updated, tester: user.data }
          setVotes([...votes, voiceWithUser as VoiceExtended])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, votes])

  const onChangeGameClassification = async (e: Event) => {
    const value = getValueFromEvent<GameClassification>(e)
    setGameClassification(value)
    await supabase
      .from('PostDetails')
      .update({
        gameClassification: value
      })
      .eq('postId', details.postId)
  }

  const setGameplayClassificationOnChange = async (
    value: GameplayClassification
  ) => {
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
