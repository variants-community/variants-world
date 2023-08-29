import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { GameType } from '@prisma/client'

type UseGameInfoProps = {
  postId: number
  type: string
  title: string
  user: string
  description: string
}

export const useGameInfo = (props: UseGameInfoProps) => {
  const gameInfo = useSignal({
    title: props.title,
    type: props.type,
    description: props.description
  })

  useEffect(() => {
    const channel = supabase
      .channel('game-info')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Post',
          filter: `id=eq.${props.postId}`
        },
        payload => {
          gameInfo.value = payload.new as UseGameInfoProps
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const changeType = async (gameType: GameType) => {
    gameInfo.value.type = gameType
    await supabase.from('Post').update({ type: gameType }).eq('id', props.postId)
  }

  const changeTitle = async (title: string) => {
    gameInfo.value.title = title
    await supabase.from('Post').update({ title }).eq('id', props.postId)
  }

  const changeDescription = async (description: string) => {
    gameInfo.value.description = description
    await supabase.from('Post').update({ description }).eq('id', props.postId)
  }

  return {
    title: gameInfo.value.title,
    changeTitle,
    type: gameInfo.value.type,
    changeType,
    description: gameInfo.value.description,
    changeDescription
  }
}
