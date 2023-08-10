import type { CGABotGameDetails, CGABotRuleVariants } from './services/cgabot'
import type { PostDetailsDTO } from './pages/api/posts/create'
import type { GameStatus } from '@prisma/client'
import { ruleMapper } from './services/ruleMapper'

export const getValueFromEvent = <Type = string>(e: Event) =>
  ((e.target as HTMLInputElement).value as Type)

export const isIdValid = (gameId: string): boolean => {
  return /^\d+$/.test(gameId)
}

export const isTitleValid = (title: string): boolean => {
  return title.length > 4
}

export const isDescriptionValid = (description: string): boolean => {
  return description.length > 4
}

export const fetchGameById = async (gameId: string, signal?: AbortSignal) => {
  const response = await fetch(`/api/game/${gameId}`, { method: 'get', signal })
  if (response.status === 200) {
    return (await response.json()) as CGABotGameDetails
  } else {
    return undefined
  }
}

export const postGameToCreatePost = async (data: PostDetailsDTO) => {
  const response = await fetch('/api/posts/create', {
    method: 'post',
    body: JSON.stringify(data)
  })
  return {status: response.status, statusText: response.statusText} 
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

export const mapRuleVariantsToString = (rules: CGABotRuleVariants) => {
  const mappedRules = Object.keys(rules).map((key) =>
    ruleMapper.makeRule(key, rules[key])
  )
  return mappedRules
}

export const formatDate = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  
  
  return `${month} ${day}, ${year}`
}

export const scrollTo = (tagId: string) => {
  const element = document.getElementById(tagId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

