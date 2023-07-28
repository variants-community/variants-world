
export const getValueFromEvent = <Type = string>(e: Event) =>
  (e.target as HTMLInputElement).value as Type
