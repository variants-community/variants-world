type PostUserProps = {
  username: string
  profileUrl?: string | null
}

const PostUser = (props: PostUserProps) => {
  return (
    <div class={'flex flex-row items-center gap-2'}>
      <img
        src={props.profileUrl ?? '/assets/images/user.png'}
        alt={props.username}
        class="h-5 w-5 sm:(h-6 w-6) rounded-md"
      />
      <span class={'font-semibold'}>{props.username}</span>
    </div>
  )
}

export default PostUser
