import type { CGABotGameDetails } from './services/cgabot'
import type { CreatePostDTO } from './pages/api/game/create'
import type { GameStatus } from '@prisma/client'

export const getValueFromEvent = <Type = string>(e: Event) =>
  (e.target as HTMLInputElement).value as Type

export const isIdValid = (gameId: string): boolean => {
  return /^\d+$/.test(gameId)
}

export const fetchGameById = async (gameId: string, signal?: AbortSignal) => {
  const response = await fetch(`/api/game/${gameId}`, { method: 'get', signal })
  if (response.status === 200) {
    return (await response.json()) as CGABotGameDetails
  } else {
    return undefined
  }
}

export const postAllGameIdsToCreatePost = async (
  ids: string[],
  userId: number
) => {
  const data: CreatePostDTO = { gameIds: ids, userId: userId }
  const response = await fetch('/api/game/create', {
    method: 'post',
    body: JSON.stringify(data)
  }).catch()
  return response.status
}

export const getTextForComparing = (game: CGABotGameDetails) =>
  game.q.startFen + JSON.stringify(game.q.ruleVariants)

export const isGame = (
  game: CGABotGameDetails | undefined
): game is CGABotGameDetails => {
  return !!game
}

export const statusToString = (status: GameStatus): string => {
  switch (status) {
    case 'ACCEPTED':
      return 'Accepted'
    case 'DECLINED':
      return 'Declined'
    case 'PENDING_REPLY':
      return 'Pending reply'
    case 'UNDER_REVIEW':
      return 'Under review'
  }
}

export const statusToColor = (status: GameStatus): string => {
  switch (status) {
    case 'ACCEPTED':
      return 'green'
    case 'DECLINED':
      return 'red'
    case 'PENDING_REPLY':
      return 'yellow'
    case 'UNDER_REVIEW':
      return 'blue'
  }
}