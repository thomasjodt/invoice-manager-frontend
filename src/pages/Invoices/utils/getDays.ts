export const getDays = (emissionDate: string, dueDate: string): number => {
  const due = new Date(dueDate + 'T00:00').getTime()
  const emission = new Date(emissionDate + 'T00:00').getTime()
  const getDays = 60 * 60 * 24 * 1000

  return (due - emission) / getDays
}
