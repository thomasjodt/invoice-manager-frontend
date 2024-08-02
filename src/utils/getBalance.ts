import { type Payment } from '@/types'

export const getBalance = (amount: number, payments: number | Payment[]): number => {
  if (typeof payments === 'number') return amount - payments

  let paid = 0
  for (const payment of payments) {
    paid += payment.amount * 100
  }

  return ((amount * 100) - paid) / 100
}
