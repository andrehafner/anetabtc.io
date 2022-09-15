export const shorten = (str: string, numberOfChar: number) => {
  return str.slice(0, numberOfChar/2) + '...' + str.slice(-1 * (numberOfChar/2))
}

export const i18nNumber = (n: number, decimalPlace: number) => {
  return new Intl.NumberFormat('en-NZ', { minimumFractionDigits: decimalPlace,
    maximumFractionDigits: decimalPlace
  }).format(n)
}