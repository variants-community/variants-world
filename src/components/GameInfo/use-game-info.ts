import { getValueFromEvent } from 'utils/hepers'
import { supabase } from 'db/supabase/supabase'
import { useEffect, useState } from 'preact/hooks'
import type { GameType } from '@prisma/client'

type UseGameInfoProps = {
  postId: number
  type: string
  title: string
  user: string
  description: string
  variantLink: string
}

export const useGameInfo = (props: UseGameInfoProps) => {
  const [title, setTitle] = useState(props.title)
  const [type, setType] = useState(props.type)
  const [description, setDescription] = useState(props.description)
  const [variantLink, setVariantLink] = useState(props.variantLink)

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
          const updated = payload.new as UseGameInfoProps
          setTitle(updated.title)
          setType(updated.type)
          setDescription(updated.description)
          setVariantLink(updated.variantLink)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const onTypeChange = async (e: Event) => {
    const typeValue = getValueFromEvent<GameType>(e)
    setType(typeValue)
    await supabase.from('Post').update({ type: typeValue }).eq('id', props.postId)
  }

  const onTitleChange = async (e: Event) => {
    const titleValue = getValueFromEvent(e)
    setTitle(titleValue)
    await supabase.from('Post').update({ title }).eq('id', props.postId)
  }

  const onDescriptionChange = async (e: Event) => {
    const descriptionValue = getValueFromEvent(e)
    setDescription(descriptionValue)
    await supabase.from('Post').update({ description }).eq('id', props.postId)
  }

  const onVariantLinkChange = async (e: Event) => {
    const variantLinkValue = getValueFromEvent(e)
    setVariantLink(variantLinkValue)
  }

  return {
    title,
    onTitleChange,
    type,
    onTypeChange,
    description,
    onDescriptionChange,
    variantLink,
    onVariantLinkChange
  }
}
