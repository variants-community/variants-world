import { IdInputState } from 'components/NewPost/IdInput'
import { useSignal } from '@preact/signals'
import type { CGABotGameDetails } from 'cgabot'

export const useNewPostApprove = (game: CGABotGameDetails | undefined) => {
  const approveIds = useSignal<string[]>(new Array<string>(8).fill(''))
  const approveIdsState = useSignal<IdInputState[]>(new Array<IdInputState>(8).fill(IdInputState.INPUT))
  const isApproved = useSignal(false)

  const setApproveId = (id: string, index: number) => {
    const temp = [...approveIds.value]
    temp[index] = id
    approveIds.value = temp
  }

  const setApproveIdState = (idState: IdInputState, index: number) => {
    const temp = [...approveIdsState.value]
    temp[index] = idState
    approveIdsState.value = temp
  }

  const changeApproveId = async (id: string, index: number) => {
    if (game) {
      if (id.length === 0) {
        setApproveId('', index)
        setApproveIdState(IdInputState.INPUT, index)
      } else {
        if (!approveIds.value.includes(id)) {
          const response = await fetch(`/api/game/${game.gameNr}/same-as/${id}`, {
            method: 'get'
          })

          const isSame = (await response.json()) as boolean

          if (isSame) {
            setApproveIdState(IdInputState.ACCEPTED, index)
          } else {
            setApproveIdState(IdInputState.DECLINED, index)
          }
        } else {
          setApproveIdState(IdInputState.DECLINED, index)
        }
        setApproveId(id, index)
      }
    }

    isApproved.value = approveIdsState.value.every(state => state === IdInputState.ACCEPTED)
  }

  const clearApproveIds = () => {
    approveIds.value = new Array<string>(8).fill('')
    approveIdsState.value = new Array<IdInputState>(8).fill(IdInputState.INPUT)
  }

  return {
    isApproved: isApproved.value,
    approveIds: approveIds.value,
    approveIdsState: approveIdsState.value,
    changeApproveId,
    clearApproveIds
  }
}
