import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import type { GameStatus } from '@prisma/client'

type PostResolution = {
  verdict: string
  status: GameStatus
}

export const usePostStatus = (postId: number, updateData: (data: PostResolution) => void) => {
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
          updateData({
            status: payload.new.status,
            verdict: payload.new.verdict
          } as PostResolution)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])
}
