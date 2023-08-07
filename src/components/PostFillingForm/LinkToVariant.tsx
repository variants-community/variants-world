export const LinkToVariant = (props: { linkToVariant: string }) => (
  <div className={'flex flex-row gap-[20px] justify-between items-center'}>
    <label htmlFor={'linkToVariant'}>Link to variant</label>
    <input
      value={props.linkToVariant}
      id={'linkToVariant'}
      name={'linkToVariant'}
      type="text"
      className={'w-1/2 rounded-[12px] outline-none bg-border-dark text-[18px] p-[10px] border border-border-light'}
    />
  </div>
)
