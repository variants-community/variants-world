import { GameType } from '@prisma/client'
import { isTitleValid } from 'utils/hepers'
import { useEffect, useState } from 'preact/hooks'

type InitState = {
  title?: string
  type?: GameType
  description?: string
}

export const useFormData = (initState?: InitState) => {
  const [errors, setErrors] = useState<Set<string>>(new Set())
  const [title, setTitle] = useState<string>(initState?.title ?? '')
  const [type, setType] = useState<GameType>(initState?.type ?? GameType.NCV)
  const [description, setDescription] = useState<string>(initState?.description ?? '')

  useEffect(() => {
    const temp = new Set(errors)
    if (isTitleValid(title)) {
      temp.delete('title')
      setErrors(temp)
    } else {
      temp.add('title')
      setErrors(temp)
    }
  }, [title])

  return {
    errors,
    title,
    setTitle,
    type,
    setType,
    description,
    setDescription
  }
}
