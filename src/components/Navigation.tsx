const buttons = [
  { label: 'Add variant', link: '/posts/new' },
]

type NavigationProps = {
  username: string;
};

const Navigation = (props: NavigationProps) => {
  return (
    <nav className={'fixed sm:static sm:mb-[30px] flex flex-row justify-between items-center bg-border-light h-[50px] w-full px-[20px] sm:rounded-[12px] sm:border sm:border-[2px] sm:border-border-dark shadow-dark'}>
      <div className={'flex flex-row gap-[30px]'}>
        <a href={'/'} className={'text-white  text-[28px]'}>Variants</a>
        {buttons.map((botton, i) => (
          <a
            key={i}
            href={botton.link}
            className={'bg-gray rounded-[3px] px-[5px] py-[2px]'}
          >
            {botton.label}
          </a>
        ))}
      </div>
      <div className={'flex flex-row gap-[10px]'}>
        {props.username}
        <img
          src="/src/assets/images/user.png"
          alt={props.username}
          className={'h-[24px]'}
        />
      </div>
    </nav>
  )
}

export default Navigation
