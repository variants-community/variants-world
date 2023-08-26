import { fetchGameById } from 'utils/fetch-queries'
import { isIdValid } from 'utils/hepers'
import { useEffect, useState } from 'preact/hooks'
import type { CGABotGameDetails } from 'cgabot'

export const useSearch = () => {
  const [isInvalidId, setIsInvalidId] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const [gameId, setGameId] = useState('')
  const [game, setGame] = useState<CGABotGameDetails>()

  const [searchTimeout, setSearchTimeout] = useState<number>()

  useEffect(() => {
    const abortController = new AbortController()
    if (isIdValid(gameId)) {
      if (searchTimeout) self.clearTimeout(searchTimeout)
      setSearchTimeout(
        self.setTimeout(() => {
          setIsSearching(true)
          setIsLoading(true)
          fetchGameById(gameId, abortController.signal)
            // eslint-disable-next-line github/no-then
            .then(data => {
              if (data) {
                console.log(data)
                setGame(data)
              } else {
                setIsInvalidId(true)
              }
            })
            .finally(() => setIsLoading(false))
        }, 300)
      )
    } else {
      setIsSearching(false)
      setGame(undefined)
    }
    return () => {
      abortController.abort()
    }
  }, [gameId])

  return {
    game,
    gameId,
    setGameId,
    isLoading,
    isSearching,
    isInvalidId
  }
}
