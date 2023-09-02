export const Picture = ({ isHiden }: { isHiden?: boolean }) => (
  <img
    src="/src/assets/images/game.png"
    class={`${
      isHiden ? 'hidden' : 'flex'
    } mt-[20px] w-11/12 sm:(w-[450px] h-[450px]) rounded-xl border border-[2px] border-border-dark shadow-dark`}
  />
)
