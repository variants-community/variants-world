export const Title = ({ isSearching }: { isSearching: boolean }) => (
  <h1
    className={`${
      isSearching ? '!h-[0px] !mt-[0px] !opacity-0 !mb-[0px] z-0' : 'mb-[100px]'
    } h-[170px] text-[50px] sm:text-[85px] mt-[90px] sm:mt-[180px] text-white font-[300] tracking-[2.55px] text-center text-shadow-light opacity-100 overflow=hidden  transition-all duration-900`}
  >
    Variants universe starts
    <br />
    with a single game
  </h1>
)
