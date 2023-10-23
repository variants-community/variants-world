import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import type { GameType } from '@prisma/client'

type PostInfo = {
  type: GameType
  title: string
  description: string
}

export const usePostInfo = (postId: number, updateData: (data: PostInfo) => void) => {
  useEffect(() => {
    const channel = supabase
      .channel('game-info')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Post',
          filter: `id=eq.${postId}`
        },
        payload =>
          updateData({
            type: payload.new.type,
            title: payload.new.title,
            description: payload.new.description
          } as PostInfo)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])
}
