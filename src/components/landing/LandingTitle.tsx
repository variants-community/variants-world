export const LandingTitle = ({ collapsed }: { collapsed: boolean }) => (
  <h1
    class={`${collapsed ? '!h-0 !mt-0 !opacity-0 !mb-bigcenter' : 'sm:mb-0 md:mb-10 lg:mb-25'} sm:h-42 h-24
    text-4xl mt-smallcenter
    sm:(text-5xl)
    md:(text-6xl)
    lg:(text-7xl)
    leading-none text-white font-light tracking-glory whitespace-nowrap text-center text-shadow-light transition-title`}
  >
    <span class={collapsed ? '' : 'animate-fade'}>
      Variants universe starts
      <br />
      with a single game
    </span>
  </h1>
)
