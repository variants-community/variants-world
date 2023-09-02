import { postGameToCreatePost } from 'utils/fetch-queries'
import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { CGABotGameDetails } from 'cgabot'
import type { GameType } from '@prisma/client'
import type { PostDetails } from 'services/post-details-validator'

type GameData = {
  userId: number
  game: CGABotGameDetails
  approveIds: string[]
}

export const useFormData = (gameData: GameData) => {
  const errors = useSignal<Set<string>>(new Set())

  useEffect(() => {
    validateTitle(gameData.game.q.title)
  }, [])

  const validateTitle = async (title: string) => {
    const { error } = await supabase.from('Post').select('title').eq('title', title.trim()).single()
    const temp = new Set(errors.value)
    if (error) temp.delete('isOccupied')
    else temp.add('isOccupied')
    errors.value = temp
  }

  const validateDescription = (description: string) => {
    const temp = new Set(errors.value)
    if (description.trim().length < 10) temp.add('invalidDescription')
    else temp.delete('invalidDescription')
    errors.value = temp
  }

  const formData = useSignal({
    title: gameData.game.q.title,
    type: 'NCV' as GameType,
    description: ''
  })

  const changeTitle = async (title: string) => {
    formData.value.title = title
    await validateTitle(title)
  }

  const changeType = (type: GameType) => {
    formData.value.type = type
  }

  const changeDescription = (description: string) => {
    formData.value.description = description
    validateDescription(description)
  }

  const submit = async (e: Event) => {
    e.preventDefault()

    validateDescription(formData.value.description)
    await validateTitle(formData.value.title)

    if (errors.value.size === 0) {
      const data: PostDetails = {
        data: {
          description: formData.value.description,
          title: formData.value.title,
          type: formData.value.type
        },
        gameId: gameData.game.gameNr.toString(),
        approveIds: gameData.approveIds,
        userId: gameData.userId
      }

      const response = await postGameToCreatePost(data)

      if (response.confirmedGameId) {
        window.location.replace(`http://localhost:3000/posts/${response.confirmedGameId}`)
      }
    }
  }

  return {
    submit,
    errors: errors.value,
    title: formData.value.title,
    changeTitle,
    type: formData.value.type,
    changeType,
    description: formData.value.description,
    changeDescription
  }
}
