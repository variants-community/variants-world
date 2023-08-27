type NavigationProps = {
  username?: string
}

const Navigation = (props: NavigationProps) => {
  return (
    <nav
      class={
        'fixed sm:static sm:mb-[30px] flex flex-row justify-between items-center bg-border-light h-[50px] w-full px-[20px] sm:rounded-[12px] sm:border sm:border-[2px] sm:border-border-dark shadow-dark'
      }
    >
      <div class={'flex flex-row gap-[20px] sm:gap-[40px]'}>
        <a href={'/'} class={'text-white  text-[28px]'}>
          Variants
        </a>

        <a
          href={'/posts'}
          class={
            'flex bg-opacity-40 items-center hover:(text-white bg-opacity-35) h-[30px] bg-gray text-[18px] align-middle rounded-[6px] px-[7px] transition-colors duration-300 ease-out'
          }
        >
          Posts
        </a>
      </div>
      {props.username && (
        <div class={'flex flex-row gap-[10px]'}>
          {props.username}
          <img src="/src/assets/images/user.png" alt={props.username} class={'h-[24px]'} />
        </div>
      )}
    </nav>
  )
}

export default Navigation
