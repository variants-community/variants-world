import { getGamePictureUrl } from 'utils/hepers'

export const Picture = (props: { fen: string; id?: number; class?: string }) => (
  <img
    src={getGamePictureUrl(props.fen)}
    style={props.id ? { 'view-transition-name': `image-${props.id}` } : undefined}
    class={props.class}
  />
)
