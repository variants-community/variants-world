export const Picture = ({ isHiden }: { isHiden?: boolean }) => (
  <img
    src="/src/assets/images/game.png"
    class={`${
      isHiden ? 'hidden' : 'flex'
    } mt-[35px] w-11/12 sm:(w-[450px] h-[450px]) rounded-[12px] border border-[2px] border-border-dark shadow-dark`}
  />
)
