import type { CGABotGameDetails } from './cgabot'

export const getValueFromEvent = <Type = string>(e: Event) =>
  (e.target as HTMLInputElement).value as Type

export const isIdValid = (gameId: string): boolean => {
  return /^\d{8,9}$/.test(gameId)
}

export const fetchGameById = async (gameId: string) => {
  const response = await fetch(`/api/game/${gameId}`, { method: 'get' })
  if (response.status === 200) {
    return await response.json() as CGABotGameDetails
  } else {
    return undefined
  }
}

export const postAllGameIdsToCreatePost = async (ids: string[]) => {
 const response = await fetch('/api/game/create', { method: 'post', body: JSON.stringify(ids) }).catch()
 return response.status
}
