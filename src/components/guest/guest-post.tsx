import { Picture } from 'components/common/Picture'
import PostTitle from 'components/PostTitle'

type Props = {
  postId: number
  type: string
  title: string
  fen: string
}

const GuestPostDetails = (props: Props) => (
  <div class="flex flex-col items-center gap-y-8">
    <div class="animate-fade max-w-11/12 w-160 px-4 py-3 border border-border-light rounded-xl">
      <div class="flex gap-5 flex-wrap">
        <Picture fen={props.fen} class="w-50 h-50" />
        <div class="">
          <PostTitle {...props} />
        </div>
      </div>
    </div>
    <a
      href="/login"
      class="animate-fade bg-border px-4 py-3 bg-dark text-lg font-semibold border border-border-light rounded-xl hover:text-white transition-colors ease-linear"
    >
      Show more
    </a>
  </div>
)

export default GuestPostDetails
