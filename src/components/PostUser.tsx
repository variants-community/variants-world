type PostUserProps = {
  user: string
}

const PostUser = (props: PostUserProps) => {
  return (
    <div class={'flex flex-row items-center gap-2'}>
      <img src="/assets/images/user.png" alt={props.user} class={'h-5 w-5 sm:(h-6 w-6)'} />
      <span class={'font-semibold'}>{props.user}</span>
    </div>
  )
}

export default PostUser
