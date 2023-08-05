const Bubbles = (props: { className?: string, color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="125"
    height="114"
    viewBox="0 0 125 114"
    fill="none"
    className={`${props.className}`}
  >
    <rect x="28" y="14" width="8" height="8" rx="4" fill={props.color} />
    <rect width="5" height="5" rx="2.5" fill={props.color} />
    <rect x="96" y="4" width="10" height="10" rx="5" fill={props.color} />
    <rect x="64" y="55" width="8" height="8" rx="4" fill={props.color} />
    <rect x="26" y="61" width="5" height="5" rx="2.5" fill={props.color} />
    <rect x="46" y="82" width="5" height="5" rx="2.5" fill={props.color} />
    <rect x="113" y="102" width="12" height="12" rx="6" fill={props.color} />
  </svg>
)

export default Bubbles
