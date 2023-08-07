import { useEffect, useState } from 'preact/hooks'
import { fetchGameById, isIdValid } from '../../hepers'
import type { CGABotGameDetails } from '../../services/cgabot'

export const useSearch = () => {
  const [isInvalidId, setIsInvalidId] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const [gameId, setGameId] = useState('')
  const [game, setGame] = useState<CGABotGameDetails>()

  useEffect(() => {
    const abortController = new AbortController()
    if (isIdValid(gameId)) {
      setIsSearching(true)
      setIsLoading(true)

      fetchGameById(gameId, abortController.signal)
        .then((data) => {
          if (data) {
            console.log(data)
            setGame(data)
          } else {
            setIsInvalidId(true)
          }
        })
        .finally(() => setIsLoading(false))
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
