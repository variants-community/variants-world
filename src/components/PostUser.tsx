type PostUserProps = {
  user: string
}

const PostUser = (props: PostUserProps) => {
  return (
    <div className={'flex flex-row items-center gap-[7px]'}>
      <img src="/src/assets/images/user.png" alt={props.user} className={'h-[24px] 2-[24px]'} />
      <span className={'text-[16px] font-semibold'}>{props.user}</span>
    </div>
  )
}

export default PostUser
