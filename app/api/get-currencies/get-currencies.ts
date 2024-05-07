export const getCurrencies = async () => {
  const result = await fetch('/api/get-currencies')
  const allCurrencies = await result.json()
  return allCurrencies
}
