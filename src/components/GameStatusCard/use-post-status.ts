import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { GameStatus } from '@prisma/client'

export const usePostStatus = (verdict: string | null, status: GameStatus, postId: number) => {
  const data = useSignal({ status, verdict })

  useEffect(() => {
    const channel = supabase
      .channel('game-status-card')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Post',
          filter: `id=eq.${postId}`
        },
        payload => {
          data.value = payload.new as {
            verdict: string
            status: GameStatus
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const changeStatus = async (newStatus: GameStatus) => {
    data.value.status = newStatus
    await supabase.from('Post').update({ status: newStatus }).eq('id', postId)
  }

  const changeVerdict = async (newVerdict: string) => {
    data.value.verdict = newVerdict
    await supabase.from('Post').update({ verdict: newVerdict }).eq('id', postId)
  }

  return {
    verdict: data.value.verdict,
    status: data.value.status,
    changeStatus,
    changeVerdict
  }
}
