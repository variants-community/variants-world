const Bubbles = (props: { class?: string; color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="160"
    height="120"
    viewBox="0 0 125 114"
    class={`${props.class} fill-${props.color}`}
  >
    <rect x="28" y="14" width="8" height="8" rx="4" />
    <rect width="5" height="5" rx="2.5" />
    <rect x="96" y="4" width="10" height="10" rx="5" />
    <rect x="64" y="55" width="8" height="8" rx="4" />
    <rect x="26" y="61" width="5" height="5" rx="2.5" />
    <rect x="46" y="82" width="5" height="5" rx="2.5" />
    <rect x="113" y="102" width="12" height="12" rx="6" />
  </svg>
)

export default Bubbles
