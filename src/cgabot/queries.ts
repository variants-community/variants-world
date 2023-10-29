import { CGABotToken, CGABotUrl, cache } from 'cgabot/config'
import type { CGABotGameDetails } from 'cgabot/interface'

export const getGameDetailsById = async (gameNr: string): Promise<CGABotGameDetails | undefined> => {
  const fromCache = cache.get(gameNr)

  if (fromCache) {
    console.log('[cgabot] from cache: ', fromCache.gameNr)
    return fromCache
  }

  try {
    const response = await fetch(`${CGABotUrl}/game/${gameNr}?${new URLSearchParams({ token: CGABotToken })}`)

    if (response && response.status === 200) {
      const game = (await response.json()) as CGABotGameDetails
      cache.put(gameNr, game)
      console.log('[cgabot] from cgabot API: ', game.gameNr)
      return game
    }
  } finally {
    // return nothing (undefined)
  }
}
