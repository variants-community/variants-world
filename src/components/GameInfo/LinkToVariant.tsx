import type { JSX } from 'preact'

export const LinkToVariant = ({ value, children }: { value: string; children?: JSX.Element | string | number }) => (
  <>
    <a href={value} class={'h-7 flex items-center bg-primary px-8 rounded text-white font-semibold text-[14px]'}>
      {children}
    </a>
  </>
)
