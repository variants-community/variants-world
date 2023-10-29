import type { CGABotGameDetails } from 'cgabot'
import type { GameStatus } from '@prisma/client'

export const getValueFromEvent = <Type = string>(e: Event) => (e.target as HTMLInputElement).value as Type

export const isIdValid = (gameNr: string): boolean => {
  return /^\d+$/.test(gameNr)
}

export const isTitleValid = (title: string): boolean => {
  return title.length > 4
}

export const isDescriptionValid = (description: string): boolean => {
  return description.length > 4
}

// to confirm the identity of the games
export const getTextForComparing = (game: CGABotGameDetails) => game.q.startFen + JSON.stringify(game.q.ruleVariants)

// to display the correct data type after filtering
export const isCGABotGameDetails = (game: CGABotGameDetails | undefined): game is CGABotGameDetails => {
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

export const formatDate = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}

export const scrollToElement = (tagId: string) => {
  const element = document.getElementById(tagId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export const formatLikesCount = (likes: number): string => {
  if (likes < 1000) return likes.toString()
  else if (likes < 1000000) return `${(likes / 1000).toFixed(1)}k`
  else return `${(likes / 1000000).toFixed(1)}M`
}

export const convertUTCDateToLocalDate = (utcDate: Date) => {
  const date = new Date(utcDate)
  const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)

  const offset = date.getTimezoneOffset() / 60
  const hours = date.getHours()

  newDate.setHours(hours - offset)

  return newDate
}

export const getFormattedTimePassed = (createdAt: Date): string => {
  const now = new Date()
  const timePassed = now.getTime() - createdAt.getTime()
  const millisecondsPerDay = 24 * 60 * 60 * 1000

  if (timePassed < millisecondsPerDay) {
    return 'today'
  } else if (timePassed < 2 * millisecondsPerDay) {
    return 'yesterday'
  } else if (timePassed < 7 * millisecondsPerDay) {
    const daysAgo = Math.floor(timePassed / millisecondsPerDay)
    return `${daysAgo} days ago`
  } else if (timePassed < 30 * millisecondsPerDay) {
    const weeksAgo = Math.floor(timePassed / (7 * millisecondsPerDay))
    return `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} ago`
  } else if (timePassed < 365 * millisecondsPerDay) {
    const monthsAgo = Math.floor(timePassed / (30 * millisecondsPerDay))
    return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`
  } else {
    const yearsAgo = Math.floor(timePassed / (365 * millisecondsPerDay))
    return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`
  }
}

export const getGamePictureUrl = (fen: string) => {
  return `https://assets.variants.studio/image?quadratic&size=550&fen=${fen}`
}

export const similar = (first: string, second: string, caseSensitive = true) => {
  let longer = first.toString()
  let shorter = second
  if (first.length < second.length) {
    longer = second
    shorter = first.toString()
  }
  const longerLength = longer.length
  if (longerLength === 0) return 1
  return (longerLength - diffs(longer, shorter, caseSensitive)) / longerLength
}

const diffs = (s1: string, s2: string, caseSensitive: boolean) => {
  if (caseSensitive) {
    s1 = s1.toLowerCase()
    s2 = s2.toLowerCase()
  }
  const a: number[] = []
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) a[j] = j
      else {
        if (j > 0) {
          let newValue = a[j - 1]
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), a[j]) + 1
          a[j - 1] = lastValue
          lastValue = newValue
        }
      }
    }
    if (i > 0) a[s2.length] = lastValue
  }
  return a[s2.length]
}
