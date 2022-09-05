export const shorten = (str: string, numberOfChar: number) => {
  return str.slice(0, numberOfChar/2) + '...' + str.slice(-1 * (numberOfChar/2))
}