import { getGamePictureUrl } from 'utils/hepers'
import type { ReadonlySignal } from '@preact/signals'

export const Picture = (props: { fen: string; id?: number; class?: string | ReadonlySignal<string> }) => (
  <img
    src={getGamePictureUrl(props.fen)}
    style={props.id ? { 'view-transition-name': `image-${props.id}` } : undefined}
    class={props.class}
  />
)
