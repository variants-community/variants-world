export const Title = ({ isSearching }: { isSearching: boolean }) => (
  <h1
    class={`${isSearching ? '!h-0 !mt-0 !opacity-0 !md:mb-bigcenter' : 'sm:mb-0 md:mb-10 lg:mb-25'} sm:h-42 h-24
    text-4xl mt-smallcenter
    sm:(text-5xl mt-60)
    md:(text-6xl mt-52)
    lg:(text-7xl mt-45)
    leading-none text-white font-light tracking-glory whitespace-nowrap text-center text-shadow-light transition-title`}
  >
    <span class={isSearching ? '' : 'animate-fade'}>
      Variants universe starts
      <br />
      with a single game
    </span>
  </h1>
)
