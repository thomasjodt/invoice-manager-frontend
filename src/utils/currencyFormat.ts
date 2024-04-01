export const currencyFormat = (amount: number) => {
  const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  })
  return formatter.format(amount)
}