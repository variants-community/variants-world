import { GameType } from '@prisma/client'
import { useEffect, useState } from 'preact/hooks'
import { isTitleValid } from '../../hepers'

type InitState = {
  title?: string
  type?: GameType
  description?: string
}

export const useFormData = (initState?: InitState) => {
  const [errors, setErrors] = useState<Set<string>>(new Set())
  const [title, setTitle] = useState<string>(initState?.title ?? '')
  const [type, setType] = useState<GameType>(initState?.type ?? GameType.NCV)
  const [description, setDescription] = useState<string>(
    initState?.description ?? ''
  )

  useEffect(() => {
    const temp = new Set(errors)
    if (isTitleValid(title)) {
      temp.delete('title')
      setErrors(temp)
    } else {
      temp.add('title')
      setErrors(temp)
    }
    console.log('tit', errors)
  }, [title])

  // useEffect(() => {
  //   const temp = new Set(errors)
  //   if (isDescriptionValid(description)) {
  //     console.log('des del')
  //     temp.delete('description')
  //     setErrors(temp)
  //   } else {
  //     console.log('des set')
  //     temp.add('description')
  //     setErrors(temp)
  //   }
  //   console.log('des', errors)
  // }, [description])

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
