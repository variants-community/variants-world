type PostUserProps = {
  user: string
}

const PostUser = (props: PostUserProps) => {
  return (
    <div class={'flex flex-row items-center gap-2'}>
      <img src="/src/assets/images/user.png" alt={props.user} class={'h-6 w-6'} />
      <span class={'font-semibold'}>{props.user}</span>
    </div>
  )
}

export default PostUser
