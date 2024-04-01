import type { Status } from '@/types'

export const getStatus = (dueDate: Date, balance: number): Status => {
  let status: Status
  if (dueDate > new Date()) {
    status = 'pending'
  } else if (balance > 0) {
    status = 'overdue'
  } else {
    status = 'paid'
  }
  return status
}
