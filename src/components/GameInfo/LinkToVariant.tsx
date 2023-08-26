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
        className={'block w-full bg-primary px-[32px] py-[7px] rounded-[3px] text-white font-semibold text-[14px]'}
      ></input>
    ) : (
      <a
        href={value}
        className={'block bg-primary px-[32px] py-[7px] rounded-[3px] text-white font-semibold text-[14px]'}
      >
        Try this variant
      </a>
    )}
  </>
)
