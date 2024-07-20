import { actions } from 'astro:actions'
import { descriptionValid } from 'utils/post-validation'
import { supabase } from 'db/supabase/supabase'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import type { CGABotGameDetails } from 'cgabot'
import type { GameType } from '@prisma/client'

type GameData = {
  userId: number
  mainGame: CGABotGameDetails
  confirmingGameNrs: string[]
}

export const useFormData = (gameData: GameData) => {
  const errors = useSignal<Set<string>>(new Set())
  const serverError = useSignal<string | undefined>(undefined)

  useEffect(() => {
    validateTitle(gameData.mainGame.q.title)
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
    try {
      descriptionValid(description)
      temp.delete('invalidDescription')
    } catch {
      temp.add('invalidDescription')
    }
    errors.value = temp
  }

  const formData = useSignal({
    title: gameData.mainGame.q.title,
    type: 'NCV' as GameType,
    description: ''
  })

  const changeTitle = async (title: string) => {
    formData.value = { ...formData.value, title }
    await validateTitle(title)
  }

  const changeType = (type: GameType) => {
    formData.value = { ...formData.value, type }
  }

  const changeDescription = (description: string) => {
    formData.value = { ...formData.value, description }
    validateDescription(description)
  }

  const submit = async () => {
    validateDescription(formData.value.description)
    await validateTitle(formData.value.title)

    if (errors.value.size === 0) {
      const response = await actions.createPost({
        title: formData.value.title,
        description: formData.value.description,
        type: formData.value.type,
        gameNr: gameData.mainGame.gameNr.toString(),
        confirmingGameNrs: gameData.confirmingGameNrs,
        userId: gameData.userId
      })

      if (response.confirmedGameId) {
        self.location.replace(`/posts/${response.confirmedGameId}`)
      } else if (response.error === 'User not found') {
        self.location.pathname = '/logout'
      } else {
        serverError.value = response.error
      }
    }
  }

  return {
    submit,
    serverError: serverError.value,
    errors: errors.value,
    title: formData.value.title,
    changeTitle,
    type: formData.value.type,
    changeType,
    description: formData.value.description,
    changeDescription
  }
}
