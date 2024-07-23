interface GetDays {
  (emissionDate: Date, dueDate: Date): number
  (emissionDate: string, dueDate: string): number
  (emissionDate: Date, dueDate: string): number
  (emissionDate: string, dueDate: Date): number
}

export const getDays: GetDays = (emissionDate: Date | string, dueDate: Date | string): number => {
  const divider = 60 * 60 * 24 * 1000

  if (typeof emissionDate === 'string') {
    emissionDate = new Date(emissionDate.split('T')[0] + 'T00:00')
  }

  if (typeof dueDate === 'string') {
    dueDate = new Date(dueDate.split('T')[0] + 'T00:00')
  }

  return (dueDate.getTime() - emissionDate.getTime()) / divider
}
