import { type ValidationRequest, type ValidationResponse, ValidationStatus } from 'utils/games-validation'
import { createViolationMessages } from 'utils/game-violations'
import { useComputed, useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'
import { useSearch } from 'src/hooks/use-search'
import type { CGABotGameDetails } from 'cgabot'

export type ValidationDetails = {
  timestamp: number
  players: number
  similarGames: number
  finalGames: number
}

const sendValidationRequest = async (details: ValidationRequest, abortSignal?: AbortSignal) => {
  const request: ValidationRequest = {
    mainGameNr: `${details.mainGameNr}`,
    confirmingGameNrs: details.confirmingGameNrs
  }
  const response = await fetch(`/api/game/validate`, {
    method: 'post',
    body: JSON.stringify(request),
    signal: abortSignal
  })
  return response.json() as Promise<ValidationResponse>
}

export type InputPayload = { gameNr: string; status: ValidationStatus; loading: boolean }

export const useNewPostValidation = (mainGame: CGABotGameDetails | undefined) => {
  const confirmingGameNrs = useSignal<string[]>(Array.from({ length: 8 }, () => ''))
  const activeGameIndex = useSignal<number | undefined>(undefined)
  const { signal: validationResponse, setQuery: setValidationRequest } = useSearch({
    default: undefined as ValidationRequest | undefined,
    onQuery: sendValidationRequest
  })

  const violations = useComputed(
    () =>
      validationResponse.value &&
      mainGame &&
      createViolationMessages(
        validationResponse.value,
        [`${mainGame.gameNr}`, ...confirmingGameNrs.peek()],
        activeGameIndex.value
      )
  )

  const inputsPayload = useComputed(() =>
    confirmingGameNrs.value.map((gameNr, index) => ({
      gameNr,
      status: validationResponse.value?.confirmingGameNrsStatus[index + 1] ?? ValidationStatus.Unknown,
      loading: loadingGameIndex.value === index
    }))
  )

  // Define the game loading state
  const loadingGameIndex = useSignal<number | undefined>(undefined)
  const loadingGameDelay = useRef<number>()

  // Clear loading state when a validation response comes
  useEffect(() => {
    clearTimeout(loadingGameDelay.current)
    loadingGameIndex.value = undefined
  }, [validationResponse.value])

  const someConfirmingGameNrs = useComputed(() => confirmingGameNrs.value.some(Boolean))
  const isAllValidated = useComputed(() => !violations.value?.length && someConfirmingGameNrs.peek())

  const setConfirmingGameNr = async (input: string, index: number) => {
    const match = input.match(/(game\/|#|^)(\d+)/)
    const gameNr = match ? match[2].slice(0, 9) : input
    if (mainGame) {
      // Update gameNr in state
      confirmingGameNrs.value = confirmingGameNrs.value.map((x, i) => (i === index ? gameNr : x))

      if (someConfirmingGameNrs.value) {
        // Set loading state to the game updated, when sending a validation request
        clearTimeout(loadingGameDelay.current)
        loadingGameDelay.current = self.setTimeout(() => (loadingGameIndex.value = index), 500)

        // Send validation request
        setValidationRequest({
          mainGameNr: `${mainGame.gameNr}`,
          confirmingGameNrs: confirmingGameNrs.value
        })
      } else validationResponse.value = undefined
    }
  }

  return {
    isAllValidated: isAllValidated.value,
    confirmingGameNrs: confirmingGameNrs.value,
    inputsPayload: inputsPayload.value,
    setConfirmingGameNr,
    violations: violations.value,
    validationDetails: validationResponse.value?.details,
    activeGameIndex
  }
}
