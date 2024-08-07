import { cl } from 'utils/hepers'

const LikeIcon = (props: { class?: string; isLiked?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 22"
    class={cl(
      props.class ?? 'w-[18px] h-[16px] sm:(w-6 h-6)',
      'stroke-2',
      props.isLiked ? 'fill-red' : 'fill-transparent'
    )}
  >
    <path
      d="M10.9183 19.264L10.9168 19.2627C7.80611 16.5529 5.30719 14.3736 3.5739 12.3379C1.8507 10.314 1 8.56197 1 6.725C1 3.76411 3.41808 1.38461 6.6 1.38461C8.3999 1.38461 10.1321 2.19433 11.2517 3.4573L12 4.30149L12.7483 3.4573C13.8679 2.19433 15.6001 1.38461 17.4 1.38461C20.5819 1.38461 23 3.76411 23 6.725C23 8.56199 22.1493 10.314 20.4259 12.3396C18.6925 14.3768 16.1938 16.5587 13.0833 19.2741C13.083 19.2744 13.0827 19.2747 13.0824 19.275L12.0025 20.2122L10.9183 19.264Z"
      class="stroke-red"
    />
  </svg>
)

export default LikeIcon
