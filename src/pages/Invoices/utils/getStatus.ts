import type { Status } from '@/types'

export const getStatus = (dueDate: Date, balance: number): Status => {
  let status: Status

  if (balance === 0) {
    status = 'paid'
    return status
  }

  return (dueDate > new Date()) ? 'pending' : 'overdue'
}
