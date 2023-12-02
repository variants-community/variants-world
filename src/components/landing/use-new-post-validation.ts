import { type ValidationRequest, type ValidationResponse, ValidationStatus } from 'utils/games-validation'
import { createViolationMessages } from 'utils/game-violations'
import { useComputed, useSignal } from '@preact/signals'
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

export type InputPayload = { gameNr: string; status: ValidationStatus }

export const useNewPostValidation = (mainGame: CGABotGameDetails | undefined) => {
  const confirmingGameNrs = useSignal<string[]>(Array.from({ length: 8 }, () => ''))
  const { signal: validationResponse, setQuery: setValidationRequest } = useSearch({
    default: undefined as ValidationRequest | undefined,
    onQuery: sendValidationRequest
  })

  const violations = useComputed(
    () =>
      validationResponse.value &&
      mainGame &&
      createViolationMessages(validationResponse.value, [`${mainGame.gameNr}`, ...confirmingGameNrs.peek()])
  )

  const inputsPayload = useComputed(() =>
    confirmingGameNrs.value.map((gameNr, index) => ({
      gameNr,
      status: validationResponse.value?.confirmingGameNrsStatus[index + 1] ?? ValidationStatus.Unknown
    }))
  )

  const someConfirmingGameNrs = useComputed(() => confirmingGameNrs.value.some(Boolean))
  const isAllValidated = useComputed(() => !violations.value?.length && someConfirmingGameNrs.peek())

  const setConfirmingGameNr = async (input: string, index: number) => {
    const match = input.match(/(game\/|#|^)(\d+)/)
    const gameNr = match ? match[2].slice(0, 9) : input
    if (mainGame) {
      // Update gameNr in state
      confirmingGameNrs.value = confirmingGameNrs.value.map((x, i) => (i === index ? gameNr : x))
      // Send validation request
      if (someConfirmingGameNrs.value) {
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
    validationDetails: validationResponse.value?.details
  }
}
