import { CGABotToken, CGABotUrl, cache } from './config'
import type { CGABotGameDetails } from './interface'

export const getGameDetailsById = async (
  gameId: string
): Promise<CGABotGameDetails | undefined> => {
  const fromCache = cache.get(gameId)

  if (fromCache) {
    console.log('[cgabot] from cache: ', fromCache._id)
    return fromCache
  }

  const response = await fetch(
    `${CGABotUrl}/game/${gameId}?` + new URLSearchParams({ token: CGABotToken })
  )

  if (response.status === 200) {
    const game = (await response.json()) as CGABotGameDetails
    cache.put(gameId, game)
    console.log('[cgabot] from cgabot API: ', game._id)
    return game
  }

  return undefined
}
