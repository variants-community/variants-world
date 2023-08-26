const StatusIcon = (props: { className?: string }) => (
  <svg
    className={`${props.className}`}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <rect opacity="0.2" width="20" height="20" rx="10" />
    <rect x="6" y="6" width="8" height="8" rx="4" />
  </svg>
)

export default StatusIcon
