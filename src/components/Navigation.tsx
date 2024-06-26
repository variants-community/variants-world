type NavigationProps = {
  username?: string
  profileUrl?: string | null
  path: string
  isGuest?: true
}

const Navigation = (props: NavigationProps) => {
  return (
    <nav
      class={
        'h-12 w-full fixed flex justify-between items-center bg-border-light px-[20px] sm:(static mb-[30px] border border-[2px] border-border-dark) shadow-dark'
      }
    >
      <div class={'flex gap-5 sm:gap-10'}>
        <a href={'/'} class={'text-white text-[28px]'} data-astro-reload={props.path === '/' ? '' : undefined}>
          Variants
        </a>

        {!props.isGuest && (
          <a
            href={'/posts'}
            class={
              'h-7 flex items-center px-[7px] bg-opacity-40 hover:(text-white bg-opacity-35) bg-gray text-[18px] align-middle rounded-md  transition-colors duration-300 ease-out'
            }
          >
            Posts
          </a>
        )}
      </div>
      {props.username && (
        <div class={'flex gap-2.5 items-center'}>
          {props.username}
          <img
            src={props.profileUrl ?? '/assets/images/user.png'}
            alt={props.username ?? 'Guest'}
            class="h-7 rounded-md"
          />
        </div>
      )}
    </nav>
  )
}

export default Navigation
