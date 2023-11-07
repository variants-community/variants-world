import { GameInputStatus } from 'components/landing/first/GameInput'
import {
  type GamesConfirmationRequest,
  type GamesConfirmationResponse,
  ValidationStatus,
  createViolationMessages
} from 'utils/games-validation'
import { useEffect } from 'preact/hooks'
import { useSearch } from 'src/hooks/use-search'
import { useSignal } from '@preact/signals'
import type { CGABotGameDetails } from 'cgabot'

const ValidationStatusMap: Record<ValidationStatus, GameInputStatus> = {
  [ValidationStatus.Success]: GameInputStatus.Valid,
  [ValidationStatus.Warning]: GameInputStatus.Warning,
  [ValidationStatus.Failure]: GameInputStatus.Invalid
}

export type ValidationDetails = {
  timestamp: number
  players: number
  similarGames: number
  finalGames: number
}

const fetchForValidation = async (details: GamesConfirmationRequest, signal?: AbortSignal) => {
  const request: GamesConfirmationRequest = {
    mainGame: `${details.mainGame}`,
    confirmingGames: [...details.confirmingGames]
  }
  const response = await fetch(`/api/game/validate`, {
    method: 'post',
    body: JSON.stringify(request),
    signal
  })
  return response.json()
}

export const useGameValidation = (game: CGABotGameDetails | undefined) => {
  const violations = useSignal<string[]>([])
  const approveIds = useSignal<string[]>(new Array<string>(8).fill(''))
  const approveIdsState = useSignal<GameInputStatus[]>(new Array<GameInputStatus>(8).fill(GameInputStatus.Default))
  const isApproved = useSignal(false)
  const { data: gamesConfirmationResponse, setQuery } = useSearch<
    GamesConfirmationRequest | undefined,
    GamesConfirmationResponse
  >({
    default: undefined,
    onQuery: fetchForValidation
  })

  useEffect(() => {
    if (gamesConfirmationResponse) {
      violations.value = createViolationMessages(gamesConfirmationResponse, approveIds.value)
      const games = gamesConfirmationResponse.confirmingGames
      for (let i = 0; i < games.length; i++) {
        if (approveIds.value[i].length === 0) setApproveIdState(GameInputStatus.Default, i)
        else setApproveIdState(ValidationStatusMap[games[i]], i)
      }
      isApproved.value =
        approveIdsState.value.every(state => state === GameInputStatus.Valid || state === GameInputStatus.Warning) &&
        violations.value.length === 0
    }
  }, [gamesConfirmationResponse])

  const setApproveId = (id: string, index: number) => {
    const temp = [...approveIds.value]
    temp[index] = id
    approveIds.value = temp
    return temp
  }

  const setApproveIdState = (idState: GameInputStatus, index: number) => {
    const temp = [...approveIdsState.value]
    temp[index] = idState
    approveIdsState.value = temp
    return temp
  }

  const changeApproveId = async (id: string, index: number) => {
    if (game) {
      const updatedIds = setApproveId(id, index)
      setQuery({
        mainGame: `${game.gameNr}`,
        confirmingGames: [...updatedIds]
      })
    }
  }

  const clearApproveIds = () => {
    approveIds.value = new Array<string>(8).fill('')
    approveIdsState.value = new Array<GameInputStatus>(8).fill(GameInputStatus.Default)
  }

  return {
    isApproved: isApproved.value,
    approveIds: approveIds.value,
    approveIdsState: approveIdsState.value,
    changeApproveId,
    clearApproveIds,
    violations: violations.value,
    validationDetails: gamesConfirmationResponse?.details!
  }
}
