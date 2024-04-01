export const dateFormat = (date: Date) => {
  const formatter = Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return formatter.format(date)
}