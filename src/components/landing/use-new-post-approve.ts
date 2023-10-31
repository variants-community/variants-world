import { GameInputStatus } from 'components/landing/first/GameInput'
import { useSignal } from '@preact/signals'
import type { CGABotGameDetails } from 'cgabot'

export const useGameValidation = (game: CGABotGameDetails | undefined) => {
  const approveIds = useSignal<string[]>(new Array<string>(8).fill(''))
  const approveIdsState = useSignal<GameInputStatus[]>(new Array<GameInputStatus>(8).fill(GameInputStatus.Default))
  const isApproved = useSignal(false)

  const setApproveId = (id: string, index: number) => {
    const temp = [...approveIds.value]
    temp[index] = id
    approveIds.value = temp
  }

  const setApproveIdState = (idState: GameInputStatus, index: number) => {
    const temp = [...approveIdsState.value]
    temp[index] = idState
    approveIdsState.value = temp
  }

  const changeApproveId = async (id: string, index: number) => {
    if (game) {
      if (id.length === 0) {
        setApproveId('', index)
        setApproveIdState(GameInputStatus.Default, index)
      } else {
        if (!approveIds.value.includes(id)) {
          const response = await fetch(`/api/game/${game.gameNr}/same-as/${id}`, {
            method: 'get'
          })

          const isSame = (await response.json()) as boolean

          if (isSame) {
            setApproveIdState(GameInputStatus.Valid, index)
          } else {
            setApproveIdState(GameInputStatus.Invalid, index)
          }
        } else {
          setApproveIdState(GameInputStatus.Invalid, index)
        }
        setApproveId(id, index)
      }
    }

    isApproved.value = approveIdsState.value.every(state => state === GameInputStatus.Valid)
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
    clearApproveIds
  }
}
