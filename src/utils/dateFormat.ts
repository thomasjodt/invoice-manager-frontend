export const dateFormat = (date: Date | string): string => {
  const formatter = Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return formatter.format(
    (typeof date === 'string')
      ? new Date(date + 'T00:00')
      : date
  )
}
