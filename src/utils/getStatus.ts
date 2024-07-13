import type { Status } from '@/types'

interface GetStatus {
  (dueDate: Date, balance: number): Status
  (dueDate: string, balance: number): Status
}

export const getStatus: GetStatus = (dueDate: Date | string, balance: number): Status => {
  if (balance === 0) return 'paid'

  if (typeof dueDate === 'string') {
    dueDate = new Date(dueDate.split('T')[0] + 'T00:00')
  }

  return (dueDate > new Date()) ? 'pending' : 'overdue'
}
