import { EditButton } from 'components/EditButton'
import { StatusName } from 'components/GameStatusCard/StatusName'
import { Verdict } from 'components/GameStatusCard/Verdict'
import { statusToColor } from 'utils/hepers'
import { useEditable } from 'components/common/use-editable'
import { usePostStatus } from 'components/GameStatusCard/use-post-status'
import { getConvexClient } from 'src/lib/convex-client'
import Bubbles from 'components/icons/Bubbles'
import type { GameStatus } from 'db/convex/types'

export type PostResolutionProps = {
  displayEditBotton?: boolean
  verdict: string | null
  postId: number
  convexPostId: string
  status: GameStatus
}

const GameStatusCard = (props: PostResolutionProps) => {
  const data = {
    status: props.status,
    verdict: props.verdict
  }
  const convex = getConvexClient()
  const { editable, update, editing } = useEditable(data, async value => {
    const { api } = await import('../../../convex/_generated/api')
    await convex.mutation(api.posts.update, {
      id: props.convexPostId as any,
      status: value.status,
      verdict: value.verdict ?? undefined
    })
  })
  usePostStatus(props.postId, update)

  return (
    <div
      class={`relative group flex flex-row justify-between items-center text-center bg-border-light text-${statusToColor(
        editable.value.status
      )} shadow-dark rounded-xl`}
      style={{ viewTransitionName: 'card-status' }}
    >
      <Bubbles class="hidden sm:block ml-12 mt-8 mb-6 mr-0" color={statusToColor(editable.value.status)} />
      <div class={'w-full mb-auto px-3'}>
        <StatusName
          isEditMode={editing.value}
          status={editable.value.status}
          onChange={status => (editable.value = { ...editable.value, status })}
        />
        <Verdict
          isEditMode={editing.value}
          verdict={editable.value.verdict}
          onChange={verdict => (editable.value.verdict = verdict)}
        />
      </div>
      <Bubbles
        class="hidden sm:block mr-12 mt-8 mb-6 transform scale-x-inverse"
        color={statusToColor(editable.value.status)}
      />
      {props.displayEditBotton && (
        <div class={'absolute bottom-0 right-1.5'}>
          <EditButton
            class={`${!editing.value && 'md:opacity-0'}
            group-hover:(opacity-100 delay-150) transition-opacity duration-100`}
            {...editing}
          />
        </div>
      )}
    </div>
  )
}

export default GameStatusCard
