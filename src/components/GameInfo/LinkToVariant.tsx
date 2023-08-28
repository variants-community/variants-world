export const LinkToVariant = ({
  value,
  onVarianLinkChange,
  isEditMode
}: {
  value: string
  onVarianLinkChange: (e: Event) => void
  isEditMode: boolean
}) => (
  <>
    {isEditMode ? (
      <input
        value={value}
        onChange={onVarianLinkChange}
        class={'w-full px-8 py-2 rounded text-white font-semibold text-[14px] bg-primary'}
      ></input>
    ) : (
      <a href={value} class={'h-7 flex items-center bg-primary px-8 rounded text-white font-semibold text-[14px]'}>
        Try this variant
      </a>
    )}
  </>
)
