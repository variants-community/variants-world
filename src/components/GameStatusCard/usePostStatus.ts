import type { GameStatus } from '@prisma/client'
import { useEffect, useState } from 'preact/hooks'
import { supabase } from '../../db/supabase/supabase'

export const usePostStatus = (
  initVerdict: string | null,
  initStatus: GameStatus,
  postId: number
) => {
  const [verdict, setVerdict] = useState(initVerdict ?? '')
  const [status, setStatus] = useState(initStatus)

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
        (payload) => {
          const updated = payload.new as {
            verdict: string
            status: GameStatus
          }
          setVerdict(updated.verdict)
          setStatus(updated.status)
          console.log('realtime update: ', updated)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])
  return {
    verdict,
    status
  }
}
