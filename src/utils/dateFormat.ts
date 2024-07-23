interface DateFormat {
  (date: Date): string
  (date: string): string
}

export const dateFormat: DateFormat = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date.split('T')[0] + 'T00:00')
  }
  const formatter = Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return formatter.format(date)
}
