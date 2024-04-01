export const currencyFormat = (amount: number): string => {
  const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  })
  return formatter.format(amount)
}
