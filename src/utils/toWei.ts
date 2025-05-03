export const toWei = (amount: string, decimals: number) => {
  const parsed = parseFloat(amount)

  if (isNaN(parsed)) return "0"

  return (BigInt(Math.floor(parsed * 10 ** decimals))).toString()
}